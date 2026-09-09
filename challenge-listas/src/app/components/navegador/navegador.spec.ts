import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegadorComponent } from './navegador';


describe('NavegadorComponent', () => {
  let component: NavegadorComponent;
  let fixture: ComponentFixture<NavegadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavegadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavegadorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
