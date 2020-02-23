import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Observable } from "rxjs";

import { Comment } from "../../../../model/comment.model";
import { CommentService } from "../../../../services/comment.service";
import { AppCommonConstants } from "../../../../constants/common";
import { ConfirmComponent } from "../../../modals/confirm/confirm.component";
import { CanExit } from "../../../../guards/can-exit.guard";

@Component({
  selector: "app-comments-add-edit",
  templateUrl: "./comments-add-edit.component.html",
  styleUrls: ["./comments-add-edit.component.scss"]
})
export class CommentsAddEditComponent implements OnInit, CanExit {

  /**
   * Object to handle alerts
   */
  alert = { type: "", msg: "", show: false };

  /**
   * Form group to collect and validate Comment data
   */
  commentForm = new FormGroup({
    id: new FormControl(""),
    name: new FormControl("", Validators.required),
    nick: new FormControl(""),
    email: new FormControl("", Validators.required),
    text: new FormControl("", Validators.required)
  });

  /**
   * Id of the comment
   */
  commentId: string;

  /**
   * Id of the house
   */
  houseId: any;

  /**
   * Dynamic form containing card height
   */
  cardHeight: string;

  /**
   * Reference to the ngx-bootstrap confirm modal
   */
  confirmModalRef: BsModalRef;

  constructor(
    private commentService: CommentService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {

    /* get the comment's id from the activated route */
    this.commentId = this.activatedRoute.snapshot.params["id"];

    /*
     * if there is a comment id, it means that the component has been instantiated to edit a comment,
     * otherwise, it's being used to create a new comment
     */
    if (this.commentId) {

      /* get the comment object from the server and populate the form with its data */
      this.commentService.findById(this.commentId).subscribe((comment: Comment) => {
        console.log(comment);
        this.houseId = comment.homestay.id;
        this.populateForm(comment);
      });
    }

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
   * Populates the comment form using a House object
   * @param comment Comment object to populate the form from
   */
  populateForm(comment: Comment) {
    this.commentForm.controls["id"].setValue(comment.id);
    this.commentForm.controls["name"].setValue(comment.name);
    this.commentForm.controls["nick"].setValue(comment.nick);
    this.commentForm.controls["email"].setValue(comment.email);
    this.commentForm.controls["text"].setValue(comment.text);
  }

  onSubmit() {

    if (this.commentForm.valid) {
      this.commentService.update(this.commentForm.value).subscribe((result) => {
        /* if the operation was successful, alert the user about it */
        this.alert.type = "success";
        this.alert.msg = "Comment edited successfully";
        this.alert.show = true;
      }, error => {
        this.alert.type = "danger";
        this.alert.msg = error;
        this.alert.show = true;
      });
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.commentForm.touched && this.commentForm.dirty) {
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
