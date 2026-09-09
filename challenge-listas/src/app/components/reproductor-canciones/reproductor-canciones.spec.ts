import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproductorCanciones } from './reproductor-canciones';

describe('ReproductorCanciones', () => {
  let component: ReproductorCanciones;
  let fixture: ComponentFixture<ReproductorCanciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReproductorCanciones],
    }).compileComponents();

    fixture = TestBed.createComponent(ReproductorCanciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
