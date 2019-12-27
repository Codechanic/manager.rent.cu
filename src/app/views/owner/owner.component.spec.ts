import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CookieService } from 'ngx-cookie-service';

import { OwnerComponent } from './owner.component';
import { AuthService } from '../../services/auth.service';

describe('ManagerComponent', () => {
  let component: OwnerComponent;
  let fixture: ComponentFixture<OwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerComponent],
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
    fixture = TestBed.createComponent(OwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
