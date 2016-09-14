package com.blitzmobile;

import com.reactnativenavigation.activities.RootActivity;
import com.reactnativenavigation.packages.RnnPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends RootActivity {
    @Override
    protected String getMainComponentName() {
        return "App";
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    public List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new VectorIconsPackage(),
            new RnnPackage(),
            new LinearGradientPackage()
        );
    }
}
