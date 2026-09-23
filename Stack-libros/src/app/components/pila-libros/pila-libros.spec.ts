import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilaLibros } from './pila-libros';

describe('PilaLibros', () => {
  let component: PilaLibros;
  let fixture: ComponentFixture<PilaLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilaLibros],
    }).compileComponents();

    fixture = TestBed.createComponent(PilaLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
