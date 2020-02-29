import { Component, Inject, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";

import { navItems } from "../../_nav";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-framed-layout",
  templateUrl: "./framed-layout.component.html",
  styleUrls: ["./framed-layout.component.scss"]
})
export class FramedLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;

  constructor(private authService: AuthService, private router: Router, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains("sidebar-minimized");
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  onLogout() {
    this.authService.logout().subscribe((loggedOut) => {
      if (loggedOut) {
        this.router.navigate(["login"]);
      }
    });
  }
}
