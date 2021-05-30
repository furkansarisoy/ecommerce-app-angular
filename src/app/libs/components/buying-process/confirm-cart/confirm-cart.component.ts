import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/libs/services/cart.service';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.scss']
})
export class ConfirmCartComponent implements OnInit, OnDestroy {

  cart = [];
  subscription: Subscription;

  constructor(
    private cartService: CartService,
    private nzNotificationService: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.cartService.watchStorage().subscribe(store => {
      this.getProductsFromCart();
    });
    this.getProductsFromCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProductsFromCart() {
    if (this.cartService.getCart()) {
      this.cart = [...this.cartService.getCart()];
    }
  }

  removeItemFormCart(item) {
    this.cartService.deleteFromCart(item.id);
    this.getProductsFromCart();
    this.nzNotificationService.success('Ürün Sepetten Çıkarıldı', `${item.product.title} isimli ürün sepetten çıkarıldı`, { nzPlacement: 'bottomRight' });
  }

  checkPreviewImage(item) {
    return item?.previewImageUrls?.length ? item.previewImageUrls[0] : '';
  }

  onCartConfirm() {
    this.router.navigate(['/shipment']);
  }

  onBackToShopping() {
    this.router.navigate(['/homepage']);
  }

}
