import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { createEvent } from '../functions/EventManagement';
import { addEvent } from '../functions/FirebaseInitial';
import Event from '../models/Event';
import DateTimeSelector from './DateTimeSelector';

const EventCreatorModal = ({ modalVisible, setModalVisible, day, month, year, hour }) => {
    const [taskName, setTaskName] = useState('');

    const initialDateTime = new Date(year, month - 1, day, hour || new Date().getHours());
    const [taskHourFrom, setTaskHourFrom] = useState(initialDateTime);
    const [taskHourTo, setTaskHourTo] = useState(new Date(initialDateTime.getTime() + 60 * 60 * 1000));

    useEffect(() => {
        if (hour) {
            const updatedDate = new Date(year, month - 1, day, hour);
            setTaskHourFrom(updatedDate);
            setTaskHourTo(new Date(updatedDate.getTime() + 60 * 60 * 1000));
        }
    }, [hour, day, month, year]); // Listen to hour and date changes


    const createTask = () => {        
        const new_event = new Event(0, taskName, taskHourFrom, taskHourTo, false, 0);
        addEvent(new_event);

        // Close the modal
        setModalVisible();
    };

    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalOuter} onTouchStart={(e) => {setModalVisible(false)}}/>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Create Task</Text>

                <TextInput style={[styles.modalText, styles.modalInput]}
                    placeholderTextColor={'white'}
                    placeholder="Add Title"
                    value={taskName}
                    onChangeText={text => setTaskName(text)}
                />
                <View style={styles.space} />
                <View>
                    <DateTimeSelector dateTime={taskHourFrom} setDateTime={setTaskHourFrom}/>
                    <View style={styles.space} />
                    <DateTimeSelector dateTime={taskHourTo} setDateTime={setTaskHourTo}/>
                </View>
                <View style={styles.space} />
                <Button title="Create" onPress={createTask}/>
            </View>
    </Modal>
    );
};

export default EventCreatorModal;

const styles = StyleSheet.create({
    modalContent: {
        height: '44%',
        width: '100%',
        padding: 40,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
    },
    space: {
        width: 20,
        height: 20,
    },
    modalOuter:{
        height: '100%',
    },
    modalText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        padding: 5,
        
    },
    modalInput: {
        borderColor:'white',
        borderRadius: 10,
        borderWidth: 1
    }
})