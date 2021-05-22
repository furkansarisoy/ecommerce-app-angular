import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategorizedProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  products: CategorizedProduct[];
  categories: string[];

  selectedCategory = 0;
  subscriptions: Subscription[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.getProductsAndCategories()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getProductsAndCategories() {
    return this.productService.getProducts().subscribe(products => {
      this.products = this.productService.categorizeProducts(products);
      this.categories = this.productService.getCategories(products);
      console.log(this.products);
      console.log(this.categories);
    });
  }

  onCategoryItemClick(index) {
    this.selectedCategory = index;
    console.log(index);

  }

}
