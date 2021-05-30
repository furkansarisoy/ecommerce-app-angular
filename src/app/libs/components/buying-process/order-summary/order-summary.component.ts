import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/libs/services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  get Subtotal() {
    return this.cartService.Subtotal;
  }

}
