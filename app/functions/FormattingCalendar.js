import { MINUTE_HEIGHT } from '../config/UIDimensions';

// Formats the time of an event to format HH:MMam - HH:MMpm
function formatTime(start, end){
    const startHour = start.getHours();
    const startMinutes = start.getMinutes();
    const endHour = end.getHours();
    const endMinutes = end.getMinutes();

    return `${startHour == 0 ? 12 : startHour%12}:${startMinutes.toString().padStart(2, '0')}${startHour < 12 ? 'am' : 'pm'} - ${endHour == 0 ? 12 : endHour%12}:${endMinutes.toString().padStart(2, '0')}${endHour < 12 ? 'am' : 'pm'}`;
}

// Calculates the height of the div representing the event
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

// Calculates the overlap coefficient for each event
function calculateOverlapCoeff(events){
    for (let i = 0; i < events.length; i++){
        for (let j = i+1; j < events.length; j++){
            if (events[i].end > events[j].start){
                events[j].overlapCoefficient = events[i].overlapCoefficient + 1;
            }
        }
    }
}

export { formatTime, calculateHeight, calculateOverlapCoeff }