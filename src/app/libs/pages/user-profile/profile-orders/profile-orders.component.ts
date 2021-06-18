import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Order } from 'src/app/libs/models/order';
import { AuthenticationService } from 'src/app/libs/services/authentication/authentication.service';
import { OrderService } from 'src/app/libs/services/order.service';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss']
})
export class ProfileOrdersComponent implements OnInit {

  activePersonId: string;
  orders: Order[];

  constructor(
    private angularFireAuth: AngularFireAuth,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.subscribeToAuthState();
  }

  subscribeToAuthState() {
    this.angularFireAuth.authState.subscribe(state => {
      if (state.uid) {
        this.activePersonId = state.uid;
        this.subscribeToActivePersonOrders();
      }
    });
  }

  subscribeToActivePersonOrders() {
    this.orderService.getOrderUserId(this.activePersonId).subscribe(orders => {
      this.orders = orders;
    });
  }

}
