
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import eventConverter from '../models/Event';

// Function to add an event
async function addEvent(event) {

    console.log('Adding event to Firestore: ', event);

    const user = FIREBASE_AUTH.currentUser;
    
    console.log('Current user: ', user);

    if (!user) {
        console.log('User not logged in.');
        throw new Error("Authentication required: No user is currently logged in.");
    }

    // Correct usage of template literals for Firestore path
    const userEventsPath = `events/users/${user.uid}`;

    try {
        console.log("Firebase DB: ", FIREBASE_DB)
        const docRef = await addDoc(collection(FIREBASE_DB, "events", "users", user.uid), event.toFirebaseObject());
        console.log('Event added with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error adding event:', error);
        throw new Error("Failed to add event: " + error.message);
    }
}

// Function to delete an event
async function deleteEvent(eventId) {
    try {
        await FIREBASE_DB.collection('events').doc(eventId).delete();
        console.log('Event deleted with ID: ', eventId);
    } catch (error) {
        console.error('Error deleting event: ', error);
        throw error;
    }
}

// Function to modify an event
async function modifyEvent(eventId, updatedEvent) {
    try {
        await FIREBASE_DB.collection('events').doc(eventId).update(updatedEvent);
        console.log('Event modified with ID: ', eventId);
    } catch (error) {
        console.error('Error modifying event: ', error);
        throw error;
    }
}

module.exports = {
    addEvent,
    deleteEvent,
    modifyEvent
};