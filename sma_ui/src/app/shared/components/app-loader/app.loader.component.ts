import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { AppEventType } from "../../enums/app.event.type";
import { AppEvent } from "../../models/app.event";
import { BroadcastService } from "../../services/broadcast-service/broadcast.service";


@Component({
    selector: 'app-loader',
    templateUrl: "./app.loader.template.html",
    styleUrls: ["./app.loader.style.scss"]
})
export class AppLoaderComponent implements OnInit, OnDestroy {
    observer: Observable<AppEvent<Boolean>>;
    broadcastService: BroadcastService<Boolean>;
    serviceSubscription: any;
    showLoader: boolean = false;

    constructor(broadcastService: BroadcastService<Boolean>) {
        this.broadcastService = broadcastService;
        this.observer = this.broadcastService.addSubscriber();
    }

    ngOnInit(): void {
        this.serviceSubscription = this.observer.subscribe((eventData: AppEvent<Boolean>) => {
            this.handleLoader(eventData);
        });
    }

    ngOnDestroy(): void {
        this.serviceSubscription.unsubscribe();
    }

    private handleLoader(eventData: AppEvent<Boolean>): void {
        if (eventData.eventType == AppEventType.LOADING_EVENT) {
            this.showLoader = eventData.eventData;
            console.log("Show loader: ", this.showLoader);
        }
    }
}