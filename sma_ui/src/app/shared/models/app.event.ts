import { AppEventType } from "../enums/app.event.type";

export class AppEvent<T> {
    eventType: AppEventType;
    eventData: any;

    constructor(eventType: AppEventType) {
        this.eventType = eventType;
    }
}