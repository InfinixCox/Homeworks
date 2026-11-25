import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCanciones } from './buscador-canciones';

describe('BuscadorCanciones', () => {
  let component: BuscadorCanciones;
  let fixture: ComponentFixture<BuscadorCanciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorCanciones],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorCanciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
