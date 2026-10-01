# Adjust React Native — Podfile helper for the opt-in SPM native-SDK path.
#
# Usage (ios/Podfile):
#   require Pod::Executable.execute_command('node', ['-p',
#     'require.resolve("react-native-adjust/scripts/adjust_podfile.rb", {paths: [process.argv[1]]})',
#     __dir__]).strip
#   ...
#   post_install do |installer|
#     react_native_post_install(installer, config[:reactNativePath], :mac_catalyst_enabled => false)
#     adjust_embed_native_sdk_spm!(installer)   # <-- one line
#   end
#
# Why this is needed: CocoaPods' SPM integration embeds only the product the podspec
# declares (AdjustSdk), not its transitive ones. AdjustSdk links in statically, but its
# AdjustSignature dependency builds as a standalone dynamic framework (AdjustSigSdk),
# so without this the app links fine and then crashes at launch on device with
# "dyld: Library not loaded: @rpath/AdjustSigSdk.framework/AdjustSigSdk".
#
# GoogleAdsOnDeviceConversion, pulled in by the AdjustGoogleOdm product, is static and
# must NOT be embedded: iOS rejects the install ("contained no image slices").
#
# This keeps an "Embed Adjust SPM Frameworks" build phase on the app target in sync with
# the flag: added or refreshed when it's on, removed when it's off.
require 'xcodeproj'

ADJUST_SPM_EMBED_PHASE_NAME = 'Embed Adjust SPM Frameworks'.freeze

ADJUST_SPM_EMBED_SCRIPT = <<~'SH'.freeze
  set -e
  DEST="${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
  for fw in AdjustSigSdk; do
    SRC="${BUILT_PRODUCTS_DIR}/${fw}.framework"
    if [ -d "$SRC" ]; then
      mkdir -p "$DEST"
      rsync -a --delete "$SRC/" "$DEST/${fw}.framework/"
      if [ "${CODE_SIGNING_REQUIRED:-NO}" != "NO" ] && [ -n "${EXPANDED_CODE_SIGN_IDENTITY:-}" ]; then
        codesign --force --sign "${EXPANDED_CODE_SIGN_IDENTITY}" "$DEST/${fw}.framework"
      fi
    fi
  done
SH

# Adds the embed build phase to the app target(s). Pass the `installer` from post_install
# so we modify the SAME user-project object CocoaPods saves (modifying a separately-opened
# copy gets clobbered by CocoaPods' own integration save).
def adjust_embed_native_sdk_spm!(installer)
  spm_enabled = defined?($RNAdjustUseSPM) && $RNAdjustUseSPM == true

  found_app_target = false
  modified_projects = []

  installer.aggregate_targets.each do |aggregate|
    project = aggregate.user_project
    next if project.nil?

    aggregate.user_targets.each do |app_target|
      next unless app_target.respond_to?(:product_type) &&
                  app_target.product_type == 'com.apple.product-type.application'

      found_app_target = true
      phases = app_target.shell_script_build_phases.select { |p| p.name == ADJUST_SPM_EMBED_PHASE_NAME }

      unless spm_enabled
        next if phases.empty?
        phases.each(&:remove_from_project)
        modified_projects << project
        Pod::UI.puts "[Adjust] Removed SPM embed phase from target '#{app_target.name}' (SPM disabled)."
        next
      end

      if phases.empty?
        phase = app_target.new_shell_script_build_phase(ADJUST_SPM_EMBED_PHASE_NAME)
        phase.shell_script = ADJUST_SPM_EMBED_SCRIPT
        modified_projects << project
        Pod::UI.puts "[Adjust] Embedded SPM frameworks into target '#{app_target.name}'."
        next
      end

      # Keep one phase and bring its script up to date; drop any duplicates.
      keep, *duplicates = phases
      duplicates.each(&:remove_from_project)
      if keep.shell_script != ADJUST_SPM_EMBED_SCRIPT || duplicates.any?
        keep.shell_script = ADJUST_SPM_EMBED_SCRIPT
        modified_projects << project
        Pod::UI.puts "[Adjust] Updated SPM embed phase in target '#{app_target.name}'."
      end
    end
  end

  modified_projects.uniq.each(&:save)

  if spm_enabled && !found_app_target
    Pod::UI.warn('[Adjust] SPM embed: no application target found; framework not embedded.')
  end
end
