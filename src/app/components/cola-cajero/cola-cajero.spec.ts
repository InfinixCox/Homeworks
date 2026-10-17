import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaCajero } from './cola-cajero';

describe('ColaCajero', () => {
  let component: ColaCajero;
  let fixture: ComponentFixture<ColaCajero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaCajero],
    }).compileComponents();

    fixture = TestBed.createComponent(ColaCajero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
