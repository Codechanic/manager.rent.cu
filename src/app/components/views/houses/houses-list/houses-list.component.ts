import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { BsDropdownConfig } from "ngx-bootstrap";
import { Observable } from "rxjs";
import { AgGridAngular } from "ag-grid-angular";

import { AuthService } from "../../../../services/auth.service";
import { HouseService } from "../../../../services/house.service";
import { House } from "../../../../model/house.model";
import { AppCommonConstants } from "../../../../constants/common";
import { IDatasource, IGetRowsParams } from "ag-grid-community";

@Component({
  selector: "app-houses-list",
  templateUrl: "./houses-list.component.html",
  styleUrls: ["./houses-list.component.scss"],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class HousesListComponent implements OnInit {

  /**
   * Ag Grid's column definitions
   */
  columnDefs = [
    {
      headerName: "Name",
      field: "name",
      checkboxSelection: true,
      headerClass: "header-class",
      cellClass: ["cell-class"]
    },
    {
      headerName: "Address",
      field: "address",
      headerClass: "header-class",
      flex: 1,
      resizable: true,
      cellClass: ["cell-class"]
    },
    {
      headerName: "Phones",
      field: "phones",
      headerClass: "header-class",
      resizable: true,
      cellClass: ["cell-class"]
    },
    {
      headerName: "Rooms",
      field: "rooms",
      headerClass: "header-class",
      width: 70,
      cellClass: ["cell-class", "room-cell-class"]
    }
  ];

  @ViewChild("agGridAngular", { static: false }) agGridAngular: AgGridAngular;

  /**
   * Instance reference to the delete modal component
   */
  @ViewChild("deleteComponent", { static: false }) deleteComponent;

  /**
   * List of houses
   */
  housesObservable: Observable<House[]>;

  /**
   * Selected Ag Grid rows
   */
  selectedRows: any[] = [];

  /**
   * Calculated height of the card containing the list
   */
  cardHeight: any;

  /**
   * Ag-Grid datasource
   */
  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {

      // Use startRow and endRow for sending pagination to Backend
      // params.startRow : Start Page
      // params.endRow : End Page

      const apiService = this.authService.currentUser().role === AppCommonConstants.ROLES.ROLE_ADMIN
        ? this.houseService.findAll(params.startRow - params.endRow, params.)
        : this.houseService.findById(this.authService.currentUser().id);

      //replace this.apiService with your Backend Call that returns an Observable
      apiService.().subscribe(response => {

        params.successCallback(
          response.data, response.totalRecords
        );

      });
    }
  };

  /**
   * Listener to DOM event window:resize
   * @param event DOM event
   */
  @HostListener("window:resize", ["$event"]) onWindowResize(event) {
    this.setCardHeight();
  }

  /**
   * Component constructor
   * @param houseService House handling service
   * @param authService Authentication service
   * @param router: Angular router
   */
  constructor(private houseService: HouseService, private authService: AuthService, private router: Router) {
  }

  /**
   * Lifecycle hook to component's initialization
   */
  ngOnInit() {

    /* initialize component's data */
    this.initializeData();

    this.setCardHeight();

  }

  onGridReady(params: any) {
    params.api.setDatasource(this.dataSource);
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

  /**
   * Callback to execute on delete button click
   */
  onDelete() {

    /* prompt the user for confirmation on the deletion operation */
    this.deleteComponent.dangerModal.show();
    this.deleteComponent.actionConfirmed.subscribe((result) => {

      /* if the user confirmed the operation */
      if (result === true) {

        this.selectedRows.forEach((row) => {

          /* call service action to delete the house */
          this.houseService.delete(row.id).subscribe((response) => {

            /* if the deletion operation was successful, reinitialize component's data */
            this.initializeData();
          }, error => console.log(error));
        });
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
    if (this.authService.currentUser().role !== AppCommonConstants.ROLES.ROLE_ADMIN) {
      this.housesObservable = this.houseService.findByOwnerId(this.authService.currentUser().id);
    } else {
      this.housesObservable = this.houseService.findAll();
    }
  }

  /**
   * Call back to execute on Ag Grid row selection
   */
  onRowSelected() {
    this.selectedRows = this.agGridAngular.api.getSelectedRows();
  }

  /**
   * Callback to execute on edit button click
   */
  onEdit() {
    this.router.navigate(["houses/edit/" + this.selectedRows[0].id]);
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
    this.router.navigate(["houses/list/comments/" + this.selectedRows[0].id]);
  }
}
