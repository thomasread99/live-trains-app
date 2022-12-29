import {
    BaseToast,
    BaseToastProps,
    ToastConfig,
} from "react-native-toast-message";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import colours from "./colours";

const toastConfig: ToastConfig = {
    error: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderColor: colours.blue, backgroundColor: colours.blue }}
            contentContainerStyle={{ paddingHorizontal: wp("2%") }}
            text1Style={{
                fontSize: wp("3.5%"),
                fontWeight: "400",
                fontFamily: "Light",
                color: colours.white,
            }}
            text2Style={{
                fontFamily: "Light",
                color: colours.white,
            }}
        />
    ),
};

export default toastConfig;
