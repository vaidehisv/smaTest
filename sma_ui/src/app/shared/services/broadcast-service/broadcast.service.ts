import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AppEvent } from "../../models/app.event";

@Injectable()
export class BroadcastService<T> {
    private subject: Subject<AppEvent<T>>;

    constructor() {
        this.subject = new Subject();
    }

    public addSubscriber(): Observable<AppEvent<T>> {
        return this.subject.asObservable();
    }

    public broadcastData(value: AppEvent<T>): void {
        this.subject.next(value);
    }
}