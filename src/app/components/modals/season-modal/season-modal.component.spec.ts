import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonModalComponent } from './season-modal.component';

describe('SeasonModalComponent', () => {
  let component: SeasonModalComponent;
  let fixture: ComponentFixture<SeasonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
