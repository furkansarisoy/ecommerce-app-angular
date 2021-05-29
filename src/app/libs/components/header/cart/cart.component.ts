import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/libs/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  items: any[];
  subscription: Subscription;
  constructor(
    private cartService: CartService,
    private router: Router,
    private nzNotificationService: NzNotificationService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.watchStorage().subscribe(store => {
      this.getCart();
    });
    this.getCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCart() {
    this.items = this.cartService.getCart();
  }

  removeItemFormCart(item) {
    this.cartService.deleteFromCart(item.id);
    this.getCart();
    this.nzNotificationService.success('Ürün Sepetten Çıkarıldı', `${item.product.title} isimli ürün sepetten çıkarıldı`, { nzPlacement: 'bottomRight' });
  }

  checkPreviewImage(item) {
    return item?.previewImageUrls?.length ? item.previewImageUrls[0] : '';
  }

  onProductClick(product) {
    this.router.navigate([`/product/${product.product.id}`])
  }

}
