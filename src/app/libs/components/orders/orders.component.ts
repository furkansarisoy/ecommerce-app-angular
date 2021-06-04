import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { Order, OrderState } from '../../models/order';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('orderDetailModal', { static: true }) orderDetailModal: TemplateRef<{}>;

  today = new Date();
  orders: Order[];
  selectedOrder: Order;

  updateOrderDropdownOptions = [
    {
      key: 'Sipariş Alındı',
      value: OrderState.Ordered
    },
    {
      key: 'Hazırlanıyor',
      value: OrderState.Preparing
    },
    {
      key: 'Kargoya Verildi',
      value: OrderState.Shipment
    },
    {
      key: 'Teslim Edildi',
      value: OrderState.Delivered
    },
    {
      key: 'İptal Edildi',
      value: OrderState.Cancelled
    },
  ]

  subscriptions: Subscription[];

  constructor(
    private orderService: OrderService,
    private nzModalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.getOrders()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getOrders() {
    return this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  onDetailClick(order: Order) {
    this.selectedOrder = order;
    console.log(this.selectedOrder);

    this.nzModalService.create({
      nzTitle: `Sipariş ID: ${order.id}`,
      nzContent: this.orderDetailModal,
      nzOkText: 'Kaydet',
      nzWidth: '50%',
      nzOnOk: () => this.onOrderStateChange(this.selectedOrder),
      nzOnCancel: () => { this.selectedOrder = null; }
    });
  }

  onOrderStateChange(order: Order) {
    this.orderService.updateOrderById(order.id, order);
    this.selectedOrder = null;
  }

  formattedStateName(state: string) {
    switch (state) {
      case OrderState.Cancelled:
        return 'İptal Edildi';
      case OrderState.Delivered:
        return 'Teslim Edildi';
      case OrderState.Ordered:
        return 'Sipariş Alındı';
      case OrderState.Preparing:
        return 'Hazırlanıyor';
      case OrderState.Shipment:
        return 'Kargoya Verildi';
      default:
        return 'Veri Yok';
    }
  }

}
