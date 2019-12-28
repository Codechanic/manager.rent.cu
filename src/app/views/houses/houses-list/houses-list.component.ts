import { Component, OnInit, ViewChild } from '@angular/core';

import { BsDropdownConfig } from "ngx-bootstrap";

import { AuthService } from '../../../services/auth.service';
import { HouseService } from '../../../services/house.service';
import { House } from '../../../model/house.model';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HousesListComponent implements OnInit {

  /**
   * Instance reference to the delete modal component
   */
  @ViewChild('deleteComponent', { static: false }) deleteComponent;

  /**
   * List of houses
   */
  houses: House[];

  /**
   * Current page in display
   */
  page = 1;

  /**
   * Component constructor
   * @param houseService House handling service
   * @param authService Authentication service
   */
  constructor(private houseService: HouseService, private authService: AuthService) {
  }

  /**
   * Lifecycle hook to component's initialization
   */
  ngOnInit() {

    /* initialize component's data */
    this.initializeData();
  }

  /**
   * Function called on deleting a house
   * @param id House id
   */
  onDelete(id: string) {

    /* prompt the user for confirmation on the deletion operation */
    this.deleteComponent.dangerModal.show();
    this.deleteComponent.actionConfirmed.subscribe((result) => {

      /* if the user confirmed the operation */
      if (result === true) {

        /* call service action to delete the house */
        this.houseService.delete(id).subscribe((response) => {

          /* if the deletion operation was successful, reinitialize component's data */
          this.initializeData();
        }, error => console.log(error));
      }
    });
  }

  /**
   * Initialize component's data
   */
  initializeData() {

    /*
    * call service action to retrieve from the serve the house
    * list filtered by the currently authenticated owner-card
    */
    this.houseService.findByOwnerId(this.authService.currentUser().id).subscribe((houses) => {
      this.houses = houses;
    }, (error) => {
      console.log(error);
    });
  }
}
