import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HouseService } from '../../../services/house.service';
import { House } from '../../../model/house.model';
import { AuthService } from '../../../services/auth.service';
import { ManagerService } from '../../../services/manager.service';
import { Manager } from '../../../model/manager.model';

@Component({
  selector: 'app-houses-add-edit',
  templateUrl: './houses-add-edit.component.html',
  styleUrls: ['./houses-add-edit.component.scss'],
})
export class HousesAddEditComponent implements OnInit {

  /**
   * Form group to collect and validate House data
   */
  houseForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl(''),
    phones: new FormControl(''),
    rooms: new FormControl(''),
    manager: new FormControl(''),
    description: new FormControl(''),
  });

  /**
   * House id populated from route params
   */
  houseId: undefined;

  /**
   * House Mmanager
   */
  manager: Manager;

  /**
   * Object to handle alerts
   */
  alert = { type: '', msg: '', show: false };

  /**
   * Component constructor
   * @param houseService House handling service
   * @param managerService Manager handling service
   * @param activatedRoute Activated route
   * @param authService Authentication service
   */
  constructor(
    private houseService: HouseService,
    private managerService: ManagerService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) {
  }

  ngOnInit() {

    /* get the manager object from the server using the manager´s id associated to the authenticated user */
    this.managerService.findById(this.authService.currentUser().managerId).subscribe((manager) => {
      this.manager = manager;
      this.houseForm.controls['manager'].setValue(manager.name + ' ' + manager.lastName);
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
        this.populateForm(house);
      });
    }
  }

  /**
   * Populates the house form from a House object
   * @param house House object to populate the form from
   */
  populateForm(house: House) {
    this.houseForm.controls['id'].setValue(house.id);
    this.houseForm.controls['name'].setValue(house.name);
    this.houseForm.controls['address'].setValue(house.address);
    this.houseForm.controls['phones'].setValue(house.phones);
    this.houseForm.controls['rooms'].setValue(house.rooms);
    this.houseForm.controls['description'].setValue(house.description);
  }

  /**
   * Function called on submitting the form
   */
  onSubmit() {

    /* the house form data is valid */
    if (this.houseForm.valid) {

      /* tweak it to send the manager's id alongside house data */
      this.houseForm.controls['manager'].setValue(this.authService.currentUser().managerId);

      /* if there was not a house id set */
      if (!this.houseId) {

        /* tweak the form data so the id field don´t travel to the server */
        this.houseForm.removeControl('id');

        /* call the service action to create a new house object */
        this.houseService.create(this.houseForm.value).subscribe((result) => {

          /* if the operation was successful, alert the user about it */
          this.alert.type = 'success';
          this.alert.msg = 'House created successfully';
          this.alert.show = true;
          this.houseForm.controls['manager'].setValue(this.manager.name + ' ' + this.manager.lastName);
          this.houseForm.addControl('id', new FormControl(''));
        }, error => {

          /* if the operation was unsuccessful, alert the user about it */
          this.houseForm.controls['manager'].setValue(this.manager.name + ' ' + this.manager.lastName);
          this.houseForm.addControl('id', new FormControl(''));
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
        }, error => {

          /* if the operation was unsuccessful, alert the user about it */
          this.houseForm.controls['manager'].setValue(this.manager.name + ' ' + this.manager.lastName);
          this.alert.type = 'danger';
          this.alert.msg = error;
          this.alert.show = true;
        });
      }
    }
  }
}
