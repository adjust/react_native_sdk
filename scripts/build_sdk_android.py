import os, subprocess
from scripting_utils import *

def build(root_dir, android_submodule_dir, with_test_lib, is_release = True):
    # ------------------------------------------------------------------
    # paths
    sdk_adjust_dir  = '{0}/ext/android/sdk'.format(root_dir)
    build_dir       = '{0}/Adjust'.format(sdk_adjust_dir)
    jar_out_dir     = '{0}/android/libs'.format(root_dir)
    jar_in_dir      = ''

    os.chdir(build_dir)

    # ------------------------------------------------------------------
    # Running make*Jar Gradle task ...
    if is_release:
        debug_green('Running adjustCoreJarRelease Gradle task ...')
        jar_in_dir = '{0}/sdk-core/build/libs'.format(build_dir)
        subprocess.call(['./gradlew', 'adjustCoreJarRelease'])
    else:
        debug_green('Running adjustCoreJarDebug Gradle task ...')
        jar_in_dir = '{0}/sdk-core/build/libs'.format(build_dir)
        subprocess.call(['./gradlew', 'adjustCoreJarDebug'])

    # ------------------------------------------------------------------
    # Moving Android SDK JAR from jarIn to jarOut dir
    debug_green('Moving Android SDK JAR from {0} to {1} dir ...'.format(jar_in_dir, jar_out_dir))
    clear_dir(jar_out_dir)
    if is_release:
        copy_files('adjust-sdk-release.jar', jar_in_dir, jar_out_dir)
        rename_file('adjust-sdk-release.jar', 'adjust-android.jar', jar_out_dir)
    else:
        copy_files('adjust-sdk-debug.jar', jar_in_dir, jar_out_dir)
        rename_file('adjust-sdk-debug.jar', 'adjust-android.jar', jar_out_dir)

    if with_test_lib:
        # ------------------------------------------------------------------
        # Test Library paths
        set_log_tag('ANROID-TEST-LIB-BUILD')
        debug_green('Building Test Library started ...')
        test_jar_in_dir  = '{0}/test-library/build/libs'.format(build_dir)
        test_jar_out_dir = '{0}/test/lib/android/libs'.format(root_dir)

        if not os.path.exists(test_jar_out_dir):
            os.makedirs(test_jar_out_dir)

        # ------------------------------------------------------------------
        # Running Gradle tasks: clean test-library:adjustMakeJarDebug.
        debug_green('Running Gradle tasks: clean test-library:adjustTestLibraryJarDebug ...')
        os.chdir(build_dir)
        subprocess.call(['./gradlew', 'clean', ':test-library:adjustTestLibraryJarDebug'])

        # ------------------------------------------------------------------
        # Moving the generated Android SDK JAR from jar in to jar out dir ...
        debug_green('Moving the generated Android SDK JAR from {0} to {1} dir ...'.format(test_jar_in_dir, test_jar_out_dir))
        copy_files('test-library-debug.jar', test_jar_in_dir, test_jar_out_dir)
        rename_file('test-library-debug.jar', 'adjust-test.jar', test_jar_out_dir)
