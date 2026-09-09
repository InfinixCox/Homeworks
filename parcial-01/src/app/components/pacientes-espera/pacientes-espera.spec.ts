import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesEspera } from './pacientes-espera';

describe('PacientesEspera', () => {
  let component: PacientesEspera;
  let fixture: ComponentFixture<PacientesEspera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesEspera],
    }).compileComponents();

    fixture = TestBed.createComponent(PacientesEspera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
