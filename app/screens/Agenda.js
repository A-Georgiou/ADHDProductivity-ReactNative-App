import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CalendarBlock from './CalendarBlock';
import EventCreator from '../components/EventCreator';
const MINUTE_HEIGHT = 2;

class Event {
    constructor(id, title, start, end, allDay) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.overlapCoefficient = 0;
    }
}


const Agenda = ({ route, navigation }) => {
    const [temporaryEvent, setTemporaryEvent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const { day, month, year } = route.params;
    // Sample data for events
    const events = [
        new Event(1, "Meeting with client", new Date('2024-07-04T00:00:00'), new Date('2024-07-04T04:00:00'), false, 0),
        new Event(2, "Meeting with client", new Date('2024-07-04T10:00:00'), new Date('2024-07-04T11:00:00'), false, 0),
        new Event(3, "Meeting with client", new Date('2024-07-04T10:30:00'), new Date('2024-07-04T11:30:00'), false, 0),
        new Event(4, "Meeting with client", new Date('2024-07-04T11:00:00'), new Date('2024-07-04T13:30:00'), false, 0)
    ];

    function calculateOverlapCoeff(events){
        for (let i = 0; i < events.length; i++){
            for (let j = i+1; j < events.length; j++){
                if (events[i].end > events[j].start){
                    events[j].overlapCoefficient = events[i].overlapCoefficient + 1;
                }
            }
        }
    }

    function formatNumber(num) {
        return num.toString().padStart(2, '0');
      }

    function formatTime(num) {
        return `${num.toString().padStart(2, '0')}:00`;
    }

    function formatTime(start, end){
        const startHour = start.getHours();
        const startMinutes = start.getMinutes();
        const endHour = end.getHours();
        const endMinutes = end.getMinutes();

        return `${startHour == 0 ? 12 : startHour%12}:${startMinutes.toString().padStart(2, '0')}${startHour < 12 ? 'am' : 'pm'} - ${endHour == 0 ? 12 : endHour%12}:${endMinutes.toString().padStart(2, '0')}${endHour < 12 ? 'am' : 'pm'}`;
    }

    function calculateHeight(event) {
        const { start, end } = event;
        const startHour = start.getHours();
        const startMinutes = start.getMinutes();
        const endHour = end.getHours();
        const endMinutes = end.getMinutes();

        const startHourMinutes = startHour * 60 + startMinutes;
        const endHourMinutes = endHour * 60 + endMinutes;


        const top = startHourMinutes * MINUTE_HEIGHT;
        const height = ((endHourMinutes - startHourMinutes) * MINUTE_HEIGHT)-2;

        return { top, height };
    }

    function calculateHourStartHourEnd(hour){
        const top = hour * 60 * MINUTE_HEIGHT;
        const height = 60 * MINUTE_HEIGHT;

        if (temporaryEvent !== null && temporaryEvent.hour === hour){
            setTemporaryEvent(null);
            return;
        }
        setModalVisible(true);
        setTemporaryEvent({ 'hour': hour, 'top': top, 'height': height });

    }

    calculateOverlapCoeff(events);

    const RenderTempHour = () => {
        return (
            <View style={[styles.temp_event, { top: temporaryEvent.top, height: temporaryEvent.height, left: 45}]}>
            </View>
        );
    }
    
    const RenderHour = ({ hour, event }) => {
        return (
            <View style={[styles.event, { top: hour.top, height: hour.height, left: 45 + (event.overlapCoefficient * 10)}]}>
                <Text style={{paddingLeft: 10, paddingTop: 5, color: 'white'}}>{event.title}</Text>
                <Text style={{paddingLeft: 10, paddingTop: 5, color: 'white'}}>{formatTime(event.start, event.end)}</Text>
            </View>
        );
    }

    // Creating hour lines
    const hourLines = Array.from({ length: 24 }).map((_, index) => (
        <>
        <View style={{position: 'absolute', width: '100%', height: MINUTE_HEIGHT * 60, top: MINUTE_HEIGHT * 60 * index, zIndex: 100}}  onTouchEnd={(e) => {calculateHourStartHourEnd(index)}}></View>
        <Text style={[styles.hourText, { top: (MINUTE_HEIGHT * 60 * index) - (20 * index) - 10 }]}>
            {`${index === 0 ? 12 : index % 12}${index < 12 ? 'am' : 'pm'}`}
        </Text>
        <View style={[styles.hourLine, { top: MINUTE_HEIGHT * 60 * index}]}/>
        </>
    ));

    return (<>
        <EventCreator modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <ScrollView style={{ flex: 1 }}>
            <View>
                <Text style={{fontSize: 20, textAlign: 'center', padding: 10}}>{day}/{month}/{year}</Text>
            </View>
            <View style={styles.container}>
                {hourLines}
                {events.map((event, index) => (
                    <RenderHour key={index} hour={calculateHeight(event)} event={event}/>
                ))}
                {temporaryEvent ? <RenderTempHour/> : <View></View>}
            </View>
        </ScrollView>
        </>
    );
};

export default Agenda;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: MINUTE_HEIGHT * 60 * 24, // Full day, minute by minute
        width: '100%',
        marginBottom: 10
    },
    event: {
        position: 'absolute',
        backgroundColor: 'rgb(3, 155, 229)',
        width: '80%', // Assume full width for simplicity
        borderRadius: 8,
        left: 40,
        borderColor: 'white',
        borderWidth: 1,
    },
    temp_event: {
        position: 'absolute',
        width: '80%', // Assume full width for simplicity
        borderRadius: 8,
        left: 40,
        borderColor: 'black',
        borderWidth: 3,
    },
    hourLine: {
        position: 'absolute',
        width: '100%',
        left: 40,
        height: 1,
        backgroundColor: 'rgba(200, 200, 200, 0.5)', // Faint gray line
    },
    hourText: {
        color: 'rgba(200, 200, 200, 1.0)',
        width: '10%',
        height: 20,
    }
});