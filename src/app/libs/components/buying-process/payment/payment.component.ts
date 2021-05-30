import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddressService } from 'src/app/libs/services/address.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private nzNotificationService: NzNotificationService,
    private router: Router,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {

  }

  onPaymentConfirm() {
  }

  onBackToShipment() {
    this.router.navigate(['/shipment'])
  }

  get activeAddress() {
    return this.addressService.getActiveAddress();
  }
}
