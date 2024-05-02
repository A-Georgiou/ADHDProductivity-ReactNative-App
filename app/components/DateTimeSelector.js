import React, { useState } from 'react';
import { View, Button, Platform, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimeSelector = ({ dateTime, setDateTime }) => {
    const [showPicker, setShowPicker] = useState({ date: false, time: false });

    const onChange = (event, selectedValue) => {
        setShowPicker({ date: false, time: false });
        if (selectedValue) {  // Only update on valid selections, handles Android cancel button
            setDateTime(selectedValue);
        }
    };

    const showDatePicker = () => {
        setShowPicker({ date: true, time: false });
    };

    const showTimePicker = () => {
        setShowPicker({ date: false, time: true });
    };

    var dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    var timeOptions = { hour: 'numeric', minute: 'numeric', hour12: false };

    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={showDatePicker}><Text style={{color: 'white', fontSize: 16}}>{dateTime.toLocaleDateString("en-GB", dateOptions)}</Text></TouchableOpacity>
            <TouchableOpacity onPress={showTimePicker}><Text style={{color: 'white', fontSize: 16}}>{dateTime.toLocaleTimeString("en-GB", timeOptions)}</Text></TouchableOpacity>
            {showPicker.date && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateTime}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                />
            )}
            {showPicker.time && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateTime}
                    mode="time"
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DateTimeSelector;