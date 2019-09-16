import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

import { FramedLayoutComponent } from './framed-layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('FramedLayoutComponent', () => {
  let component: FramedLayoutComponent;
  let fixture: ComponentFixture<FramedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FramedLayoutComponent],
      imports: [HttpClientTestingModule],
      providers: [CookieService, {provide: Router, useValue: {}}],
      schemas: [NO_ERRORS_SCHEMA]
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
