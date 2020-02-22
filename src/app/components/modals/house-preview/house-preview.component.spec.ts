import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePreviewComponent } from './house-preview.component';

describe('HousePreviewComponent', () => {
  let component: HousePreviewComponent;
  let fixture: ComponentFixture<HousePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
