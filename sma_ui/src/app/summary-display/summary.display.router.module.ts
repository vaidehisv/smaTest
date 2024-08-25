import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SummaryDisplayComponent } from "./summary.display.component";

const summaryDisplayRoutes: Routes = [
    {
        path: "",
        component: SummaryDisplayComponent,
        pathMatch: "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(summaryDisplayRoutes)],
    exports: [RouterModule]
})
export class SummaryDisplayRouterModule { }