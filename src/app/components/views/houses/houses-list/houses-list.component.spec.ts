import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPaginationModule } from 'ngx-pagination';
import { CookieService } from 'ngx-cookie-service';

import { HousesListComponent } from './houses-list.component';
import { AuthService } from '../../../../services/auth.service';

describe('HousesListComponent', () => {
  let component: HousesListComponent;
  let fixture: ComponentFixture<HousesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HousesListComponent],
      imports: [
        NgxPaginationModule,
        HttpClientTestingModule
      ],
      providers: [CookieService,
        {
          provide: AuthService,
          useValue: {currentUser: jest.fn().mockReturnValue({managerId: 1})}
        }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
