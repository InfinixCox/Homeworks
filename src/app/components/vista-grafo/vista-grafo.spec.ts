import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaGrafo } from './vista-grafo';

describe('VistaGrafo', () => {
  let component: VistaGrafo;
  let fixture: ComponentFixture<VistaGrafo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaGrafo],
    }).compileComponents();

    fixture = TestBed.createComponent(VistaGrafo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
