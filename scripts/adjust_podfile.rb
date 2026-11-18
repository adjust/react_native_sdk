# Adjust React Native: embeds AdjustSigSdk.framework for the opt-in SPM native SDK path.
#
# Loaded by react-native-adjust.podspec; apps don't need to require or call anything.
# Opt in from ios/Podfile with:
#   $RNAdjustUseSPM = true
#   use_frameworks! :linkage => :dynamic
#
# Why: CocoaPods' SPM integration embeds only the product the podspec declares (AdjustSdk),
# not its transitive ones. AdjustSignature builds as a standalone dynamic framework
# (AdjustSigSdk), so without this the app links but crashes at launch on device with
# "dyld: Library not loaded: @rpath/AdjustSigSdk.framework/AdjustSigSdk".
#
# How: once CocoaPods has written its files (post_integrate), adds AdjustSigSdk to the embed
# script CocoaPods generates for the app ("[CP] Embed Pods Frameworks"), so CocoaPods copies
# and signs it like any pod framework. The app's own .xcodeproj is never modified, and CocoaPods
# regenerates the script on every install, so turning SPM off leaves nothing behind.

return if defined?(AdjustSpm)

module AdjustSpm
  POD_NAME  = 'react-native-adjust'.freeze
  FRAMEWORK = 'AdjustSigSdk.framework'.freeze
  INPUT     = "${BUILT_PRODUCTS_DIR}/#{FRAMEWORK}".freeze
  OUTPUT    = "${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}/#{FRAMEWORK}".freeze
  MARKER    = '# [Adjust] AdjustSigSdk from Swift Package Manager'.freeze
  # The top-level block that ends every CocoaPods embed script.
  ANCHOR    = /^if \[ "\$\{COCOAPODS_PARALLEL_CODE_SIGN\}" == "true" \]; then$/

  class << self
    # Called by the podspec when the native SDK comes from SPM.
    def activate!(sdk_version)
      @sdk_version = sdk_version
      return true if Pod::Installer.ancestors.include?(InstallerHook)
      return false unless Pod::Installer.private_method_defined?(:run_podfile_post_integrate_hooks)
      Pod::Installer.prepend(InstallerHook)
      true
    end

    def embed(installer)
      warn_if_not_dynamic(installer)

      installer.aggregate_targets.each do |aggregate|
        next unless aggregate.pod_targets.any? { |t| t.name == POD_NAME }

        script_path = aggregate.embed_frameworks_script_path
        next unless File.exist?(script_path)

        script = File.read(script_path)
        next if script.include?(MARKER)
        unless script.match?(ANCHOR)
          Pod::UI.warn("[Adjust] Couldn't add #{FRAMEWORK} to #{File.basename(script_path)}; " \
                       'the app may crash at launch.')
          next
        end

        # The version comment changes the script on an SDK update, so Xcode re-runs the phase.
        block = <<~SH
          #{MARKER} (ios_sdk #{@sdk_version})
          if [ -d "#{INPUT}" ]; then
            install_framework "#{INPUT}"
          fi
        SH
        File.write(script_path, script.sub(ANCHOR) { "#{block}#{$&}" })
        add_to_file_lists(aggregate)
        Pod::UI.puts "[Adjust] Embedding #{FRAMEWORK} in #{aggregate.name}."
      end
    end

    private

    # Keeps the embed phase's declared inputs and outputs complete, so Xcode re-runs it
    # when the framework changes.
    def add_to_file_lists(aggregate)
      aggregate.user_build_configurations.each_key do |config|
        { embed_frameworks_script_input_files_path: INPUT,
          embed_frameworks_script_output_files_path: OUTPUT }.each do |method, entry|
          next unless aggregate.respond_to?(method)
          path = aggregate.public_send(method, config)
          next unless File.exist?(path)
          lines = File.read(path).split("\n")
          File.write(path, (lines << entry).join("\n") + "\n") unless lines.include?(entry)
        end
      end
    end

    def warn_if_not_dynamic(installer)
      target = installer.pod_targets.find { |t| t.name == POD_NAME }
      return unless target.respond_to?(:build_as_dynamic_framework?)
      return if target.build_as_dynamic_framework?
      Pod::UI.warn('[Adjust] $RNAdjustUseSPM needs dynamic frameworks. ' \
                   'Add `use_frameworks! :linkage => :dynamic` to your Podfile.')
    end
  end

  # Runs right after the Podfile's own post_integrate block, once CocoaPods has written its
  # files. Passes any arguments through and turns errors into a warning, so it can never fail
  # an install.
  module InstallerHook
    private

    def run_podfile_post_integrate_hooks(*args, &block)
      result = super
      begin
        AdjustSpm.embed(self)
      rescue StandardError => e
        Pod::UI.warn("[Adjust] Couldn't embed #{AdjustSpm::FRAMEWORK}: #{e.message}")
      end
      result
    end
  end
end

# Manual fallback for a CocoaPods version the hook can't attach to: call it from post_integrate.
def adjust_embed_native_sdk_spm!(installer)
  AdjustSpm.embed(installer)
end
