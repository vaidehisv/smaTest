import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs"
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { SummaryDisplayComponent } from "./summary.display.component";
import { SummaryDisplayRouterModule } from "./summary.display.router.module";
import { ActionItemsModalComponent } from "../shared/modals/action-items/action-item.modal.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        SummaryDisplayComponent,
        ActionItemsModalComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatButtonModule,
        MatDialogModule,
        SummaryDisplayRouterModule
    ]
})
export class SummaryDisplayModule { }