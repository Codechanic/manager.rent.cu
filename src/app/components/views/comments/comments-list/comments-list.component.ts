import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommentService} from '../../../../services/comment.service';
import {Comment} from '../../../../model/comment.model';
import {AppCommonConstants} from '../../../../constants/common';
import {Page} from '../../../../model/page';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  /**
   * Currently authenticates user
   */
  currentUser: any;

  /**
   * Available user roles
   */
  roles = AppCommonConstants.ROLES;

  /**
   * NgxDatatable rows
   */
  rows = new Array<Comment>();

  /**
   * NgxDatatable page
   */
  page = new Page();

  /**
   * NgxDatatable column's definitions
   */
  columns: any[] = [
    {
      name: 'Name',
      prop: 'name',
      resizeable: true
    },
    {
      name: 'Nick',
      prop: 'nick',
      resizeable: true
    },
    {
      name: 'Text',
      prop: 'text',
      resizeable: true
    },
    {
      name: 'Rating',
      prop: 'rating',
      resizeable: true
    },
    {
      name: 'Enabled',
      prop: 'enabled',
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
   * Id of the house
   */
  houseId: string;

  /**
   * Instance reference to the delete modal component
   */
  @ViewChild('deleteComponent', {static: false}) deleteComponent;

  /**
   * Selected Ag Grid rows
   */
  selected: any[] = [];

  /**
   * Object to handle alerts
   */
  alert = {type: '', msg: '', show: false};

  /**
   * Calculated height of the card containing the list
   */
  cardHeight: any;

  /**
   * Sorting values for the houses list
   */
  sort = { field: 'name', direction: 'ASC' };

  /**
   * Whether or not the table should show a loading indicator
   */
  loading = false;

  /**
   * Listener to DOM event window:resize
   * @param event DOM event
   */
  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    this.adjustElementsHeights();
  }

  /**
   * Component's constructor
   */
  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.page.pageNumber = 0;
    this.page.size = 5;
    this.currentUser = this.authService.currentUser();
  }

  /**
   * Component's initialization lifecycle hook
   */
  ngOnInit() {
    /* get the house's id from the activated route */
    this.houseId = this.activatedRoute.snapshot.params['id'];

    // Set the current page
    this.setPage({offset: 0});

    this.adjustElementsHeights();

  }

  /**
   * Set the height of the list containing card dynamically
   */
  adjustElementsHeights() {

    const baseHeight = (
      document.getElementsByClassName('nav')[2].clientHeight -
      50 -
      AppCommonConstants.LIST_CONTAINING_CARD_PADDING
    );

    this.cardHeight = baseHeight + 'px';

    this.page.size = Math.abs(Math.trunc(baseHeight / 50) - 4);

    this.setPage({offset: 0});

  }

  /**
   * Call back to execute on edit button click
   */
  onEdit() {
    this.router.navigate(['../edit/' + this.selected[0].id], {relativeTo: this.activatedRoute});
  }

  /**
   * Call back to execute on approve button click
   */
  onApprove() {
    const approvedComment = this.selected[0] as Comment;
    approvedComment.enabled = true;
    this.commentService.update(approvedComment).subscribe(() => {
      this.alert.msg = 'Comment approved successfully';
      this.alert.type = 'success';
      this.alert.show = true;
      this.rows.find((row) => {
        return row.id === approvedComment.id;
      }).enabled = true;
    });
  }

  /**
   * Call back to execute on delete button click
   */
  onDelete() {

  }

  /**
   * Populate the table with new data based on the page number
   * @param pageInfo The page to select
   */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.commentService.findByHouse(this.page, this.houseId, this.sort)
      .subscribe((response: { data: Comment[], count: number }) => {
      this.page.totalElements = response.count;
      this.rows = response.data;
    });
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
   * Callback on list sort
   */
  onSort($event: any) {
    this.sort.field = $event.sorts[0].prop;
    this.sort.direction = $event.sorts[0].dir.toUpperCase();

    this.setPage({offset: 0});
  }

  /**
   * Callback on list view checkbox to make it readonly
   * @param $event Event data thrown by checkbox onClick event
   */
  checkboxClicked($event: { target: { checked: boolean } }) {
    $event.target.checked = !$event.target.checked;
  }

  /**
   * Function that determines whether or not the Enabled button should be enabled
   */
  shouldAllowApprove() {
    return !this.selected.find(comment => comment.enabled);
  }
}
