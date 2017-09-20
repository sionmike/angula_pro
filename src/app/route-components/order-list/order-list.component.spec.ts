/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {OrderListRouteComponent} from './order-list.component';

describe('OrderListRouteComponent', () => {
  let component: OrderListRouteComponent;
  let fixture: ComponentFixture<OrderListRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListRouteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
