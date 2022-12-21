import React, { useState } from "react";
import { Text, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import moment from "moment";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import colours from "../../config/colours";

type Props = {
    onDateSelected: (selectedDate: Date) => void;
    mode: "date" | "time";
};

const CustomDateTimePicker = (props: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dateSelected, setDateSelected] = useState<boolean>(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
        setShowDatePicker(false);

        if (event.type === "set") {
            setDateSelected(true);
            setSelectedDate(selectedDate);
            props.onDateSelected(selectedDate);
        }
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
                <View style={styles.dateContainer}>
                    <Text
                        style={[
                            styles.dateText,
                            {
                                color: dateSelected
                                    ? colours.blue
                                    : "rgba(64, 120, 153, 0.5)",
                            },
                        ]}
                    >
                        {dateSelected
                            ? props.mode === "date"
                                ? moment(selectedDate).format("DD/MM/YYYY")
                                : moment(selectedDate).format("HH:mm")
                            : props.mode === "date"
                            ? "DATE"
                            : "TIME"}
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode={props.mode}
                    onChange={onChangeDate}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    dateContainer: {
        backgroundColor: colours.card,
        borderWidth: 1,
        borderColor: colours.blue,
        justifyContent: "center",
        height: hp("8%"),
        borderRadius: 5,
        paddingLeft: wp("2%"),
		width: wp("38%"),
    },

    dateText: {
        fontSize: wp("6%"),
        fontFamily: "Light",
    },
});

export default CustomDateTimePicker;
