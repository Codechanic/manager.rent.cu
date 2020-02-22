import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { BsModalRef } from "ngx-bootstrap";

import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-house-preview",
  templateUrl: "./house-preview.component.html",
  styleUrls: ["./house-preview.component.scss"]
})
export class HousePreviewComponent implements OnInit {

  previewUrl: SafeResourceUrl;

  house: any;

  constructor(private bsModalRef: BsModalRef,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.uris.preview + "/" + this.house.slug);
    console.log(this.previewUrl);
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
