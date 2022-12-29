import {
    BaseToast,
    BaseToastProps,
    ToastConfig,
} from "react-native-toast-message";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import colours from "./colours";

const toastConfig: ToastConfig = {
    error: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={styles.background}
            contentContainerStyle={styles.container}
            text1Style={styles.mainText}
            text2Style={styles.secondaryText}
        />
    ),
};

const styles = StyleSheet.create({
    background: {
        borderColor: colours.blue,
        backgroundColor: colours.blue,
    },

    container: {
        paddingHorizontal: wp("2%"),
    },

    mainText: {
        fontSize: wp("3.5%"),
        fontWeight: "400",
        fontFamily: "Light",
        color: colours.white,
    },

    secondaryText: {
        fontFamily: "Light",
        color: colours.white,
    },
});

export default toastConfig;
