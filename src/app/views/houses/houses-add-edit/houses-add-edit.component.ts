import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { HouseService } from "../../../services/house.service";
import { House } from "../../../model/house.model";
import { AuthService } from "../../../services/auth.service";
import { OwnerService } from "../../../services/owner.service";
import { Owner } from "../../../model/owner.model";
import { Municipality } from "../../../model/municipality.model";
import { FormDataService } from "../../../services/form-data.service";
import { AccommodationType } from "../../../model/accommodation-type.model";
import { Observable } from "rxjs";
import { FreeService } from "../../../model/free-service.model";
import { AppCommonConstants } from "../../../constants/common";
import { NotOffered } from "../../../model/not-offered.model";
import { ExtraCostService } from "../../../model/extra-cost-service.model";

@Component({
  selector: "app-houses-add-edit",
  templateUrl: "./houses-add-edit.component.html",
  styleUrls: ["./houses-add-edit.component.scss"]
})
export class HousesAddEditComponent implements OnInit {

  /**
   * Form group to collect and validate House data
   */
  houseForm = new FormGroup({
    id: new FormControl(""),
    name: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    phones: new FormControl(""),
    rooms: new FormControl(""),
    email: new FormControl({ value: "", disabled: true }),
    owner: new FormControl({ value: "", disabled: true }),
    ownerId: new FormControl(""),
    description: new FormControl(""),
    municipality: new FormControl(""),
    latitude: new FormControl(""),
    longitude: new FormControl(""),
    metaKeywords: new FormControl(""),
    accommodation: new FormControl(""),
    homestayFreeservices: new FormControl(""),
    homestayNotOffered: new FormControl(""),
    homestayExtracosts: new FormControl("")
  });

  /**
   * House id populated from route params
   */
  houseId: undefined;

  /**
   * House Owner
   */
  owner: Owner;

  /**
   * Object to handle alerts
   */
  alert = { type: "", msg: "", show: false };

  /**
   * List of municipalities' observable
   */
  municipalities$: Observable<Municipality[]>;

  /**
   * Accommodation types observable
   */
  accommodationTypes$: Observable<AccommodationType[]>;

  /**
   * Free services observable
   */
  freeServices$: Observable<FreeService[]>;

  /**
   * Not offered services observable
   */
  notOffered$: Observable<FreeService[]>;

  /**
   * Extra-cost services observable
   */
  extraCost$: Observable<ExtraCostService[]>;

  /**
   * Dynamic form containing card height
   */
  private cardHeight: string;

  /**
   * Component constructor
   * @param houseService House handling service
   * @param ownerService Manager handling service
   * @param activatedRoute Activated route
   * @param authService Authentication service
   * @param formDataService Form data service
   */
  constructor(
    private houseService: HouseService,
    private ownerService: OwnerService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formDataService: FormDataService) {
  }

  ngOnInit() {

    /* get the owner-card object from the server using the owner-card's id associated to the authenticated user */
    this.ownerService.findById(this.authService.currentUser().id).subscribe((owner) => {
      this.owner = owner;
      this.houseForm.controls["owner"].setValue(owner.name);
      this.houseForm.controls["email"].setValue(owner.email);
    });

    /* get the house's id from the activated route */
    this.houseId = this.activatedRoute.snapshot.params["id"];

    /*
     * if there is a house id, it means that the component has been instantiated to edit a house,
     * otherwise, it's being used to create a new house
     */
    if (this.houseId) {

      /* get the house object from the server and populate the form with its data */
      this.houseService.findById(this.houseId).subscribe((house) => {
        console.log(house);
        this.populateForm(house);
      });
    }

    /*
     * create the  municipalities observable
     */
    this.municipalities$ = this.formDataService.municipalities();

    /*
     * create the accommodation types observable
     */
    this.accommodationTypes$ = this.formDataService.accommodationTypes();

    /*
     * create the free services observable
     */
    this.freeServices$ = this.formDataService.freeServices();

    /*
     * create the not offered services observable
     */
    this.notOffered$ = this.formDataService.notOffered();

    /*
     * create the not offered services observable
     */
    this.extraCost$ = this.formDataService.extraCost();

    /**
     * set form containing card automatically
     */
    this.setCardHeight();

  }

  /**
   * Set the height of the list containing card dynamically
   */
  setCardHeight() {

    this.cardHeight = (
      document.getElementsByClassName("nav")[2].clientHeight -
      document.getElementsByClassName("breadcrumb")[0].clientHeight -
      AppCommonConstants.LIST_CONTAINING_CARD_PADDING
    ) + "px";

  }

  /**
   * Populates the house form using a House object
   * @param house House object to populate the form from
   */
  populateForm(house: House) {
    this.houseForm.controls["id"].setValue(house.id);
    this.houseForm.controls["name"].setValue(house.name);
    this.houseForm.controls["address"].setValue(house.address);
    this.houseForm.controls["phones"].setValue(house.phones);
    this.houseForm.controls["rooms"].setValue(house.rooms);
    this.houseForm.controls["description"].setValue(house.description);
    this.houseForm.controls["latitude"].setValue(house.latitude);
    this.houseForm.controls["longitude"].setValue(house.longitude);
    this.houseForm.controls["metaKeywords"].setValue(house.metaKeywords);
    this.houseForm.controls["municipality"].setValue(house.municipality.id);
    this.houseForm.controls["accommodation"].setValue(house.accommodation.id);

    /* set man-to-many relationship values */
    this.houseForm.controls["homestayFreeservices"].setValue(
      house.homestayFreeservices.map((homestayFreeservice: FreeService) => {
        return homestayFreeservice.id;
      })
    );
    this.houseForm.controls["homestayNotOffered"].setValue(
      house.homestayNotOffered.map((homestayNotOfferedService: NotOffered) => {
        return homestayNotOfferedService.id;
      })
    );
    this.houseForm.controls["homestayExtracosts"].setValue(
      house.homestayExtracosts.map((homestayExtracost: ExtraCostService) => {
        return homestayExtracost.id;
      })
    );
  }

  /**
   * Function called on submitting the form
   */
  onSubmit() {

    /* the house form data is valid */
    if (this.houseForm.valid) {

      /* tweak it to send the owner's id alongside house data */
      this.houseForm.controls["ownerId"].setValue(this.authService.currentUser().id);

      /* send the many-to-many relationship values as arrays of objects */
      const homestayFreeservices = this.houseForm.controls["homestayFreeservices"].value.map(
        (homestayFreeserviceId) => {
          return { id: homestayFreeserviceId };
        });
      this.houseForm.controls["homestayFreeservices"].setValue(homestayFreeservices);

      const homestayNotOffered = this.houseForm.controls["homestayNotOffered"].value.map(
        (homestayNotOfferedId) => {
          return { id: homestayNotOfferedId };
        });
      this.houseForm.controls["homestayNotOffered"].setValue(homestayNotOffered);

      const homestayExtracosts = this.houseForm.controls["homestayExtracosts"].value.map(
        (homestayExtracostId) => {
          return { id: homestayExtracostId };
        });
      this.houseForm.controls["homestayExtracosts"].setValue(homestayExtracosts);

      /* if there was not a house id set */
      if (!this.houseId) {

        /* tweak the form data so the id field don't travel to the server */
        this.houseForm.removeControl("id");

        /* enable disabled field so the values are passed alongside the rest*/
        this.houseForm.controls["owner"].enable();
        this.houseForm.controls["email"].enable();

        /* call the service action to create a new house object */
        this.houseService.create(this.houseForm.value).subscribe((result) => {

          /* if the operation was successful, alert the user about it */
          this.alert.type = "success";
          this.alert.msg = "House created successfully";
          this.alert.show = true;
          this.houseForm.controls["owner"].setValue(this.owner.name);
          this.houseForm.addControl("id", new FormControl(""));
          this.houseForm.controls["owner"].disable();
          this.houseForm.controls["email"].disable();
        }, error => {

          /* if the operation was unsuccessful, alert the user about it */
          this.houseForm.controls["owner"].setValue(this.owner.name);
          this.houseForm.addControl("id", new FormControl(""));
          this.houseForm.controls["owner"].disable();
          this.houseForm.controls["email"].disable();
          this.alert.type = "danger";
          this.alert.msg = error;
          this.alert.show = true;
        });
      } else {

        /* call the service action to update the current house object on the server */
        this.houseService.update(this.houseForm.value).subscribe((result) => {

          /* if the operation was successful, alert the user about it */
          this.alert.type = "success";
          this.alert.msg = "House updated successfully";
          this.alert.show = true;

          /* reset the many-to-many relationships */
          this.houseForm.controls["homestayFreeservices"].setValue((result[0] as House).homestayFreeservices
            .map((freeService) => {
              return freeService.id;
            }));

          this.houseForm.controls["homestayNotOffered"].setValue((result[0] as House).homestayNotOffered
            .map((notOfferedService) => {
              return notOfferedService.id;
            }));

          this.houseForm.controls["homestayExtracosts"].setValue((result[0] as House).homestayExtracosts
            .map((extraCostService) => {
              return extraCostService.id;
            }));

        }, error => {

          /* if the operation was unsuccessful, alert the user about it */
          this.houseForm.controls["owner"].setValue(this.owner.name);
          this.alert.type = "danger";
          this.alert.msg = error;
          this.alert.show = true;
        });
      }
    }
  }
}
