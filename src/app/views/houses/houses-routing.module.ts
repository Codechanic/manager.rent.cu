import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HousesListComponent } from "./houses-list/houses-list.component";
import { HousesAddEditComponent } from "./houses-add-edit/houses-add-edit.component";
import { AuthGuard } from "../../services/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full",
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: "list",
    data: {
      title: "Houses' List"
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: HousesListComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: "comments/:id",
        data: { title: "Comments" },
        loadChildren: () => import("../comments/comments.module").then(m => m.CommentsModule)
      }
    ]
  },
  {
    path: "new",
    component: HousesAddEditComponent,
    data: {
      title: "New House"
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: "edit/:id",
    component: HousesAddEditComponent,
    data: {
      title: "Edit House"
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousesRoutingModule {
}
