import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  today = new Date();
  products: Product[];

  subscriptions: Subscription[];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.getProducts()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getProducts() {
    return this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onEditProductClick(product: Product) {
    this.router.navigate([`/admin/edit-product/${product.id}`]);
  }

}
