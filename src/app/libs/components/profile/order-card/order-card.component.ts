import { Component, Input, OnChanges } from '@angular/core';
import { Order, OrderedProduct } from 'src/app/libs/models/order';
import { Product } from 'src/app/libs/models/product';
import { OrderService } from 'src/app/libs/services/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnChanges {

  @Input() order: Order;
  orderedProducts: OrderedProduct[];
  isCollapsed = false;
  constructor(private orderService: OrderService) { }

  ngOnChanges(): void {
    this.collapseOrderedProducts();
  }

  checkPreviewImage(item) {
    return item?.previewImageUrls?.length ? item.previewImageUrls[0] : '';
  }

  formattedStateName(state: string) {
    return this.orderService.formatStateName(state);
  }

  collapseOrderedProducts() {
    this.orderedProducts = [
      this.order.orderedProducts[0]
    ];
    this.isCollapsed = true;
  }

  showAllOrderedProducts() {
    this.orderedProducts = [...this.order.orderedProducts];
    this.isCollapsed = false;
  }

}
