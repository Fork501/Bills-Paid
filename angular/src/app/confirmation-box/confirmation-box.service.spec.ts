import { TestBed, inject } from '@angular/core/testing';

import { ConfirmationBox } from './confirmation-box.service';

describe('ConfirmationBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationBox]
    });
  });

  it('should be created', inject([ConfirmationBox], (service: ConfirmationBox) => {
    expect(service).toBeTruthy();
  }));
});
