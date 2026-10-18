import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodoMenuVista } from './nodo-menu-vista';

describe('NodoMenuVista', () => {
  let component: NodoMenuVista;
  let fixture: ComponentFixture<NodoMenuVista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodoMenuVista],
    }).compileComponents();

    fixture = TestBed.createComponent(NodoMenuVista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
