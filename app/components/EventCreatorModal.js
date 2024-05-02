import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { createEvent } from '../functions/EventManagement';

const EventCreatorModal = ({ modalVisible, setModalVisible }) => {
    const [taskName, setTaskName] = useState('');
    const [taskHourFrom, setTaskHourFrom] = useState('');
    const [taskHourTo, setTaskHourTo] = useState('');

    const createTask = () => {
        // Reset form values
        setTaskName('');
        setTaskHourFrom('');
        setTaskHourTo('');
        /*
            Function validation checks
        */

        /*
            Write new event to database
            createEvent();
        */

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

                <TextInput style={[styles.modalText, styles.modalInput]}
                    placeholderTextColor={'white'}
                    placeholder="Hour (From):"
                    value={taskHourFrom}
                    onChangeText={text => setTaskHourFrom(text)}
                />

                <TextInput style={[styles.modalText, styles.modalInput]}
                    placeholderTextColor={'white'}
                    placeholder="Hour (To):"
                    value={taskHourTo}
                    onChangeText={text => setTaskHourTo(text)}
                />

                <Button title="Create" onPress={createTask} />
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