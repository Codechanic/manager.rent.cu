import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsAddEditComponent } from './comments-add-edit.component';

describe('CommentsAddEditComponent', () => {
  let component: CommentsAddEditComponent;
  let fixture: ComponentFixture<CommentsAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
