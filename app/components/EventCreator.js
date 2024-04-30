import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';

const EventCreator = ({ modalVisible, setModalVisible }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');

    const createTask = () => {
        // Logic to create the task goes here
        console.log('Creating task:', taskName, taskDate);
        // Reset form values
        setTaskName('');
        setTaskDate('');
        // Close the modal
        setModalVisible(false);
    };

    return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalSelf} onTouchStart={(e) => {setModalVisible(false)}}/>
        <View style={styles.modalContent}>
            <Text>Create New Task</Text>

            <TextInput
                placeholder="Task Name"
                value={taskName}
                onChangeText={text => setTaskName(text)}
            />

            <TextInput
                placeholder="Task Date"
                value={taskDate}
                onChangeText={text => setTaskDate(text)}
            />

            <Button title="Create" onPress={createTask} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
    </Modal>
    );
};

export default EventCreator;

const styles = StyleSheet.create({
    modalContent: {
        height: '44%',
        width: '100%',
        padding: 40,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white'
    },
    modalSelf:{
        height: '100%',
    }
})