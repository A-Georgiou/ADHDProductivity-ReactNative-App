import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Agenda = ({ route, navigation }) => {

    function formatNumber(num) {
        return num.toString().padStart(2, '0');
      }

    const { day, month, year } = route.params;
    // Sample data for events
    const events = [
        { id: 1, title: 'Meeting with client', from: '10:00 AM', 'to': '11:00 AM'},
        { id: 2, title: 'Lunch break', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 3, title: 'Team brainstorming', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 4, title: 'Project presentation', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 5, title: 'Meeting with client', from: '10:00 AM', 'to': '11:00 AM'},
        { id: 6, title: 'Lunch break', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 7, title: 'Team brainstorming', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 8, title: 'Project presentation', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 9, title: 'Meeting with client', from: '10:00 AM', 'to': '11:00 AM'},
        { id: 10, title: 'Lunch break', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 11, title: 'Team brainstorming', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 12, title: 'Project presentation', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 13, title: 'Meeting with client', from: '10:00 AM', 'to': '11:00 AM'},
        { id: 14, title: 'Lunch break', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 15, title: 'Team brainstorming', from: '10:00 AM', 'to': '11:00 AM' },
        { id: 16, title: 'Project presentation', from: '10:00 AM', 'to': '11:00 AM' },
    ];

    // Render item for each event
    const renderItem = ({ item }) => (
        <>
        <View style={styles.list}>
            <Text>{item.from} - {item.to} : {formatNumber(day)}/{formatNumber(month)}/{year}</Text>
            <Text>{item.title}</Text>
        </View>
        <View style={{height: 1, backgroundColor: 'black', marginVertical: 10}} />
        </>
    );

    return (
        <View>
            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default Agenda;

const styles = StyleSheet.create({
    list: {
        padding: 10
    }
})