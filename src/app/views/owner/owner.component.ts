import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { AuthService } from '../../services/auth.service';
import { Owner } from '../../model/owner.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {

  /**
   * Object that holds Owner data
   */
  owner: Owner;

  /**
   * Component's constructor
   * @param ownerService Owner handling service
   * @param authService Authentication service
   */
  constructor(private ownerService: OwnerService, private authService: AuthService) {
  }

  /**
   * Lifecycle hook to component's initialization
   */
  ngOnInit() {

    /* call service action to retrieve a owner by its id */
    this.ownerService.findById(this.authService.currentUser().id).subscribe((owner: Owner) => {
      this.owner = owner;
    }, (error) => {
      console.log(error);
    });
  }

}
