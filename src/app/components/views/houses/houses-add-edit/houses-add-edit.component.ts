import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { NgSelectComponent } from '@ng-select/ng-select';

import { HouseService } from '../../../../services/house.service';
import { House } from '../../../../model/house.model';
import { AuthService } from '../../../../services/auth.service';
import { OwnerService } from '../../../../services/owner.service';
import { Owner } from '../../../../model/owner.model';
import { Municipality } from '../../../../model/municipality.model';
import { FormDataService } from '../../../../services/form-data.service';
import { AccommodationType } from '../../../../model/accommodation-type.model';
import { FreeService } from '../../../../model/free-service.model';
import { AppCommonConstants } from '../../../../constants/common';
import { NotOffered } from '../../../../model/not-offered.model';
import { ExtraCostService } from '../../../../model/extra-cost-service.model';
import { Place } from '../../../../model/place.model';
import { Province } from '../../../../model/province.model';

@Component({
  selector: 'app-houses-add-edit',
  templateUrl: './houses-add-edit.component.html',
  styleUrls: ['./houses-add-edit.component.scss']
})
export class HousesAddEditComponent implements OnInit {

  /**
   * Form group to collect and validate House data
   */
  houseForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phones: new FormControl(''),
    rooms: new FormControl(''),
    email: new FormControl({ value: '', disabled: true }),
    owner: new FormControl({ value: '', disabled: true }),
    ownerId: new FormControl(''),
    description: new FormControl(''),
    municipality: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    metaKeywords: new FormControl(''),
    accommodation: new FormControl(''),
    homestayFreeservices: new FormControl(''),
    homestayNotOffered: new FormControl(''),
    homestayExtracosts: new FormControl(''),
    places: new FormControl('')
  });

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
  alert = { type: '', msg: '', show: false };

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
  places$: Observable<ExtraCostService[]>;

  /**
   * Provinces observable
   */
  provinces$: Observable<Province[]>;

  /**
   * List of provinces
   */
  provinces: Province[];

  /**
   * List of municipalities
   */
  municipalities: Municipality[];

  /**
   * Municipalities NgSelectComponent
   */
  @ViewChild('municipalitiesSelect', { static: false }) municipalitiesSelect: NgSelectComponent;

  /**
   * Municipalities NgSelectComponent
   */
  @ViewChild('provincesSelect', { static: false }) provincesSelect: NgSelectComponent;

  /**
   * Dynamic form containing card height
   */
  cardHeight: string;

  /**
   * Property that defines whether or not the municipalities are already loaded
   */
  loadingMunicipalities = false;

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

  /**
   * Angular component lifecycle hook
   * @description Allows to execute custom code after the input properties are initialized
   */
  ngOnInit() {

    /* get the owner object from the server using the owner's id associated to the authenticated user */
    this.ownerService.findById(this.authService.currentUser().id).subscribe((owner) => {
      this.owner = owner;
      this.houseForm.controls['owner'].setValue(owner.name);
      this.houseForm.controls['email'].setValue(owner.email);
    });

    /* get the house's id from the activated route */
    this.houseId = this.activatedRoute.snapshot.params['id'];

    /*
     * if there is a house id, it means that the component has been instantiated to edit a house,
     * otherwise, it's being used to create a new house
     */
    if (this.houseId) {

      /* get the house object from the server and populate the form with its data */
      this.houseService.findById(this.houseId).subscribe((house) => {
        this.house = house;
        console.log(house);
        this.populateForm();
        if (!(this.provincesSelect.itemsList.items.length > 0)) {
          this.provinces$.subscribe(() => {
            this.initializeProvince();
          });
        } else {
          this.initializeProvince();
        }
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

  }

  /**
   * Initialize province-municipality relationship
   */
  initializeProvince() {
    const provinceToSelect = this.provincesSelect.itemsList.findByLabel(
      this.house.municipality.province.name
    );
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
  }

  /**
   * Set the height of the list containing card dynamically
   */
  setCardHeight() {

    this.cardHeight = (
      document.getElementsByClassName('nav')[2].clientHeight -
      50 -
      AppCommonConstants.LIST_CONTAINING_CARD_PADDING
    ) + 'px';

  }

  /**
   * Populates the house form using a House object
   */
  populateForm() {
    this.houseForm.controls['id'].setValue(this.house.id);
    this.houseForm.controls['name'].setValue(this.house.name);
    this.houseForm.controls['address'].setValue(this.house.address);
    this.houseForm.controls['phones'].setValue(this.house.phones);
    this.houseForm.controls['rooms'].setValue(this.house.rooms);
    this.houseForm.controls['description'].setValue(this.house.description);
    this.houseForm.controls['latitude'].setValue(this.house.latitude);
    this.houseForm.controls['longitude'].setValue(this.house.longitude);
    this.houseForm.controls['metaKeywords'].setValue(this.house.metaKeywords);
    this.houseForm.controls['municipality'].setValue(this.house.municipality ? this.house.municipality.id : '');
    this.houseForm.controls['accommodation'].setValue(this.house.accommodation ? this.house.accommodation.id : '');

    /* set man-to-many relationship values */
    this.houseForm.controls['homestayFreeservices'].setValue(
      this.house.homestayFreeservices.map((homestayFreeservice: FreeService) => {
        return homestayFreeservice.id;
      })
    );
    this.houseForm.controls['homestayNotOffered'].setValue(
      this.house.homestayNotOffered.map((homestayNotOfferedService: NotOffered) => {
        return homestayNotOfferedService.id;
      })
    );
    this.houseForm.controls['homestayExtracosts'].setValue(
      this.house.homestayExtracosts.map((homestayExtracost: ExtraCostService) => {
        return homestayExtracost.id;
      })
    );
    this.houseForm.controls['places'].setValue(
      this.house.places.map((place: Place) => {
        return place.id;
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
      this.houseForm.controls['ownerId'].setValue(this.authService.currentUser().id);

      /* send the many-to-many relationship values as arrays of objects */
      const homestayFreeservices = this.houseForm.controls['homestayFreeservices'].value.map(
        (homestayFreeserviceId) => {
          return { id: homestayFreeserviceId };
        });
      this.houseForm.controls['homestayFreeservices'].setValue(homestayFreeservices);

      const homestayNotOffered = this.houseForm.controls['homestayNotOffered'].value.map(
        (homestayNotOfferedId) => {
          return { id: homestayNotOfferedId };
        });
      this.houseForm.controls['homestayNotOffered'].setValue(homestayNotOffered);

      const homestayExtracosts = this.houseForm.controls['homestayExtracosts'].value.map(
        (homestayExtracostId) => {
          return { id: homestayExtracostId };
        });
      this.houseForm.controls['homestayExtracosts'].setValue(homestayExtracosts);

      const places = this.houseForm.controls['places'].value.map(
        (placeId) => {
          return { id: placeId };
        });
      this.houseForm.controls['places'].setValue(places);

      /* if there was not a house id set */
      if (!this.houseId) {

        /* tweak the form data so the id field don't travel to the server */
        this.houseForm.removeControl('id');

        /* enable disabled field so the values are passed alongside the rest*/
        this.houseForm.controls['owner'].enable();
        this.houseForm.controls['email'].enable();

        /* call the service action to create a new house object */
        this.houseService.create(this.houseForm.value).subscribe(() => {

          /* if the operation was successful, alert the user about it */
          this.alert.type = 'success';
          this.alert.msg = 'House created successfully';
          this.alert.show = true;
          this.houseForm.controls['owner'].setValue(this.owner.name);
          this.houseForm.addControl('id', new FormControl(''));
          this.houseForm.controls['owner'].disable();
          this.houseForm.controls['email'].disable();
        }, error => {

          /* if the operation was unsuccessful, alert the user about it */
          this.houseForm.controls['owner'].setValue(this.owner.name);
          this.houseForm.addControl('id', new FormControl(''));
          this.houseForm.controls['owner'].disable();
          this.houseForm.controls['email'].disable();
          this.alert.type = 'danger';
          this.alert.msg = error;
          this.alert.show = true;
        });
      } else {

        /* call the service action to update the current house object on the server */
        this.houseService.update(this.houseForm.value).subscribe((result) => {

          /* if the operation was successful, alert the user about it */
          this.alert.type = 'success';
          this.alert.msg = 'House updated successfully';
          this.alert.show = true;

          /* reset the many-to-many relationships */
          this.houseForm.controls['homestayFreeservices'].setValue((result[0] as House).homestayFreeservices
            .map((freeService) => {
              return freeService.id;
            }));

          this.houseForm.controls['homestayNotOffered'].setValue((result[0] as House).homestayNotOffered
            .map((notOfferedService) => {
              return notOfferedService.id;
            }));

          this.houseForm.controls['homestayExtracosts'].setValue((result[0] as House).homestayExtracosts
            .map((extraCostService) => {
              return extraCostService.id;
            }));

          this.houseForm.controls['places'].setValue((result[0] as House).places
            .map((place) => {
              return place.id;
            }));

        }, error => {

          /* if the operation was unsuccessful, alert the user about it */
          this.houseForm.controls['owner'].setValue(this.owner.name);
          this.alert.type = 'danger';
          this.alert.msg = error;
          this.alert.show = true;
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
}
