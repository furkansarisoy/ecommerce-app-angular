import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Address } from 'src/app/libs/models/address';
import { AddressService } from 'src/app/libs/services/address.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {

  addressForm: FormGroup;
  activeAddress: Address;

  constructor(
    private addressService: AddressService,
    private nzNotificationService: NzNotificationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activeAddress = this.addressService.getActiveAddress();
    this.addressForm = this.formBuilder.group({
      fullName: [this.activeAddress?.fullName, Validators.required],
      mail: [this.activeAddress?.mail, Validators.required],
      phone: [this.activeAddress?.phone, Validators.required],
      fullAddress: [this.activeAddress?.fullAddress, Validators.required]
    });
  }

  onShipmentConfirm() {
    if (this.addressForm.valid) {
      this.addressService.setActiveAddress(this.addressForm.value);
      this.router.navigate(['/payment']);
    } else {
      this.nzNotificationService.error('Form Hatalı', 'Formda bulunan tüm alanlar doldurulmalıdır.', { nzPlacement: 'bottomRight' });
    }
  }

  onBackToCart() {
    this.router.navigate(['/confirm-cart'])
  }

}
