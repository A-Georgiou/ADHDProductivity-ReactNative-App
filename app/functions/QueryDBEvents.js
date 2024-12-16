
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { getDocs, addDoc, where, collection, query, or } from "firebase/firestore"; 
import { getEventsBetween } from './FirebaseInitial';
import eventConverter from '../models/Event';

/*

QueryDBEvents.js:
- Function to handle fetching events for a specific month

*/
function getMonthDateRange(month, year) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);
    endDate.setMilliseconds(-1);
    
    return {
        start: startDate,
        end: endDate
    };
}

async function getEventsForMonth(month, year) {
    const { start, end } = getMonthDateRange(month, year);
    return await getEventsBetween(start, end);
}

module.exports = {
    getEventsForMonth
};