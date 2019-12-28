import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CommentService } from "../../../services/comment.service";
import {Comment} from "../../../model/comment.model";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  /**
   * Object holding the comments
   */
  comments: Comment[];

  /**
   * Current page in display
   */
  page = 1;

  /**
   * Instance reference to the delete modal component
   */
  @ViewChild('deleteComponent', { static: false }) deleteComponent;

  /**
   * Component's constructor
   */
  constructor(private commentService: CommentService, private activatedRoute: ActivatedRoute) { }

  /**
   * Component's initialization lifecycle hook
   */
  ngOnInit() {
    /* get the house's id from the activated route */
    const houseId = this.activatedRoute.snapshot.params["id"];

    /*
     * if there is a house id, it means that the component has been instantiated to edit a house,
     * otherwise, it's being used to create a new house
     */
    if (houseId) {

      /* get the house object from the server and populate the form with its data */
      this.commentService.findByHouse(houseId).subscribe((comments) => {
        this.comments = comments;
      });
    }
  }

}
