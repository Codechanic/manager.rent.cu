import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { BsModalRef } from "ngx-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";

import { environment } from "../../../environments/environment";

@Component({
  selector: "app-house-preview",
  templateUrl: "./house-preview.component.html",
  styleUrls: ["./house-preview.component.scss"]
})
export class HousePreviewComponent implements OnInit {

  /**
   * Url to load in iframe
   */
  previewUrl: SafeResourceUrl;

  /**
   * House data
   */
  house: any;

  /**
   * Component constructor
   * @param bsModalRef NgxBootstrap modal service instance
   * @param sanitizer Dom sanitizer
   * @param spinnerService Spinner service instance
   */
  constructor(private bsModalRef: BsModalRef,
              private sanitizer: DomSanitizer,
              private spinnerService: NgxSpinnerService
  ) {
  }

  /**
   * On component initialization
   */
  ngOnInit() {
    // sanitize the url to load in the iframe
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.uris.preview + "/" + this.house.slug);
    this.spinnerService.show();
  }

  /**
   * On modal close
   */
  onClose() {
    this.bsModalRef.hide();
  }

  /**
   * On iFrame finish loading
   */
  onIFrameLoad() {
    this.spinnerService.hide();
  }
}
