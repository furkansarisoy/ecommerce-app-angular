import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaginatorComponent } from './payment-paginator.component';

describe('PaymentPaginatorComponent', () => {
  let component: PaymentPaginatorComponent;
  let fixture: ComponentFixture<PaymentPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
