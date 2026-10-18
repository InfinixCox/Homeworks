import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPrivado } from './panel-privado';

describe('PanelPrivado', () => {
  let component: PanelPrivado;
  let fixture: ComponentFixture<PanelPrivado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPrivado],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelPrivado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
