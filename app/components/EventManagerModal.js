import React, { useRef } from 'react';
import { Modal, View, Text, Button, PanResponder } from 'react-native';
import { deleteEvent, modifyEvent } from '../functions/EventManagement';
import { formatTime } from '../functions/FormattingCalendar';

const EventManagerModal = ({ modalVisible, closeEventManager, event }) => {
    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: (event, gestureState) => {
            if (gestureState.dy > 5000) onClose();  // Close modal when swiped down sufficiently
          }
        })
      ).current;

    function onEdit(){
        //modifyEvent();
    }

    function onDelete(){
        //deleteEvent();
    }

    function onClose(){
        closeEventManager();
    }

    if (!modalVisible || !event) return null;

    return (
    <Modal visible={modalVisible} animationType="slide"transparent={true}>
        <View style={styles.container} {...panResponder.panHandlers}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <Text style={styles.date}>{formatTime(event.start, event.end)}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={onEdit} />
                <Button title="Delete" onPress={onDelete} />
                <Button title="Close" onPress={onClose} />
            </View>
        </View>
    </Modal>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'top',
        padding: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    date: {
        fontSize: 14,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
};

export default EventManagerModal;