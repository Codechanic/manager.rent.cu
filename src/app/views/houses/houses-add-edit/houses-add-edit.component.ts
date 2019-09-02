import { Component, OnInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-houses-add-edit',
  templateUrl: './houses-add-edit.component.html',
  styleUrls: ['./houses-add-edit.component.scss']
})
export class HousesAddEditComponent implements OnInit {

  constructor(private ngSelectConfig: NgSelectConfig) {
    this.ngSelectConfig.notFoundText = 'Oops! Nothing here...';
  }

  ngOnInit() {
  }

}
