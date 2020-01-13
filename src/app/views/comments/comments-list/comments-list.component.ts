import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { CommentService } from "../../../services/comment.service";
import { Comment } from "../../../model/comment.model";
import { AgGridAngular } from "ag-grid-angular";
import { Observable } from "rxjs";
import { AppCommonConstants } from "../../../constants/common";

@Component({
  selector: "app-comments-list",
  templateUrl: "./comments-list.component.html",
  styleUrls: ["./comments-list.component.scss"]
})
export class CommentsListComponent implements OnInit {

  /**
   * Id of the house
   */
  houseId: string;

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
      headerName: "Nick",
      field: "nick",
      headerClass: "header-class",
      resizable: true,
      width: 70,
      cellClass: ["cell-class"]
    },
    {
      headerName: "Email",
      field: "email",
      headerClass: "header-class",
      resizable: true,
      cellClass: ["cell-class"]
    },
    {
      headerName: "Text",
      field: "text",
      headerClass: "header-class",
      resizable: true,
      flex: 1,
      cellClass: ["cell-class"]
    },
    {
      headerName: "Approved",
      field: "enabled",
      headerClass: "header-class",
      width: 100,
      cellClass: ["cell-class", "approved-cell-class"]
    },
    {
      headerName: "Rating",
      field: "rating",
      headerClass: ["header-class", "rating-header-class"],
      width: 70,
      type: "numericColumn",
      cellClass: ["cell-class", "rating-cell-class"]
    }
  ];

  /**
   * Ag Grid reference
   */
  @ViewChild("agGridAngular", { static: false }) agGridAngular: AgGridAngular;

  /**
   * Object holding the comments
   */
  commentsObservable: Observable<Comment[]>;

  /**
   * Instance reference to the delete modal component
   */
  @ViewChild("deleteComponent", { static: false }) deleteComponent;

  /**
   * Selected Ag Grid rows
   */
  selectedRows: any[] = [];

  /**
   * Object to handle alerts
   */
  alert = { type: "", msg: "", show: false };

  /**
   * Calculated height of the card containing the list
   */
  cardHeight: any;

  /**
   * Listener to DOM event window:resize
   * @param event DOM event
   */
  @HostListener("window:resize", ["$event"]) onWindowResize(event) {
    this.setCardHeight();
  }

  /**
   * Component's constructor
   */
  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  /**
   * Component's initialization lifecycle hook
   */
  ngOnInit() {
    /* get the house's id from the activated route */
    this.houseId = this.activatedRoute.snapshot.params["id"];

    /*
     * if there is a house id, it means that the component has been instantiated to edit a house,
     * otherwise, it's being used to create a new house
     */
    if (this.houseId) {

      /* get the house object from the server and populate the form with its data */
      this.commentsObservable = this.commentService.findByHouse(this.houseId);
    }

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
   * Call back to execute on Ag Grid row selection
   */
  onRowSelected() {
    this.selectedRows = this.agGridAngular.api.getSelectedRows();
  }

  /**
   * Call back to execute on edit button click
   */
  onEdit() {
    this.router.navigate(["../edit/" + this.selectedRows[0].id], { relativeTo: this.activatedRoute });
  }

  /**
   * Call back to execute on approve button click
   */
  onApprove() {
    console.log(this.agGridAngular.api.getSelectedRows(), this.agGridAngular.api.getModel());
    const approvedComment = this.selectedRows[0] as Comment;
    approvedComment.enabled = true;
    this.commentService.update(approvedComment).subscribe(() => {
      this.alert.msg = "Comment approved successfully";
      this.alert.type = "success";
      this.alert.show = true;
      this.agGridAngular.api.getSelectedNodes().forEach((node) => {
        node.data.enabled = true;
        node.updateData(node.data);
      });
    });
  }

  /**
   * Call back to execute on delete button click
   */
  onDelete() {

  }
}
