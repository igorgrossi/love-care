import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituicaoPage } from './instituicao.page';

describe('InstituicaoPage', () => {
  let component: InstituicaoPage;
  let fixture: ComponentFixture<InstituicaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituicaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituicaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
