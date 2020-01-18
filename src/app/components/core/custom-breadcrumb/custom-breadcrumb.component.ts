import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

interface IBreadcrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: "app-custom-breadcrumb",
  templateUrl: "./custom-breadcrumb.component.html",
  styleUrls: ["./custom-breadcrumb.component.scss"]
})
export class CustomBreadcrumbComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => console.log(data));
    this.activatedRoute.url.subscribe((data) => console.log(data));
    this.activatedRoute.fragment.subscribe((data) => console.log(data));
    this.activatedRoute.params.subscribe((data) => console.log(data));
  }

}
