import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SummarizerComponent } from "./summarizer.component";

const routes: Routes = [
    {path: "", component: SummarizerComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class SummarizerRouter { }