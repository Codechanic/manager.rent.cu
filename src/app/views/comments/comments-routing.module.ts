import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CommentsListComponent } from "./comments-list/comments-list.component";
import { CommentsAddEditComponent } from "./comments-add-edit/comments-add-edit.component";
import { CanExitGuard } from "../../guards/can-exit.guard";


const routes: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full"
  },
  {
    path: "list",
    data: { breadcrumb: "Comment's List" },
    component: CommentsListComponent
  },
  {
    path: "edit/:id",
    data: { breadcrumb: "Edit Comment" },
    component: CommentsAddEditComponent,
    canDeactivate: [CanExitGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule {
}
