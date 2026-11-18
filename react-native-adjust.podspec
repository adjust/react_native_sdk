require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

ADJUST_IOS_SDK_VERSION = '5.8.2' unless defined?(ADJUST_IOS_SDK_VERSION)
ADJUST_SPM_URL         = 'https://github.com/adjust/ios_sdk' unless defined?(ADJUST_SPM_URL)

Pod::Spec.new do |s|
  spm_requested    = defined?($RNAdjustUseSPM) && $RNAdjustUseSPM == true
  spm_available    = defined?(spm_dependency) ? true : false
  use_spm          = spm_requested && spm_available
  odm_requested    = defined?($RNAdjustUseGoogleOdmPlugin) && $RNAdjustUseGoogleOdmPlugin == true

  s.name           = package['name']
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['name']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { :git => 'git://github.com/adjust/react_native_sdk.git', :tag => s.version }

  s.requires_arc   = true
  s.platform       = :ios, '12.0'

  s.preserve_paths = 'LICENSE', 'README.md', 'package.json', 'index.js', 'scripts/*.rb'
  s.source_files   = 'ios/*.{h,m}'

  s.dependency 'React-Core'

  if spm_requested && !spm_available
    Pod::UI.warn "#{s.name}: $RNAdjustUseSPM set but React Native's spm_dependency helper is unavailable (requires RN 0.75+). Falling back to CocoaPods for the native SDK."
  end

  if use_spm
    require_relative 'scripts/adjust_podfile'
    unless AdjustSpm.activate!(ADJUST_IOS_SDK_VERSION)
      Pod::UI.warn "#{s.name}: couldn't hook into this CocoaPods version. Add `adjust_embed_native_sdk_spm!(installer)` to a post_integrate block in your Podfile, or the app crashes at launch."
    end

    spm_dependency(
      s,
      url: ADJUST_SPM_URL,
      requirement: { kind: 'exactVersion', version: ADJUST_IOS_SDK_VERSION },
      products: odm_requested ? ['AdjustSdk', 'AdjustGoogleOdmPlugin'] : ['AdjustSdk']
    )
  else
    s.dependency odm_requested ? 'Adjust/AdjustGoogleOdm' : 'Adjust', ADJUST_IOS_SDK_VERSION
  end
end
