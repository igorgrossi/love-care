import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingLoginPage } from './loading-login.page';

describe('LoadingLoginPage', () => {
  let component: LoadingLoginPage;
  let fixture: ComponentFixture<LoadingLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
