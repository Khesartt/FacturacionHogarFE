import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboEgresoComponent } from './recibo-egreso.component';

describe('ReciboEgresoComponent', () => {
  let component: ReciboEgresoComponent;
  let fixture: ComponentFixture<ReciboEgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboEgresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciboEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
