import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActionItemsModalComponent } from "../shared/modals/action-items/action-item.modal.component";

@Component({
    selector: 'app-summary-display',
    templateUrl: './summary.display.template.html',
    styleUrls: ["./summary.display.style.scss"]
})
export class SummaryDisplayComponent implements OnInit, AfterViewInit {
    summaryData: Object = {};
    @ViewChild("videoPlayer") videoPlayer!: ElementRef;
    @ViewChild("enSummary") elementRef !: ElementRef;
    videoLengths: Array<any> = [];
    summaryInfo: string = "The best training model to train this data in python is CNN.";
    timeStampIndex: any = {};


    constructor(public dialog: MatDialog, public renderer: Renderer2) {
        
    }

    ngOnInit(): void {
        this.videoLengths = [
            {"timeStamp": "0:3", "start": 9, "length": 14},
            {"timeStamp": "0:11", "start": 27, "length": 5},
            {"timeStamp": "0:20", "start": 46, "length": 6},
            {"timeStamp": "0:26", "start": 56, "length": 3}
        ]
    }

    ngAfterViewInit(): void {
        this.createSummaryContent(this.summaryInfo, this.videoLengths, "en", this.elementRef);
    }

    showActionItems(): void {
        const data: Object = {
            "actionItems": ["Write Unit Tests", "Complete Dev Task", "Close the sprint"],
            "agenda": "Achieve the target of the next sprint"
        }

        const dialogRef = this.dialog.open(ActionItemsModalComponent, { data: data });
        dialogRef.afterClosed().subscribe(() => {
            console.log("Action Items modal is closed");
        })
    }

    playVideo(): void {
        if (this.videoPlayer) {
            const video = this.videoPlayer.nativeElement;
            video.play();
            console.log(video.duration);
        }
    }

    seekToVideo(length: String): void {
        try {
            if (this.videoPlayer) {
                const video = this.videoPlayer.nativeElement;
                let timeToSeek: number = this.getTotalVideoTime(length);
                console.log("Seeking video to {}", timeToSeek);
                video.currentTime = timeToSeek;
                
            }
        } catch {
            console.log("Failed to seek to " + length);
        }
    }

    createSummaryContent(summaryData: string, timeInfo: Array<any>, prefix: string, elementRef: ElementRef): void {
        const divElement: HTMLDivElement = this.initSummaryData(summaryData, timeInfo, prefix);
        this.renderer.appendChild(elementRef.nativeElement, divElement);
    }

    private getTotalVideoTime(length: String) : number {
        const parts: Array<number> = length.split(":").map((part: String) => Number(part));
        let multiplier: number = 1;
        let totalTime: number = 0;

        for (let i = parts.length - 1; i >= 0; i--) {
            let part: number = parts[i];
            totalTime += part * multiplier;
            multiplier *= 60;
        }

        return totalTime;
    }

    private initSummaryData(summaryData: string, timeInfo: Array<any>, prefix: string) : HTMLDivElement {
        const divElement: HTMLDivElement = this.renderer.createElement("div");
        let count = 0, prevStart = 0, prevEnd = 0;
        for (let info of timeInfo) {
            prevEnd = info.start
            const text: string = this.extractKeyword(summaryData, prevStart, prevEnd);
            const keyWord: string = this.extractKeyword(summaryData, info.start, info.start + info.length);
            const id: string = prefix + "_word_" + count;
            this.timeStampIndex[id] = info.timeStamp;
            this.addTextElement(text, divElement);
            this.addKeywordSpan(keyWord, id, divElement);
            prevStart = info.start + info.length;
            count++;
        }
        this.addTextElement(this.extractKeyword(summaryData, prevStart), divElement);
        console.log(this.timeStampIndex);
        return divElement;
    }

    private extractKeyword(data: string, start: number, length?: number): string {
        return data.substring(start, length);
    }

    private addKeywordSpan(keyword: string, id: string, divElement: HTMLDivElement): void {
        let span: HTMLSpanElement = this.renderer.createElement("span");
        span.innerHTML = keyword;
        span.classList.add("highlight-word");
        span.id = id;
        span.onclick = this.highlightWordInVideo.bind(this);
        divElement.appendChild(span);
    }

    private addTextElement(text: string, divElement: HTMLDivElement): void {
        divElement.appendChild(this.renderer.createText(text));
    }

    highlightWordInVideo(event: MouseEvent): void {
        let elementId: string = (event.target as Element).id;
        this.seekToVideo(this.timeStampIndex[elementId]);
    }
}