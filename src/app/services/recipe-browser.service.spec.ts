import { TestBed } from '@angular/core/testing';

import { RecipeBrowserService } from './recipe-browser.service';

describe('RecipeBrowserService', () => {
  let service: RecipeBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
