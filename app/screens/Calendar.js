import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { getEventsForMonth } from '../functions/QueryDBEvents';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/*

Calendar Screen:
- A simple calendar screen that displays the days of the month
- The user can navigate between months using the arrow buttons
- Each day is a button that navigates to the Agenda screen for that day

*/

const Calendar = ({ navigation }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function loadEvents() {
            const eventsForMonth = await getEventsForMonth(selectedMonth, selectedYear);
            setEvents(eventsForMonth);
        }
        loadEvents();
    }, [selectedMonth]);

    function updateMonth(increment) {
        setSelectedMonth((prevMonth) => {
            let newMonth;
            if (increment) {
                newMonth = (prevMonth + 1) % 12;
                if (prevMonth === 11) {
                    setSelectedYear((prevYear) => prevYear + 1);
                }
            } else {
                newMonth = (prevMonth - 1 + 12) % 12;
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
                <TouchableOpacity key={'touch-'+day} style={styles.day} onPress={() => {navigation.navigate('Agenda', {'day': day, 'month': selectedMonth+1, 'year': selectedYear})}}>
                    <Text key={'text-'+day}>{day}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.calendarContainer}>
            <View style={styles.topHeader}>
                <TouchableOpacity style={styles.dateChange} onPress={() => updateMonth(false)}><Text style={styles.dateChangeText}>&lt;</Text></TouchableOpacity>
                <Text style={styles.monthHeader}>{monthsOfYear[selectedMonth]} {selectedYear}</Text>
                <TouchableOpacity style={styles.dateChange} onPress={() => updateMonth(true)}><Text style={styles.dateChangeText}>&gt;</Text></TouchableOpacity>
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
        padding: 3,
        height: 45, // You can adjust the height as needed
        fontSize: 26, // Optional for better visibility
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
    },
    dateChange: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        justifyContent: 'center', // Centers children vertically in the container
        alignItems: 'center', // Centers children horizontally in the container
        height: 45, // You can adjust the height as needed
        width: 50,
        marginLeft: 20,
        marginRight: 20
    },
    dateChangeText: {
        color: 'white',
        fontSize: 16, // Optional for better visibility
        fontWeight: 'bold', // Optional for better visibility
        textAlign: 'center' // Ensures text alignment is centered if text wraps
    },
});

export default Calendar;