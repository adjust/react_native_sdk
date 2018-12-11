#!/usr/bin/python

import os, sys
from scripting_utils import *
import run_android  as android
import run_ios      as ios

set_log_tag('RN-RUN-SCRIPT')

if __name__ != "__main__":
    error('Error. Do not import this script, but run it explicitly.')
    exit()

# ------------------------------------------------------------------
# get arguments
usage_message = 'Usage >> python run.py [ios | android ] [(-example | -e) or (-test | -t)] [optional (android), skip uninstall from device: -su]\n';
if len(sys.argv) < 3:
    error('Error. Platform and/or app type not provided.')
    debug(usage_message)
    exit()

platform = sys.argv[1]
if platform != 'ios' and platform != 'android':
    error('Error. Unknown platform provided: [{0}]'.format(platform))
    debug(usage_message)
    exit()

app_type = sys.argv[2]
if app_type != '-example' and app_type != '-e' and app_type != '-test' and app_type != '-t':
    error('Error. Unknown app type provided: [{0}]'.format(app_type))
    debug(usage_message)
    exit()

skip_uninstall = False
if len(sys.argv) == 4 and sys.argv[3] == '-su':
    skip_uninstall = True
elif len(sys.argv) == 4:
    error('Unknown 3nd parameter: {0}'.format(sys.argv[3]))
    debug(usage_message)
    exit()

debug_green('Script start. Platform=[{0}], app type=[{1}] ...'.format(platform, app_type))

# ------------------------------------------------------------------
# common paths
script_dir  = os.path.dirname(os.path.realpath(__file__))
root_dir    = os.path.dirname(os.path.normpath(script_dir))

# ------------------------------------------------------------------
# call platform specific build method
sdk_plugin_name  = 'react-native-adjust'
test_plugin_name = 'react-native-adjust-test'

if platform == 'ios':
    if app_type == '-example' or app_type == '-e':
        set_log_tag('IOS-APP-BUILD')
        ios.run_example(root_dir, sdk_plugin_name)
    else:
        set_log_tag('IOS-TESTAPP-BUILD')
        ios.run_testapp(root_dir, sdk_plugin_name, test_plugin_name)
else:
    if app_type == '-example' or app_type == '-e':
        set_log_tag('ANROID-APP-BUILD')
        android.run_example(root_dir, sdk_plugin_name, skip_uninstall)
    else:
        set_log_tag('ANROID-TESTAPP-BUILD')
        android.run_testapp(root_dir, sdk_plugin_name, test_plugin_name, skip_uninstall)

remove_files('*.pyc', script_dir, log=False)

# ------------------------------------------------------------------
# Script completed
debug_green('Script completed!')