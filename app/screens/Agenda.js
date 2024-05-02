import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CalendarBlock from './CalendarBlock';
import EventCreatorModal from '../components/EventCreatorModal';
import EventManagerModal from '../components/EventManagerModal';
import { formatTime, calculateHeight, calculateOverlapCoeff } from '../functions/FormattingCalendar';
import Event from '../models/Event';
import { MINUTE_HEIGHT } from '../config/UIDimensions';

const Agenda = ({ route, navigation }) => {
    const [temporaryEvent, setTemporaryEvent] = useState(null);
    const [temporaryHour, setTemporaryHour] = useState(null);
    const [createEventModalVisible, setCreateEventModalVisible] = useState(false);
    const [manageEventModalVisible, setManageEventModalVisible] = useState(false);
    const [manageEventModalEvent, setManageEventModalEvent] = useState(null);
    const scrollViewRef = useRef(null);
    const { day, month, year } = route.params;

    // Sample data for events
    const events = [
        new Event(1, "Meeting with client", new Date('2024-07-04T00:00:00'), new Date('2024-07-04T04:00:00'), false, 0),
        new Event(2, "Meeting with client", new Date('2024-07-04T10:00:00'), new Date('2024-07-04T11:00:00'), false, 0),
        new Event(3, "Meeting with client", new Date('2024-07-04T10:30:00'), new Date('2024-07-04T11:30:00'), false, 0),
        new Event(4, "Meeting with client", new Date('2024-07-04T11:00:00'), new Date('2024-07-04T13:30:00'), false, 0)
    ];

    function calculateHourStartHourEnd(hour){
        const top = hour * 60 * MINUTE_HEIGHT;
        const height = 60 * MINUTE_HEIGHT;

        if (temporaryEvent !== null && temporaryEvent.hour === hour){
            setTemporaryEvent(null);
            return;
        }
        scrollViewRef.current?.scrollTo({y: top-height, animated: true});
        setTemporaryHour(hour);
        setCreateEventModalVisible(true);
        setTemporaryEvent({ 'hour': hour, 'top': top, 'height': height });
    }

    function editCalendarEvent(event){
        setManageEventModalEvent(event);
        setManageEventModalVisible(true);
    }

    const closeEventManager = () => {
        setManageEventModalVisible(false);
        setManageEventModalEvent(null);
    }

    const closeCreateEventModal = () => {
        setCreateEventModalVisible(false);
        setTemporaryHour(null);
        setTemporaryEvent(null);
    }

    // Creating hour lines
    const hourLines = Array.from({ length: 24 }).map((_, index) => (
        <>
        <View style={{position: 'absolute', width: '100%', height: MINUTE_HEIGHT * 60, top: MINUTE_HEIGHT * 60 * index, zIndex: -1}}  onTouchEnd={(e) => {calculateHourStartHourEnd(index)}}></View>
        <Text style={[styles.hourText, { top: (MINUTE_HEIGHT * 60 * index) - (20 * index) - 10 }]}>
            {`${index === 0 ? 12 : (index % 12 === 0 ? 12 : index % 12)}${index < 12 ? 'am' : (index === 24 ? 'am' : 'pm')}`}
        </Text>
        <View style={[styles.hourLine, { top: MINUTE_HEIGHT * 60 * index}]}/>
        </>
    ));

    calculateOverlapCoeff(events);

    const RenderTempHour = () => {
        return (
            <View style={[styles.temp_event, { top: temporaryEvent.top, height: temporaryEvent.height, left: 45}]}>
            </View>
        );
    }
    
    const RenderHour = ({ hour, event }) => {
        return (
            <View style={[styles.event, { top: hour.top, height: hour.height, left: 45 + (event.overlapCoefficient * 10)}]} onTouchEnd={(e) => {editCalendarEvent(event)}}>
                <Text style={{paddingLeft: 10, paddingTop: 5, color: 'white'}}>{event.title}</Text>
                <Text style={{paddingLeft: 10, paddingTop: 5, color: 'white'}}>{formatTime(event.start, event.end)}</Text>
            </View>
        );
    }

    return (<>
        <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
            <View>
                <Text style={{fontSize: 20, textAlign: 'center', padding: 10}}>{day}/{month}/{year}</Text>
            </View>
            <View style={styles.container}>
                {hourLines}
                {events.map((event, index) => (
                    <RenderHour key={index} hour={calculateHeight(event)} event={event}/>
                ))}
                {temporaryEvent ? <RenderTempHour/> : null}
            </View>
        </ScrollView>
            <EventCreatorModal modalVisible={createEventModalVisible} setModalVisible={closeCreateEventModal} day={day} month={month} year={year} hour={temporaryHour} />
            <EventManagerModal modalVisible={manageEventModalVisible} closeEventManager={closeEventManager} event={manageEventModalEvent} />
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
        height: 20
    }
});