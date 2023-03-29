import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFacturacionComponent } from './nav-facturacion.component';

describe('NavFacturacionComponent', () => {
  let component: NavFacturacionComponent;
  let fixture: ComponentFixture<NavFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavFacturacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
