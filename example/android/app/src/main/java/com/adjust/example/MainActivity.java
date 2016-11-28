package com.adjust.examples;

import android.net.Uri;
import android.os.Bundle;
import android.content.Intent;

import com.facebook.react.ReactActivity;

import com.adjust.sdk.Adjust;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Example";
    }

    @Override
	protected void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);

	    Intent intent = getIntent();
        Uri data = intent.getData();
        Adjust.appWillOpenUrl(data);
	}
}
