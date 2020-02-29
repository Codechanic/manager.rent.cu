import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CookieService } from 'ngx-cookie-service';

import { OwnerCardComponent } from './owner-card.component';
import { AuthService } from '../../services/auth.service';

describe('ManagerComponent', () => {
  let component: OwnerCardComponent;
  let fixture: ComponentFixture<OwnerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerCardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        CookieService,
        {
          provide: AuthService,
          useValue: {currentUser: jest.fn().mockReturnValue({managerId: 1})}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
