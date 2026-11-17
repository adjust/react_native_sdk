# Adjust React Native: Podfile helper for the opt-in SPM native SDK path.
#
# Usage (ios/Podfile):
#   require Pod::Executable.execute_command('node', ['-p',
#     'require.resolve("react-native-adjust/scripts/adjust_podfile.rb", {paths: [process.argv[1]]})',
#     __dir__]).strip
#
#   post_install do |installer|
#     react_native_post_install(installer, config[:reactNativePath], :mac_catalyst_enabled => false)
#     adjust_embed_native_sdk_spm!(installer)
#   end
#
# Why: CocoaPods' SPM integration embeds only the product the podspec declares (AdjustSdk),
# not its transitive ones. AdjustSignature builds as a standalone dynamic framework
# (AdjustSigSdk), so without this the app links but crashes at launch on device with
# "dyld: Library not loaded: @rpath/AdjustSigSdk.framework/AdjustSigSdk".
#
# The helper keeps an "Embed Adjust SPM Frameworks" build phase on each app target in sync
# with $RNAdjustUseSPM: added or refreshed when it's on, removed when it's off.

ADJUST_SPM_EMBED_PHASE_NAME = 'Embed Adjust SPM Frameworks'.freeze

ADJUST_SPM_EMBED_SCRIPT = <<~'SH'.freeze
  set -e
  SRC="${BUILT_PRODUCTS_DIR}/AdjustSigSdk.framework"
  DEST="${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
  [ -d "$SRC" ] || exit 0
  mkdir -p "$DEST"
  rsync -a --delete "$SRC/" "$DEST/AdjustSigSdk.framework/"
  if [ "${CODE_SIGNING_REQUIRED:-NO}" != "NO" ] && [ -n "${EXPANDED_CODE_SIGN_IDENTITY:-}" ]; then
    codesign --force --sign "${EXPANDED_CODE_SIGN_IDENTITY}" "$DEST/AdjustSigSdk.framework"
  fi
SH

# Pass the `installer` from post_install so we edit the same user project object CocoaPods
# saves; edits to a separately opened copy get overwritten by CocoaPods' own save.
def adjust_embed_native_sdk_spm!(installer)
  spm_enabled = defined?($RNAdjustUseSPM) && $RNAdjustUseSPM == true
  found_app_target = false
  changed_projects = []

  installer.aggregate_targets.each do |aggregate|
    project = aggregate.user_project
    next if project.nil?

    aggregate.user_targets.each do |target|
      next unless target.product_type == 'com.apple.product-type.application'
      found_app_target = true

      phases = target.shell_script_build_phases.select { |p| p.name == ADJUST_SPM_EMBED_PHASE_NAME }

      if spm_enabled
        keep = phases.shift || target.new_shell_script_build_phase(ADJUST_SPM_EMBED_PHASE_NAME)
        next if keep.shell_script == ADJUST_SPM_EMBED_SCRIPT && phases.empty?
        keep.shell_script = ADJUST_SPM_EMBED_SCRIPT
        action = 'Synced'
      else
        next if phases.empty?
        action = 'Removed'
      end

      phases.each(&:remove_from_project)
      changed_projects << project
      Pod::UI.puts "[Adjust] #{action} SPM embed phase on target '#{target.name}'."
    end
  end

  changed_projects.uniq.each(&:save)

  if spm_enabled && !found_app_target
    Pod::UI.warn('[Adjust] SPM embed: no application target found; AdjustSigSdk not embedded.')
  end
end
