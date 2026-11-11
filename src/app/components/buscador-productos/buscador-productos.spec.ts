import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorProductos } from './buscador-productos';

describe('BuscadorProductos', () => {
  let component: BuscadorProductos;
  let fixture: ComponentFixture<BuscadorProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorProductos],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorProductos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
