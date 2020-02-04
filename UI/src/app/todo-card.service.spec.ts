import { TestBed, inject } from '@angular/core/testing';

import { TodoCardService } from './todo-card.service';

describe('TodoCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoCardService]
    });
  });

  it('should be created', inject([TodoCardService], (service: TodoCardService) => {
    expect(service).toBeTruthy();
  }));
});
