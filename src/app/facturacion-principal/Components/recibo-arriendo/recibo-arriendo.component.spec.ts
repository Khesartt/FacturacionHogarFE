import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboArriendoComponent } from './recibo-arriendo.component';

describe('ReciboArriendoComponent', () => {
  let component: ReciboArriendoComponent;
  let fixture: ComponentFixture<ReciboArriendoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboArriendoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciboArriendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
