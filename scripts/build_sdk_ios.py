import os, subprocess
from scripting_utils import *

def build(root_dir, ios_submodule_dir, with_test_lib):
    # ------------------------------------------------------------------
    # paths
    src_dir                  = '{0}/sdk/Adjust'.format(ios_submodule_dir)
    src_out_dir             = '{0}/ios/Adjust'.format(root_dir)

    # ------------------------------------------------------------------
    # Copying iOS SDK source files from src in dir to src out dir ...
    debug_green('Copying iOS SDK source files from {0} to {1} ...'.format(src_dir, src_out_dir))
    copy_dir_contents(src_dir, src_out_dir)

    if with_test_lib:
        # ------------------------------------------------------------------
        # Test Library paths
        set_log_tag('IOS-TEST-LIB-BUILD')
        debug_green('Building Test Library started ...')
        waiting_animation(duration=1.5, step=0.025)
        test_lib_in_dir  = '{0}/sdk/AdjustTests/AdjustTestLibrary/AdjustTestLibrary/'.format(ios_submodule_dir)
        test_lib_out_dir = '{0}/test/lib/ios/AdjustTestLibrary/'.format(root_dir)

        # ------------------------------------------------------------------
        # Copying iOS test lib SDK source files from src in dir to src out dir ...
        debug_green('Copying iOS SDK test source files from {0} to {1} ...'.format(test_lib_in_dir, test_lib_out_dir))
        copy_dir_contents(test_lib_in_dir, test_lib_out_dir)
