import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable, Subscription } from "rxjs";
import { NgSelectComponent } from "@ng-select/ng-select";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";

import { HouseService } from "../../../services/house.service";
import { House } from "../../../model/house.model";
import { AuthService } from "../../../services/auth.service";
import { OwnerService } from "../../../services/owner.service";
import { Owner } from "../../../model/owner.model";
import { Municipality } from "../../../model/municipality.model";
import { FormDataService } from "../../../services/form-data.service";
import { AccommodationType } from "../../../model/accommodation-type.model";
import { FreeService } from "../../../model/free-service.model";
import { AppCommonConstants } from "../../../constants/common";
import { ExtraCostService } from "../../../model/extra-cost-service.model";
import { Province } from "../../../model/province.model";
import { HouseSeasonPrice } from "../../../model/house-season-price.model";
import { Season } from "../../../model/season.model";
import { SeasonRange } from "../../../model/season-range.model";
import { SeasonModalComponent } from "../../../modals/season-modal/season-modal.component";
import * as dateHelper from "../../../helpers/date.helper";
import { LocationType } from "../../../model/location-type.model";
import { HousePreviewComponent } from "../../../modals/house-preview/house-preview.component";
import { CanExit } from "../../../guards/can-exit.guard";
import { ConfirmComponent } from "../../../modals/confirm/confirm.component";

@Component({
  selector: "app-houses-add-edit",
  templateUrl: "./houses-add-edit.component.html",
  styleUrls: ["./houses-add-edit.component.scss"]
})
export class HousesAddEditComponent implements OnInit, OnDestroy, CanExit {

  /**
   * Form group to collect and validate House data
   */
  houseForm: FormGroup;

  /**
   * House id populated from route params
   */
  houseId: undefined;

  /**
   * House object
   */
  house: House;

  /**
   * House Owner
   */
  owner: Owner;

  /**
   * Object to handle alerts
   */
  alert = { type: "", msg: "", show: false };

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
   * Nearby places observable
   */
  location$: Observable<LocationType[]>;

  /**
   * Nearby places observable
   */
  places$: Observable<ExtraCostService[]>;

  /**
   * Provinces observable
   */
  provinces$: Observable<Province[]>;

  /**
   * List of municipalities
   */
  municipalities: Municipality[];

  /**
   * Dynamic form containing card height
   */
  cardHeight: string;

  /**
   * Property that defines whether or not the municipalities are already loaded
   */
  loadingMunicipalities = false;

  /**
   * Municipalities NgSelectComponent
   */
  @ViewChild("municipalitiesSelect", { static: false }) municipalitiesSelect: NgSelectComponent;

  /**
   * Municipalities NgSelectComponent
   */
  @ViewChild("provincesSelect", { static: false }) provincesSelect: NgSelectComponent;

  /**
   * Reference to the ngx-bootstrap seasons modal
   */
  seasonModalRef: BsModalRef;

  /**
   * Reference to the ngx-bootstrap house-preview modal
   */
  housePreviewModalRef: BsModalRef;

  /**
   * Reference to the ngx-bootstrap confirm modal
   */
  confirmModalRef: BsModalRef;

  /**
   * Date helper that contains util functions
   */
  dateHelper = dateHelper;

  /**
   * Array of subscriptions to keep control over them
   */
  componentSubscriptions: Subscription[] = [];

  /**
   * Component constructor
   * @param houseService House handling service
   * @param ownerService Manager handling service
   * @param activatedRoute Activated route
   * @param authService Authentication service
   * @param formDataService Form data service
   * @param fb Form builder Angular service
   * @param router Angular router service
   * @param modalService NgxBootstrap modal service
   * @param spinnerService Spinner service
   */
  constructor(
    private houseService: HouseService,
    private ownerService: OwnerService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formDataService: FormDataService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService,
    private spinnerService: NgxSpinnerService) {
    this.houseForm = this.fb.group({
      id: this.fb.control(""),
      name: this.fb.control("", Validators.required),
      address: this.fb.control("", Validators.required),
      phones: this.fb.control("", Validators.required),
      rooms: this.fb.control("", Validators.required),
      email: this.fb.control({ value: "", disabled: true }),
      owner: this.fb.control({ value: "", disabled: true }),
      ownerId: this.fb.control(""),
      description: this.fb.control("", Validators.required),
      municipality: this.fb.control("", Validators.required),
      location: this.fb.control("", Validators.required),
      latitude: this.fb.control(""),
      longitude: this.fb.control(""),
      metaKeywords: this.fb.control(""),
      accommodation: this.fb.control("", Validators.required),
      places: this.fb.control("", Validators.required),
      homestayFreeservices: this.fb.control(""),
      homestayNotOffered: this.fb.control(""),
      homestayExtracosts: this.fb.control(""),
      homestayPrices: this.fb.array([])
    });
  }

  /**
   * Angular component lifecycle hook
   * @description Allows to execute custom code after the input properties are initialized
   */
  ngOnInit() {

    /* show message if this route was reached because of the creation of a new house */
    if (this.activatedRoute.snapshot.queryParams.created) {
      this.showAlertMessage(
        AppCommonConstants.ALERT_MESSAGE_TYPES.SUCCESS,
        AppCommonConstants.ALERT_MESSAGES.HOUSE_CREATED
      );
    }

    /* get the owner object from the server using the owner's id associated to the authenticated user */
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

      this.spinnerService.show();

      /* get the house object from the server and populate the form with its data */
      this.houseService.findById(this.houseId).subscribe((house) => {
        this.house = house;
        console.log(house);
        if (!(this.provincesSelect.itemsList.items.length > 0)) {
          this.provinces$.subscribe(() => {
            this.initializeProvince();
          });
        } else {
          this.initializeProvince();
        }
        this.populateForm();
        this.spinnerService.hide();
      });
    } else {
      this.formDataService.defaultSeasons().subscribe((defaultSeasons: Season[]) => {
        this.initializeProvince();
        this.onReset();

        const homestayPrices = [];
        for (const defaultSeason of defaultSeasons) {
          const homestayPrice = new HouseSeasonPrice();
          homestayPrice.season = defaultSeason;
          homestayPrices.push(homestayPrice);
        }
        this.houseForm.controls["homestayPrices"] = this.setHomestayPrices(homestayPrices);

        this.spinnerService.hide();
      });
    }

    /**
     * initialize form ng-select components
     */
    this.initializeNgSelectObservables();

    /**
     * set form containing card automatically
     */
    this.setCardHeight();

    /**
     * initialize subscription to season modal result
     */
    this.initializeModalSubscription();

  }

  /**
   * Initialize province-municipality relationship
   */
  initializeProvince() {
    const provinceToSelect = this.house ? this.provincesSelect.itemsList.findByLabel(
      this.house.municipality.province.name
    ) : undefined;

    this.provincesSelect.registerOnChange(this.provinceSelected.bind(this));

    if (provinceToSelect) {
      this.provincesSelect.select(provinceToSelect);
    }
  }

  /**
   * Initialize all NgSelect-associated observables
   */
  initializeNgSelectObservables() {

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

    /*
     * create the nearby places observable
     */
    this.places$ = this.formDataService.places();

    /*
     * create the provinces observable
     */
    this.provinces$ = this.formDataService.provinces();

    /*
     * create the provinces observable
     */
    this.location$ = this.formDataService.locationTypes();
  }

  /**
   * Initialize subscription to season modal result
   */
  initializeModalSubscription() {
    const modalSubscription = this.modalService.onHide.subscribe((sd) => {
      if (this.seasonModalRef && this.seasonModalRef.content.confirmed) {
        const season = this.seasonModalRef.content.seasonForm.value;
        if (season) {
          for (const seasonRange of season.seasonRanges) {
            const start = new Date(seasonRange.range[0]);
            const end = new Date(seasonRange.range[1]);
            seasonRange.start = dateHelper.getStorageDateFormat(start.toString());
            seasonRange.end = dateHelper.getStorageDateFormat(end.toString());
          }

          this.addSeason(season);
        }
      }
    });

    this.componentSubscriptions.push(modalSubscription);
  }

  /**
   * Populates the house form using a House object
   */
  populateForm() {
    this.houseForm.controls["id"].setValue(this.house.id);
    this.houseForm.controls["name"].setValue(this.house.name);
    this.houseForm.controls["address"].setValue(this.house.address);
    this.houseForm.controls["phones"].setValue(this.house.phones);
    this.houseForm.controls["rooms"].setValue(this.house.rooms);
    this.houseForm.controls["description"].setValue(this.house.description);
    this.houseForm.controls["latitude"].setValue(this.house.latitude);
    this.houseForm.controls["longitude"].setValue(this.house.longitude);
    this.houseForm.controls["metaKeywords"].setValue(this.house.metaKeywords);

    // set one-to-one relationships
    this.house.municipality
      ? this.houseForm.controls["municipality"].setValue(this.house.municipality.id)
      : this.houseForm.controls["municipality"].reset();
    this.house.accommodation
      ? this.houseForm.controls["accommodation"].setValue(this.house.accommodation.id)
      : this.houseForm.controls["accommodation"].reset;
    this.house.location
      ? this.houseForm.controls["location"].setValue(this.house.location.id)
      : this.houseForm.controls["location"].reset();

    /* set many-to-many relationship values */
    this.setManyToManyRelationships(this.house);

    /* set the form controls for the homestayPrices relationship */
    this.houseForm.controls["homestayPrices"] = this.setHomestayPrices(this.house.homestayPrices);
  }

  /**
   * Function called on submitting the form
   */
  onSubmit() {

    this.houseForm.markAllAsTouched();

    /* the house form data is valid */
    if (this.houseForm.valid) {

      /* tweak it to send the owner's id alongside house data */
      this.houseForm.controls["ownerId"].setValue(this.authService.currentUser().id);

      /* send the many-to-many relationship values as arrays of objects */
      const homestayFreeservices = this.houseForm.controls["homestayFreeservices"].value
        ? this.houseForm.controls["homestayFreeservices"].value.map((homestayFreeserviceId) => {
          return { id: homestayFreeserviceId };
        })
        : null;
      this.houseForm.controls["homestayFreeservices"].setValue(homestayFreeservices);

      const homestayNotOffered = this.houseForm.controls["homestayNotOffered"].value
        ? this.houseForm.controls["homestayNotOffered"].value.map((homestayNotOfferedId) => {
          return { id: homestayNotOfferedId };
        })
        : null;
      this.houseForm.controls["homestayNotOffered"].setValue(homestayNotOffered);

      const homestayExtracosts = this.houseForm.controls["homestayExtracosts"].value
        ? this.houseForm.controls["homestayExtracosts"].value.map((homestayExtracostId) => {
          return { id: homestayExtracostId };
        })
        : null;
      this.houseForm.controls["homestayExtracosts"].setValue(homestayExtracosts);

      const places = this.houseForm.controls["places"].value
        ? this.houseForm.controls["places"].value.map((placeId) => {
          return { id: placeId };
        })
        : null;
      this.houseForm.controls["places"].setValue(places);

      /* if there was not a house id set */
      if (!this.houseId) {

        /* tweak the form data so the id field doesn't travel to the server */
        this.houseForm.removeControl("id");

        /* enable disabled field so the values are passed alongside the other form values*/
        this.houseForm.controls["owner"].enable();
        this.houseForm.controls["email"].enable();

        /* call the service action to create a new house object */
        this.houseService.create(this.houseForm.value).subscribe((result: House) => {

          this.houseForm.markAsPristine();

          this.router.navigate(["houses/edit/" + result.id], { queryParams: { created: true } });
        }, error => {

          /* if the operation was unsuccessful, alert the user about it */
          this.houseForm.controls["owner"].setValue(this.owner.name);
          this.houseForm.addControl("id", new FormControl(""));
          this.houseForm.controls["owner"].disable();
          this.houseForm.controls["email"].disable();

          this.showAlertMessage(
            AppCommonConstants.ALERT_MESSAGE_TYPES.DANGER,
            error
          );
        });
      } else {

        /* call the service action to update the current house object on the server */
        this.houseService.update(this.houseForm.value).subscribe((result) => {

          /* if the operation was successful, alert the user about it */
          this.showAlertMessage(
            AppCommonConstants.ALERT_MESSAGE_TYPES.SUCCESS,
            AppCommonConstants.ALERT_MESSAGES.HOUSE_UPDATED
          );

          /* reset the many-to-many relationships */
          this.setManyToManyRelationships(result[0]);

        }, error => {

          /* if the operation was unsuccessful, alert the user about it */
          this.houseForm.controls["owner"].setValue(this.owner.name);
          this.showAlertMessage(
            AppCommonConstants.ALERT_MESSAGE_TYPES.DANGER,
            error
          );
        });
      }
    }
  }

  /**
   * Listener for the change event of the province ng-select
   * @param provinceId Id of the selected province
   */
  provinceSelected(provinceId) {
    // if a province is selected, update the model of the municipalities select
    if (provinceId) {
      this.municipalitiesSelect.clearModel();
      this.loadingMunicipalities = true;
      this.formDataService.municipalitiesByProvinceId(provinceId).subscribe((municipalities: Municipality[]) => {
        this.municipalities = municipalities;
        this.loadingMunicipalities = false;
        if (this.house) {
          setTimeout(() => {
            const municipalityToSelect = this.municipalitiesSelect.itemsList.findByLabel(
              this.house.municipality.name
            );
            if (municipalityToSelect) {
              this.municipalitiesSelect.select(municipalityToSelect);
            }
          });
        }
      });
    }
  }

  /**
   * Set the height of the list containing card dynamically
   */
  setCardHeight() {

    this.cardHeight = (
      document.getElementsByClassName("nav")[2].clientHeight -
      50 -
      AppCommonConstants.LIST_CONTAINING_CARD_PADDING
    ) + "px";

  }

  setHomestayPrices(homestayPrices: HouseSeasonPrice[]) {
    const arr = new FormArray([]);
    for (const homestayPrice of homestayPrices) {
      arr.push(this.fb.group({
        id: homestayPrice.id,
        code: "1",
        price: homestayPrice.price ? homestayPrice.price : 0,
        season: this.setSeason(homestayPrice.season)
      }));
    }
    return arr;
  }

  setSeason(season: any) {
    return this.fb.group({
      id: season.id,
      name: season.name,
      seasonRanges: this.setSeasonRanges(season.seasonRanges)
    });
  }

  setSeasonRanges(seasonRanges: SeasonRange[]) {
    const arr = new FormArray([]);
    for (const seasonRange of seasonRanges) {
      arr.push(this.fb.group({
        id: seasonRange.id,
        start: seasonRange.start,
        end: seasonRange.end
      }));
    }

    return arr;
  }

  setManyToManyRelationships(house: House) {

    this.houseForm.controls["homestayFreeservices"].setValue((house).homestayFreeservices
      .map((freeService) => {
        return freeService.id;
      }));

    this.houseForm.controls["homestayNotOffered"].setValue((house).homestayNotOffered
      .map((notOfferedService) => {
        return notOfferedService.id;
      }));

    this.houseForm.controls["homestayExtracosts"].setValue((house).homestayExtracosts
      .map((extraCostService) => {
        return extraCostService.id;
      }));

    this.houseForm.controls["places"].setValue((house).places
      .map((place) => {
        return place.id;
      }));
  }

  showAlertMessage(type: string, message: string) {
    this.alert.type = type;
    this.alert.msg = message;
    this.alert.show = true;

  }

  openNewSeasonModal() {
    this.seasonModalRef = this.modalService.show(SeasonModalComponent, { class: "season-modal modal-lg" });
  }

  addSeason(season: Season) {
    this.removeDefaultSeasons();

    const homestayPricesFormControls = <FormArray>this.houseForm.controls["homestayPrices"];

    this.houseForm.controls["homestayPrices"] = this.setHomestayPrices(homestayPricesFormControls.value.concat([{
      id: null,
      price: null,
      code: "1",
      season
    }]));

    console.log(this.houseForm.controls["homestayPrices"].value);
  }

  removeDefaultSeasons() {

    const homestayPricesFormControls = <FormArray>this.houseForm.controls["homestayPrices"];

    for (let i = 0; i < homestayPricesFormControls.controls.length; i++) {
      if ([7, 9].includes(homestayPricesFormControls.controls[i].value.season.id)) {
        homestayPricesFormControls.removeAt(i);
        i--;
      }
    }
  }

  ngOnDestroy(): void {
    for (const subscription of this.componentSubscriptions) {
      subscription.unsubscribe();
    }
  }

  onReset() {
    this.houseForm.controls["homestayPrices"] = this.fb.array([]);
    this.houseForm.reset();
    this.houseForm.controls["owner"].setValue(this.owner.name);
    this.houseForm.controls["email"].setValue(this.owner.email);
    this.houseForm.controls["id"].setValue(this.houseId);
  }

  onPreview() {
    const initialState = { house: this.house };
    this.housePreviewModalRef = this.modalService.show(HousePreviewComponent, {
      class: "house-preview-modal",
      initialState
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.houseForm.touched && this.houseForm.dirty) {
      const initialState = {
        confirmMessage: "There are unsaved changes. " +
          "Are you sure you want to leave this page? " +
          "All unsaved changes will be lost."
      };
      this.confirmModalRef = this.modalService.show(ConfirmComponent, { initialState });
      return this.confirmModalRef.content.onConfirmed;
    }
    return true;
  }
}
