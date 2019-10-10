import os, subprocess
from scripting_utils import *

if __name__ == "__main__":
    set_log_tag('RUN-IOS')
    error('Error. Do not run this script explicitly, but rather through "build_sdk.py" script.')
    exit()

def __set_directories(_root_dir, _sdk_plugin_name, _test_plugin_name):
    global root_dir
    global sdk_plugin_name
    global example_app_dir
    global test_app_dir
    global test_plugin_name
    global android_dir
    global ios_dir
    global temp_dir
    global plugin_node_modules_dir
    global testplugin_node_modules_dir
    root_dir                    = _root_dir
    sdk_plugin_name             = _sdk_plugin_name
    test_plugin_name            = _test_plugin_name
    example_app_dir             = '{0}/example'.format(root_dir)
    test_app_dir                = '{0}/test/app'.format(root_dir)
    android_dir                 = '{0}/android'.format(root_dir)
    ios_dir                     = '{0}/ios'.format(root_dir)
    temp_dir                    = '{0}/temp'.format(root_dir)
    plugin_node_modules_dir     = '{0}/node_modules/{1}'.format(example_app_dir, sdk_plugin_name)
    testplugin_node_modules_dir = '{0}/node_modules/{1}'.format(test_app_dir, test_plugin_name)
    
def run_example(_root_dir, _sdk_plugin_name):
    # ------------------------------------------------------------------
    # paths
    __set_directories(_root_dir, _sdk_plugin_name, '')

    # ------------------------------------------------------------------
    # Removing react-native-adjust from example app
    # This step is needed, since existence of "../temp" path for react-native-adjust is hostile towards "npm install".
    # Removing plugin with yarn in here makes it disappear from package.json of the example app.
    # Removing and unlinking react-native-adjust from example app
    debug_green('Removing and unlinking react-native-adjust from example app ...')
    # debug_green('Removing "{0}" from example app ...'.format(sdk_plugin_name))
    os.chdir(example_app_dir)
    # subprocess.call(['yarn', 'remove', sdk_plugin_name])
    subprocess.call(['react-native', 'unlink', sdk_plugin_name])
    subprocess.call(['yarn', 'remove', sdk_plugin_name])
    remove_dir_if_exists(plugin_node_modules_dir)

    # ------------------------------------------------------------------
    # Installing node dependencies [npm install]
    debug_green('Installing node dependencies [npm install] ...')
    subprocess.call(['npm', 'install'])

    # ------------------------------------------------------------------
    # Modifying react-native-adjust content and putting it to temp folder
    debug_green('Modifying react-native-adjust content and putting it to temp folder ...')
    __copy_rn_content_to_temp()

    # Adding react-native-adjust to test app
    debug_green('Adding react-native-adjust to test app ...')
    os.chdir(example_app_dir)
    subprocess.call(['yarn', 'add', '../temp'])

    # ------------------------------------------------------------------
    # Linking react-native-adjust
    debug_green('Linking react-native-adjust ...')
    subprocess.call(['react-native', 'link', sdk_plugin_name])

    # ------------------------------------------------------------------
    # Update all the Pods if needed
    os.chdir('{0}/{1}'.format(example_app_dir, 'ios'))
    subprocess.call(['pod', 'update'])

    # ------------------------------------------------------------------
    # Cleanup
    debug_green('Cleanup ...')
    os.chdir(example_app_dir)
    remove_dir_if_exists(temp_dir)

    debug_green('Run example app from Xcode. Project location: {0}/ios ...'.format(example_app_dir))

def run_testapp(_root_dir, _sdk_plugin_name, _test_plugin_name):
    # ------------------------------------------------------------------
    # paths
    __set_directories(_root_dir, _sdk_plugin_name, _test_plugin_name)

    # ------------------------------------------------------------------
    # Removing react-native-adjust and react-native-adjust-test modules from test app
    debug_green('Removing "{0}" and "{1}" from example app ...'.format(sdk_plugin_name, test_plugin_name))
    os.chdir(test_app_dir)
    subprocess.call(['react-native', 'unlink', sdk_plugin_name])
    subprocess.call(['react-native', 'unlink', test_plugin_name])
    subprocess.call(['yarn', 'remove', sdk_plugin_name])
    subprocess.call(['yarn', 'remove', test_plugin_name])
    remove_dir_if_exists(plugin_node_modules_dir)
    remove_dir_if_exists(testplugin_node_modules_dir)

    # ------------------------------------------------------------------
    # Modifying react-native-adjust content and putting it to temp folder
    debug_green('Modifying react-native-adjust content and putting it to temp folder ...')
    __copy_rn_content_to_temp()

    # ------------------------------------------------------------------
    # Adding react-native-adjust to test app
    debug_green('Adding react-native-adjust to test app ...')
    os.chdir(test_app_dir)
    subprocess.call(['yarn', 'add', '../../temp'])

    # ------------------------------------------------------------------
    # Adding react-native-adjust-test to test app
    debug_green('Adding react-native-adjust-test to test app ...')
    subprocess.call(['yarn', 'add', '../lib'])

    # ------------------------------------------------------------------
    # Linking react-native-adjust
    debug_green('Linking react-native-adjust ...')
    subprocess.call(['react-native', 'link', sdk_plugin_name])

    # ------------------------------------------------------------------
    # Linking react-native-adjust-test
    debug_green('Linking react-native-adjust-test ...')
    subprocess.call(['react-native', 'link', test_plugin_name])

    # ------------------------------------------------------------------
    # Cleanup
    debug_green('Cleanup ...')
    remove_dir_if_exists(temp_dir)

    debug_green('Run test app from Xcode. Project location: {0}/ios ...'.format(test_app_dir))

def __copy_rn_content_to_temp():
    recreate_dir(temp_dir)
    copy_dir_contents(android_dir, temp_dir + '/android')
    copy_dir_contents(ios_dir, temp_dir + '/ios')
    copy_file('{0}/package.json'.format(root_dir), '{0}/package.json'.format(temp_dir))
    copy_file('{0}/react-native-adjust.podspec'.format(root_dir), '{0}/react-native-adjust.podspec'.format(temp_dir))
    copy_file('{0}/index.js'.format(root_dir), '{0}/index.js'.format(temp_dir))
