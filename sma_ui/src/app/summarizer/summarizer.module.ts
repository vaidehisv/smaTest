import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FileUploadComponenet } from "../shared/components/file-upload-component/file.upload.component";
import { HoverClass } from "../shared/directives/hover-class.directive";
import { SummarizerComponent } from "./summarizer.component";
import { SummarizerRouter } from "./summarizer.router";

@NgModule({
    declarations: [
        SummarizerComponent,
        HoverClass,
        FileUploadComponenet
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        SummarizerRouter,
        FontAwesomeModule
    ]
})
export class SummarizerModule { }