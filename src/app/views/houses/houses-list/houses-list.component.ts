import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss']
})
export class HousesListComponent implements OnInit {
  isFiltersCardCollapsed = true;

  constructor() {
  }

  ngOnInit() {
  }

}
