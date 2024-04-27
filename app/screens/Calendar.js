import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = ({ navigation }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    function updateMonth(increment) {
        setSelectedMonth((prevMonth) => {
            let newMonth;
            if (increment) {
                newMonth = (prevMonth + 1) % 12;
                if (prevMonth === 11) {
                    setSelectedYear((prevYear) => prevYear + 1);
                }
            } else {
                newMonth = (prevMonth - 1 + 12) % 12; // Adding 12 ensures the result is non-negative
                if (prevMonth === 0) {
                    setSelectedYear((prevYear) => prevYear - 1);
                }
            }
            return newMonth;
        });
    }

    // Generate the days of the month
    const getDaysOfMonth = (month, year) => {
        const numDays = new Date(year, month + 1, 0).getDate();
        return [...Array(numDays).keys()].map(n => n + 1);
    };

    const days = getDaysOfMonth(selectedMonth, selectedYear);

    // Render a header for the calendar
    const renderHeader = () => (
        <View style={styles.header}>
            {daysOfWeek.map(day => (
                <Text key={day} style={styles.dayHeader}>{day}</Text>
            ))}
        </View>
    );

    // Render the days of the month
    const renderDays = () => (
        <View style={styles.daysContainer}>
            {days.map(day => (
                <TouchableOpacity key={day} style={styles.day} onPress={() => {navigation.navigate('Agenda', {'day': day, 'month': selectedMonth, 'year': selectedYear})}}>
                    <Text>{day}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.topHeader}>
                <Button title="Previous" onPress={() => updateMonth(false)} />
                <Text style={styles.monthHeader}>{monthsOfYear[selectedMonth]} {selectedYear}</Text>
                <Button title="Next" onPress={() => updateMonth(true)} />
            </View>
            {renderHeader()}
            {renderDays()}
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        padding: 10,
        marginTop: '20%'
    },
    monthHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    dayHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center' // Center header text
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    day: {
        width: '14.27%', // roughly divide the width by 7 days
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        marginVertical: 2,
        height: 40, // Fixed height for each day
        borderColor: 'red', // Temporary for debugging
        backgroundColor: 'silver', // Temporary for debugging
        borderWidth: 1 // Temporary for debugging
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    }
});

export default Calendar;