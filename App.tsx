import React, { useCallback } from "react";
import { StatusBar, View, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Toast from "react-native-toast-message";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import MainNavigator from "./navigation/MainNavigator";

import store from "./store/store";

import colours from "./config/colours";
import toastConfig from "./config/toastConfig";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

export default function App() {
    const [fontsLoaded] = useFonts({
        Light: require("./assets/fonts/Roboto-Light.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Provider store={store}>
                <StatusBar backgroundColor={colours.background} />
                <SafeAreaProvider>
                    <MainNavigator />
                    <Toast config={toastConfig} topOffset={hp("36%")} />
                </SafeAreaProvider>
            </Provider>
        </View>
    );
}
