require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = package['name']
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['name']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { :git => 'git://github.com/adjust/react_native_sdk.git', :tag => s.version }

  s.requires_arc   = true
  s.platform       = :ios, '8.0'

  s.preserve_paths = 'LICENSE', 'README.md', 'package.json', 'index.js'
  s.source_files   = 'ios/*.{h,m}'

  s.dependency 'Adjust', '4.29.6'
  s.dependency 'React'
end
