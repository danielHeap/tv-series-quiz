/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamsQueryService } from './teams-query.service';

describe('Service: TeamsQuery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamsQueryService]
    });
  });

  it('should ...', inject([TeamsQueryService], (service: TeamsQueryService) => {
    expect(service).toBeTruthy();
  }));
});
