
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { getDocs, addDoc, where, collection, query, or, and } from "firebase/firestore"; 
import eventConverter from '../models/Event';

// Reads in events between two dates
// Queries FireBase for events between two dates
async function getEventsBetween(start, end) {
    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
        console.log('User not logged in.');
        throw new Error("Authentication required: No user is currently logged in.");
    }

    console.log('Getting events between', start.getTime() / 1000, 'and', end.getTime() / 1000);

    try {
        const eventsRef = collection(FIREBASE_DB, "events", "users", user.uid);
        const q = query(
            eventsRef,
            and(
                where("start", ">=", start),
                where("start", "<=", end)
            )
        );
        
        const querySnapshot = await getDocs(q);
        const events = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            events.push({ id: doc.id, ...doc.data() });
        });
        return events;
    } catch (error) {
        console.error('Error getting events:', error);
        throw new Error("Failed to get events: " + error.message);
    }
}

// Function to add an event
async function addEvent(event) {

    const user = FIREBASE_AUTH.currentUser;
    
    if (!user) {
        console.log('User not logged in.');
        throw new Error("Authentication required: No user is currently logged in.");
    }

    try {
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
    getEventsBetween,
    addEvent,
    deleteEvent,
    modifyEvent
};