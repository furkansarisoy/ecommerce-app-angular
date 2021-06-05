import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { Order, OrderState } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { ORDER_STATE_FILTER_OPTIONS, UPDATE_ORDER_STATE_OPTIONS } from './orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('orderDetailModal', { static: true }) orderDetailModal: TemplateRef<{}>;

  date = Date.now();
  orders: Order[];
  filteredOrders: Order[];
  selectedOrder: Order;
  searchText: string;
  isLoading = false;

  updateOrderStateOptions = UPDATE_ORDER_STATE_OPTIONS;

  orderStateFilterOptions = ORDER_STATE_FILTER_OPTIONS;

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
    this.isLoading = true;
    return this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.isLoading = false;
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

  filterByState(state: string[], order: Order) {
    return state.some(state => order.state === state);
  }

  sortByDate(a: Order, b: Order) {
    return <any>new Date(a.date) - <any>new Date(b.date);
  }

  filterBySearch() {
    this.filteredOrders = this.orders
      .filter(order => {
        return order.address.fullName.toUpperCase().includes(this.searchText.toUpperCase())
          || order.id.toUpperCase().includes(this.searchText.toUpperCase());
      });
  }

}
