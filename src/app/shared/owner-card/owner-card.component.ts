import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { AuthService } from '../../services/auth.service';
import { Owner } from '../../model/owner.model';

@Component({
  selector: 'app-owner-card',
  templateUrl: './owner-card.component.html',
  styleUrls: ['./owner-card.component.scss'],
})
export class OwnerCardComponent implements OnInit {

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

    /* call service action to retrieve a owner-card by its id */
    this.ownerService.findById(this.authService.currentUser().id).subscribe((owner: Owner) => {
      this.owner = owner;
    }, (error) => {
      console.log(error);
    });
  }

}
