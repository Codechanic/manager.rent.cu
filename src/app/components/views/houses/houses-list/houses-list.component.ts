import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { BsDropdownConfig } from "ngx-bootstrap";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { forkJoin, Observable } from "rxjs";

import { HouseService } from "../../../../services/house.service";
import { AuthService } from "../../../../services/auth.service";
import { AppCommonConstants } from "../../../../constants/common";
import { House } from "../../../../model/house.model";
import { Page } from "../../../../model/page";

@Component({
  selector: "app-houses-list",
  templateUrl: "./houses-list.component.html",
  styleUrls: ["./houses-list.component.scss"],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HousesListComponent implements OnInit {

  /**
   * Currently authenticated user
   */
  currentUser: any;

  /**
   * Available user roles
   */
  roles = AppCommonConstants.ROLES;

  /**
   * NgxDatatable rows
   */
  rows = new Array<House>();

  /**
   * NgxDatatable page
   */
  page = new Page();

  /**
   * NgxDatatable column's definitions
   */
  columns: any[] = [
    {
      name: "Name",
      prop: "name",
      resizeable: true
    },
    {
      name: "Address",
      prop: "address",
      resizeable: true
    },
    {
      name: "Phones",
      prop: "phones",
      resizeable: true
    },
    {
      name: "Rooms",
      prop: "rooms",
      resizeable: true
    },
    {
      name: "Enabled",
      prop: "enabled",
      resizeable: true
    }
  ];

  /**
   * NgxDatatable column modes
   */
  ColumnMode = ColumnMode;

  /**
   * NgxDatatable selection types
   */
  SelectionType = SelectionType;

  /**
   * Instance reference to the delete modal component
   */
  @ViewChild("deleteComponent", { static: false }) deleteComponent;

  /**
   * Selected rows
   */
  selected = [];

  /**
   * Calculated height of the card containing the list
   */
  cardHeight: any;

  /**
   * Sorting values for the houses list
   */
  sort = { field: "name", direction: "ASC" };

  /**
   * Whether or not the table should show a loading indicator
   */
  loading = false;

  /**
   * Object to handle alerts
   */
  alert = { type: "", msg: "", show: false };

  /**
   * Listener to DOM event window:resize
   * @param event DOM event
   */
  @HostListener("window:resize", ["$event"]) onWindowResize(event) {
    this.adjustElementsHeights();
  }

  /**
   * Component constructor
   * @param houseService House handling service
   * @param authService Authentication service
   * @param router: Angular router
   */
  constructor(
    private houseService: HouseService,
    private authService: AuthService,
    private router: Router
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
    this.currentUser = this.authService.currentUser();
  }

  /**
   * Lifecycle hook to component's initialization
   */
  ngOnInit() {

    // Set the current page
    this.setPage({ offset: 0 });

    // Adjust the elements height base on viewport's height
    this.adjustElementsHeights();

  }

  /**
   * Populate the table with new data based on the page number
   * @param pageInfo The page to select
   */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.loading = true;
    this.getServerData(this.page, this.sort).subscribe((response: { data: House[], count: number }) => {
      this.page.totalElements = response.count;
      this.rows = response.data;
      this.loading = false;
    });
  }

  /**
   * Set the height of the list containing card dynamically
   */
  adjustElementsHeights() {

    const baseHeight = (
      document.getElementsByClassName("nav")[2].clientHeight -
      50 -
      AppCommonConstants.LIST_CONTAINING_CARD_PADDING
    );

    this.cardHeight = baseHeight + "px";

    this.page.size = Math.abs(Math.trunc(baseHeight / 50) - 4);

    this.setPage({ offset: 0 });

  }

  /**
   * Callback to execute on delete button click
   */
  onDelete() {

    /* prompt the user for confirmation on the deletion operation */
    this.deleteComponent.dangerModal.show();
    this.deleteComponent.actionConfirmed.subscribe((result) => {

      /* if the user confirmed the operation */
      if (result === true) {


        // create an array of observables and fill it with the calls to the server for the enabling of each of the selected houses
        const observablesArray: Observable<any>[] = [];
        for (const selectedHouse of this.selected) {
          selectedHouse.enabled = true;
          observablesArray.push(this.houseService.delete(selectedHouse.id));
        }

        // subscribe to all observables and reply back to the UI only when all of them complete
        forkJoin(observablesArray).subscribe(() => {
            this.setPage({ offset: this.page.pageNumber });
            this.alert.type = "success";
            this.alert.msg = "House(s) successfully deleted";
            this.alert.show = true;
          },
          (error => console.log(error)));
      }
    });
  }

  /**
   * Callback to execute on edit button click
   */
  onEdit() {
    this.router.navigate(["houses/edit/" + this.selected[0].id]);
  }

  /**
   * Callback to execute on new button click
   */
  onNew() {
    this.router.navigate(["houses/new/"]);
  }

  /**
   * Callback to execute on view comments button click
   */
  onViewComments() {
    this.router.navigate(["houses/list/comments/" + this.selected[0].id]);
  }

  /**
   * Callback on selecting rows
   * @param $event Object containing the selected rows
   */
  onSelect($event: any) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...$event.selected);
  }

  /**
   * Function to execute the remote api observable based on the current user's role
   * @param page
   * @param sort
   */
  getServerData(page: Page, sort: { field: string, direction: string }) {
    if (this.currentUser.role === AppCommonConstants.ROLES.ROLE_ADMIN) {
      return this.houseService.findAll(page, sort);
    }
    return this.houseService.findByOwner(this.currentUser.id, page, sort);
  }

  /**
   * Callback on list sort
   */
  onSort($event: any) {
    this.sort.field = $event.sorts[0].prop;
    this.sort.direction = $event.sorts[0].dir.toUpperCase();

    this.setPage({ offset: 0 });
  }

  /**
   * Function that determines whether or not the Enabled button should be enabled
   */
  shouldEnable() {
    return !this.selected.find(house => house.enabled);
  }

  /**
   * Callback on enabling houses
   */
  onEnable() {
    // create an array of observables and fill it with the calls to the server for the enabling of each of the selected houses
    const observablesArray: Observable<any>[] = [];
    for (const selectedHouse of this.selected) {
      selectedHouse.enabled = true;
      observablesArray.push(this.houseService.enable(selectedHouse));
    }

    // subscribe to all observables and reply back to the UI only when all of them complete
    forkJoin(observablesArray).subscribe(() => {
        this.setPage({ offset: this.page.pageNumber });
        this.alert.type = "success";
        this.alert.msg = "House(s) successfully enabled";
        this.alert.show = true;
      },
      (error => console.log(error)));
  }

  /**
   * Callback on list view checkbox to make it readonly
   * @param $event Event data thrown by checkbox onClick event
   */
  checkboxClicked($event: { target: { checked: boolean } }) {
    $event.target.checked = !$event.target.checked;
  }
}
