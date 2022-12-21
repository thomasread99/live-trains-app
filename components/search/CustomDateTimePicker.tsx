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
                            { color: dateSelected ? "black" : "#D3D3D3" },
                        ]}
                    >
                        {dateSelected
                            ? props.mode === "date"
                                ? moment(selectedDate).format("DD/MM/YYYY")
                                : moment(selectedDate).format("HH:mm")
                            : props.mode === "date"
                            ? "Date (optional)"
                            : "Time (optional)"}
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
        backgroundColor: "white",
        marginHorizontal: wp("10%"),
        justifyContent: "center",
        marginTop: hp("2%"),
        height: hp("8%"),
        borderRadius: 5,
        paddingLeft: wp("2%"),
    },

    dateText: {
        fontSize: wp("6%"),
    },
});

export default CustomDateTimePicker;
