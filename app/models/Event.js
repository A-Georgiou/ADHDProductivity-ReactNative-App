export default class Event {
    constructor(id, title, start, end, allDay) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.overlapCoefficient = 0;
    }

    toFirebaseObject() {
        return {
            title: this.title,
            start: this.start,
            end: this.end,
            allDay: this.allDay,
        };
    }

    toString(){
        return `Event: ${this.title} from ${this.start} to ${this.end}`;
    }
}
