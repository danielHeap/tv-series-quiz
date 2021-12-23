/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionViewService } from './question-view.service';

describe('Service: QuestionView.service.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionViewService],
    });
  });

  it('should ...', inject([QuestionViewService], (service: QuestionViewService) => {
    expect(service).toBeTruthy();
  }));
});
