import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Order, OrderState } from 'src/app/libs/models/order';
import { AddressService } from 'src/app/libs/services/address.service';
import { AuthenticationService } from 'src/app/libs/services/authentication/authentication.service';
import { CartService } from 'src/app/libs/services/cart.service';
import { OrderService } from 'src/app/libs/services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  isOrderDone = false;
  activePersonId = null;

  constructor(
    private nzNotificationService: NzNotificationService,
    private router: Router,
    private addressService: AddressService,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private angularFireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.angularFireAuth.authState.subscribe(person => {
      this.activePersonId = person.uid;
    })
  }

  onPaymentConfirm() {
    if (this.cartService.getCart() && this.addressService.getActiveAddress()) {
      const cart = this.cartService.getCart();
      const address = this.addressService.getActiveAddress();
      const subtotal = this.cartService.Subtotal;
      const order: Order = {
        uid: this.activePersonId,
        address: address,
        state: OrderState.Preparing,
        orderedProducts: [...cart],
        shipmentCost: 0,
        totalCost: subtotal
      }
      this.orderService.createOrder(order);
      this.isOrderDone = true;
      localStorage.clear();
      this.cartService.StorageSub.next('sipariş tamamlandı');
    } else {
      console.log('somethin went wrong :(');
    }
  }

  onBackToShipment() {
    this.router.navigate(['/shipment'])
  }

  onBackToShopping() {
    this.router.navigate(['/homepage'])
  }

  get activeAddress() {
    return this.addressService.getActiveAddress();
  }
}
