/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {ServiceListService} from './service-list.service';

describe('ServiceListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceListService]
    });
  });

  it('should ...', inject([ServiceListService], (service: ServiceListService) => {
    expect(service).toBeTruthy();
  }));
});
