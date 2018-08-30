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
        debug_green('Running makeReleaseJar Gradle task ...')
        jar_in_dir = '{0}/adjust/build/intermediates/bundles/release'.format(build_dir)
        subprocess.call(['./gradlew', 'makeReleaseJar'])
    else:
        debug_green('Running makeDebugJar Gradle task ...')
        jar_in_dir = '{0}/adjust/build/intermediates/bundles/debug'.format(build_dir)
        subprocess.call(['./gradlew', 'makeDebugJar'])

    # ------------------------------------------------------------------
    # Moving Android SDK JAR from jarIn to jarOut dir
    debug_green('Moving Android SDK JAR from {0} to {1} dir ...'.format(jar_in_dir, jar_out_dir))
    clear_dir(jar_out_dir)
    copy_files('*.jar', jar_in_dir, jar_out_dir)
    rename_file('*.jar', 'adjust-android.jar', jar_out_dir)

    if with_test_lib:
        # ------------------------------------------------------------------
        # Test Library paths
        set_log_tag('ANROID-TEST-LIB-BUILD')
        waiting_animation(duration=4.0, step=0.025)
        debug_green('Building Test Library started ...')
        test_jar_in_dir  = '{0}/testlibrary/build/outputs'.format(build_dir)
        test_jar_out_dir = '{0}/test/lib/android/libs'.format(root_dir)

        if not os.path.exists(test_jar_out_dir):
            os.makedirs(test_jar_out_dir)

        # ------------------------------------------------------------------
        # Running Gradle tasks: clean testlibrary:makeJar ...
        debug_green('Running Gradle tasks: clean testlibrary:makeJar ...')
        os.chdir(build_dir)
        subprocess.call(['./gradlew', 'clean', ':testlibrary:makeJar'])

        # ------------------------------------------------------------------
        # Moving the generated Android SDK JAR from jar in to jar out dir ...
        debug_green('Moving the generated Android SDK JAR from {0} to {1} dir ...'.format(test_jar_in_dir, test_jar_out_dir))
        copy_files('*.jar', test_jar_in_dir, test_jar_out_dir)
        rename_file('*.jar', 'adjust-testing.jar', test_jar_out_dir)
