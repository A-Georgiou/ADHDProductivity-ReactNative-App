export default class Event {
    constructor(id, title, start, end, allDay) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.overlapCoefficient = 0;
    }
}