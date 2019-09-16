import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CookieService } from 'ngx-cookie-service';

import { ManagerComponent } from './manager.component';
import { AuthService } from '../../services/auth.service';

describe('ManagerComponent', () => {
  let component: ManagerComponent;
  let fixture: ComponentFixture<ManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerComponent],
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
    fixture = TestBed.createComponent(ManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
