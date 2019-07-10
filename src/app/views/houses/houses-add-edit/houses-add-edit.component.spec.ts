import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesAddEditComponent } from './houses-add-edit.component';

describe('HousesAddEditComponent', () => {
  let component: HousesAddEditComponent;
  let fixture: ComponentFixture<HousesAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousesAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
