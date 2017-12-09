/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataitemcarService } from './dataitemcar.service';

describe('DataitemcarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataitemcarService]
    });
  });

  it('should ...', inject([DataitemcarService], (service: DataitemcarService) => {
    expect(service).toBeTruthy();
  }));
});
