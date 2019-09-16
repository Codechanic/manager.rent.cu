import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../services/auth.service';
import { Manager } from '../../model/manager.model';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {

  /**
   * Object that holds Manager data
   */
  manager: Manager;

  /**
   * Component's constructor
   * @param managerService Manager handling service
   * @param authService Authentication service
   */
  constructor(private managerService: ManagerService, private authService: AuthService) {
  }

  /**
   * Lifecycle hook to component's initialization
   */
  ngOnInit() {

    /* call service action to retrieve a manager by its id */
    this.managerService.findById(this.authService.currentUser().managerId).subscribe((manager: Manager) => {
      this.manager = manager;
    }, (error) => {
      console.log(error);
    });
  }

}
