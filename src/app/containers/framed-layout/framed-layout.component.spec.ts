import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FramedLayoutComponent } from './framed-layout.component';

describe('FramedLayoutComponent', () => {
  let component: FramedLayoutComponent;
  let fixture: ComponentFixture<FramedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FramedLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
