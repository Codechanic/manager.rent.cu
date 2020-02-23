import { Injectable } from "@angular/core";
import { UrlTree, CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";

export interface CanExit {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean
}

@Injectable({
  providedIn: "root"
})
export class CanExitGuard implements CanDeactivate<CanExit> {

  canDeactivate(component: CanExit): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.canDeactivate) {
      return component.canDeactivate();
    }
    return true;
  }

}
