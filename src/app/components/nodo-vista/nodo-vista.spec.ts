import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodoVista } from './nodo-vista';

describe('NodoVista', () => {
  let component: NodoVista;
  let fixture: ComponentFixture<NodoVista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodoVista],
    }).compileComponents();

    fixture = TestBed.createComponent(NodoVista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
