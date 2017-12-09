/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemcarService } from './itemcar.service';

describe('ItemcarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemcarService]
    });
  });

  it('should ...', inject([ItemcarService], (service: ItemcarService) => {
    expect(service).toBeTruthy();
  }));
});
