import { TestBed } from '@angular/core/testing';

import { DatosGrafo } from './datos-grafo';

describe('DatosGrafo', () => {
  let service: DatosGrafo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosGrafo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
