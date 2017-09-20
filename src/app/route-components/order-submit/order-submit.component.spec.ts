/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {OrderSubmitRouteComponent} from './order-submit.component';

describe('OrderSubmitRouteComponent', () => {
  let component: OrderSubmitRouteComponent;
  let fixture: ComponentFixture<OrderSubmitRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSubmitRouteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSubmitRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
