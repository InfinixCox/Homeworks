import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolNumeros } from './arbol-numeros';

describe('ArbolNumeros', () => {
  let component: ArbolNumeros;
  let fixture: ComponentFixture<ArbolNumeros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolNumeros],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbolNumeros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
