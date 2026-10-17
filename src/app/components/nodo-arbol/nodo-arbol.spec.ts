import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodoArbol } from './nodo-arbol';

describe('NodoArbol', () => {
  let component: NodoArbol;
  let fixture: ComponentFixture<NodoArbol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodoArbol],
    }).compileComponents();

    fixture = TestBed.createComponent(NodoArbol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
