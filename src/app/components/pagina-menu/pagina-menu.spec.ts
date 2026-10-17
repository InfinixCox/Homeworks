import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMenu } from './pagina-menu';

describe('PaginaMenu', () => {
  let component: PaginaMenu;
  let fixture: ComponentFixture<PaginaMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginaMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
