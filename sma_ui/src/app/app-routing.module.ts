import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "summarizer",
    pathMatch: "full",
    loadChildren: () => import("./summarizer/summarizer.module").then(m => m.SummarizerModule)
  },
  {
    path: "summary",
    pathMatch: "full",
    loadChildren: () => import("./summary-display/summary.display.module").then(m => m.SummaryDisplayModule)
  },
  {
    path: "",
    redirectTo: "/summarizer",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
