import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { AlertModule } from 'ngx-bootstrap';

import { HousesAddEditComponent } from './houses-add-edit.component';
import { AuthService } from '../../../services/auth.service';

describe('HousesAddEditComponent', () => {
  let component: HousesAddEditComponent;
  let fixture: ComponentFixture<HousesAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HousesAddEditComponent],
      imports: [AlertModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        CookieService,
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {id: 1}}}
        },
        {
          provide: AuthService,
          useValue: {currentUser: jest.fn().mockReturnValue({managerId: 1})}
        }
      ]
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
