import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-action-items-modal',
    templateUrl: './action-item.modal.template.html',
    styleUrls: ["./action-item.modal.style.scss"]
})
export class ActionItemsModalComponent {
    data: any = {};

    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
        this.data = data;
    }
}