import { TestBed, inject } from '@angular/core/testing';

import { JudgeViewService } from './judge-view.service';

describe('JudgeViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JudgeViewService]
    });
  });

  it('should be created', inject([JudgeViewService], (service: JudgeViewService) => {
    expect(service).toBeTruthy();
  }));
});
