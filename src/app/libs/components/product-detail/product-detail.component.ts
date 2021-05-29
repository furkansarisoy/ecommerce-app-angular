import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  product: Product;
  selectedColor: string;
  selectedSize: string;
  count = 1;

  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private nzNotificationService: NzNotificationService) {

  }

  ngOnInit(): void {
    this.subscription = this.getActiveParams();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getActiveParams() {
    return this.activatedRoute.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.getProductByProductId(productId);
      }
    });
  }

  getProductByProductId(id: string) {
    return this.productService.getProductById(id).subscribe(product => {
      this.product = product[0];
    });
  }

  onAddCartClick() {
    const order = {
      product: this.product,
      color: this.selectedColor,
      size: this.selectedSize,
      count: this.count
    };
    if (order.color && order.size) {
      this.cartService.addToCart(order);
      this.nzNotificationService.success('Ürün sepete eklendi', ` ${order.product.title} isimli ürün sepete eklendi`, { nzPlacement: 'bottomRight' });
    } else {
      this.nzNotificationService.error(order.product.title, 'Renk veya beden seçilmedi', { nzPlacement: 'bottomRight' });
    }
  }

  onAddFavClick() {
    const fav = this.product;
    console.log(fav);
  }

  checkPreviewImage(item) {
    return item?.previewImageUrls?.length ? item.previewImageUrls[0] : '';
  }

}
