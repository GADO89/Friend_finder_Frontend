import { TestBed } from '@angular/core/testing';

import {LoginActivatedService } from './login-activated-service.service';

describe('LoginActivatedServiceService', () => {
  let service: LoginActivatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginActivatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
