import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppEventType } from "../shared/enums/app.event.type";
import { AppEvent } from "../shared/models/app.event";
import { BroadcastService } from "../shared/services/broadcast-service/broadcast.service";

@Component({
    selector: "app-summarizer",
    templateUrl: "./summarizer.template.html",
    styleUrls: ["./summarizer.style.scss"]
})
export class SummarizerComponent implements OnInit {

    isLoaderOn: boolean = false;

    constructor(public broadcastService: BroadcastService<Boolean>, private router: Router) {

    }
    
    ngOnInit(): void {
        
    }

    private toggleLoader(): void {
        let appEventData: AppEvent<Boolean> = new AppEvent(AppEventType.LOADING_EVENT);

        setInterval(() => {
            appEventData.eventData = this.isLoaderOn;
            this.broadcastService.broadcastData(appEventData);
            this.isLoaderOn = !this.isLoaderOn;
        }, 7000);
    }

    onFileUpload(event: any, fileLabel: string): void {
        console.log("Uploaded file {} of type {}", event, fileLabel);
        this.router.navigateByUrl("/summary");
    }
}