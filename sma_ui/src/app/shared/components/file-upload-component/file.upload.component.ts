import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { AppEventType } from "../../enums/app.event.type";
import { AppEvent } from "../../models/app.event";
import { BroadcastService } from "../../services/broadcast-service/broadcast.service";

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file.upload.template.html',
    styleUrls: ['./file.upload.style.scss']
})
export class FileUploadComponenet implements OnInit {

    @Input('banner-msg') bannerMsg: string = "";
    @Input('style-color') styleColor: string = "yellow";
    @Input('label') fileLabel: string = "file";
    @Output('onFileUpload') onFileUpload: EventEmitter<String>;
    isFileUploaded: boolean = false;
    faUpload = faFileUpload;
    filename: string = "";

    constructor(public broadcastService: BroadcastService<Boolean>) {
        this.onFileUpload = new EventEmitter();
    }

    changePrimaryColor(): void {
        document.documentElement.style.setProperty("--common-color", this.styleColor);
    }

    ngOnInit() {
        this.changePrimaryColor();
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];

        if (file) {
            this.filename = file.name;
            console.log("Uploading file: {}", this.filename);
            setTimeout(() => {
                this.sendLoadingSignal(false);
            }, 4000);
            setTimeout(() => {
                this.sendLoadingSignal(true);
                this.onFileUpload.emit(this.filename);
            }, 1000);
        } else {
            console.error("Failed to upload file");
        }
    }

    private sendLoadingSignal(shouldLoad: boolean): void {
        let appEventData: AppEvent<Boolean> = new AppEvent(AppEventType.LOADING_EVENT);
        appEventData.eventData = shouldLoad;
        this.broadcastService.broadcastData(appEventData);
    }

    /**
     * 1. Show participant list
     * 2. Show drop-down for multi-lingual 
     * 3. Validation for file types and file size
     * 4. P1 - Security scans on the content of the file
     * 5. Support uploading text files
     */

}