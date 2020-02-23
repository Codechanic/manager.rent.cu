import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HousesListComponent } from "./houses-list/houses-list.component";
import { HousesAddEditComponent } from "./houses-add-edit/houses-add-edit.component";
import { AuthGuard } from "../../../guards/auth.guard";
import { CanExitGuard } from "../../../guards/can-exit.guard";

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
      breadcrumb: "Houses' List"
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
        data: { breadcrumb: "Comments" },
        loadChildren: () => import("../comments/comments.module").then(m => m.CommentsModule)
      }
    ]
  },
  {
    path: "new",
    component: HousesAddEditComponent,
    data: {
      breadcrumb: "New House"
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    canDeactivate: [CanExitGuard]
  },
  {
    path: "edit/:id",
    component: HousesAddEditComponent,
    data: {
      breadcrumb: "Edit House"
    },
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    canDeactivate: [CanExitGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousesRoutingModule {
}
