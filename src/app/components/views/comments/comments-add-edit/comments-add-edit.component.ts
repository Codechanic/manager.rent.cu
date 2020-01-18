import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Comment } from "../../../../model/comment.model";
import { CommentService } from "../../../../services/comment.service";
import { AppCommonConstants } from "../../../../constants/common";

@Component({
  selector: 'app-comments-add-edit',
  templateUrl: './comments-add-edit.component.html',
  styleUrls: ['./comments-add-edit.component.scss']
})
export class CommentsAddEditComponent implements OnInit {

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
    text: new FormControl("", Validators.required),
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
  private cardHeight: string;

  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute) { }

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

    if(this.commentForm.valid){
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
}
