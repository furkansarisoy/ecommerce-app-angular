import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/libs/models/product';
import { ProductService } from 'src/app/libs/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {

  product: Product;
  productId: string;
  subscriptions: Subscription[];
  title;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.subscribeToUrl(),
      this.getProductById()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  subscribeToUrl() {
    return this.activatedRoute.url.subscribe(url => this.productId = url[1].path);
  }

  getProductById() {
    return this.productService.getProductById(this.productId).subscribe(product => {
      if (product) {
        this.product = product[0];
        this.title = `Düzenle: ${product[0].title}`;
      }
    });
  }

  onProductEdit(product: Product) {
    this.productService.updateProductById(this.productId, product);
  }

}
