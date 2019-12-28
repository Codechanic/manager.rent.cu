import { Component, OnInit } from "@angular/core";

import { Owner } from "../../../model/owner.model";
import { HouseService } from "../../../services/house.service";
import { OwnerService } from "../../../services/owner.service";
import { House } from "../../../model/house.model";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-house-card",
  templateUrl: "./house-card.component.html",
  styleUrls: ["./house-card.component.scss"]
})
export class HouseCardComponent implements OnInit {

  /**
   * Object that holds House data
   */
  house: House;

  /**
   * Object that holds Owner data
   */
  owner: Owner;

  /**
   * Component's constructor
   * @param houseService House service
   * @param ownerService Owner service
   * @param authService Authentication service
   * @param activatedRoute Activated route service
   */
  constructor(
    private houseService: HouseService,
    private ownerService: OwnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) {
  }

  /**
   * Component's initialization lifecycle hook
   */
  ngOnInit() {
    /* get the house's id from the activated route */
    const houseId = this.activatedRoute.snapshot.params["id"];

    /*
     * if there is a house id, it means that the component has been instantiated to edit a house,
     * otherwise, it's being used to create a new house
     */
    if (houseId) {

      /* get the house object from the server and populate the form with its data */
      this.houseService.findById(houseId).subscribe((house) => {
        this.house = house;
      });
    }

    /* call service action to retrieve a owner-card by its id */
    this.ownerService.findById(this.authService.currentUser().id).subscribe((owner: Owner) => {
      this.owner = owner;
    }, (error) => {
      console.log(error);
    });
  }

}
