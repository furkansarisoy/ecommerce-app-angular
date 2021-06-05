import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Gender, Product, ProductState } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { PRODUCT_STATE_FILTER_OPTIONS, GENDER_FILTER_OPTIONS } from './products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  date = Date.now();
  products: Product[];
  filteredProducts: Product[];
  isLoading = false;
  searchText: string;

  genderFilterOptions = GENDER_FILTER_OPTIONS;
  productStateFilterOptions = PRODUCT_STATE_FILTER_OPTIONS;

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

  checkPreviewImg(product: Product) {
    if (product?.previewImageUrls) {
      return product.previewImageUrls[0];
    } else {
      return null;
    }
  }

  formattedStateName(state: string) {
    switch (state) {
      case ProductState.Active:
        return 'Aktif';
      case ProductState.Deactive:
        return 'İnaktif';
      case ProductState.OutOfStock:
        return 'Stokta Yok';
      default:
        return 'Veri Yok';
    }
  }

  formattedGenderName(state: string) {
    switch (state) {
      case Gender.Female:
        return 'Kadın';
      case Gender.Male:
        return 'Erkek';
      default:
        return 'Veri Yok';
    }
  }

  filterByState(state: string[], product: Product) {
    return state.some(state => product.state === state);
  }

  filterByGender(gender: string[], product: Product) {
    return gender.some(gender => product.gender === gender);
  }

  filterBySearch() {
    this.filteredProducts = this.products
      .filter(product => {
        return product.title.toUpperCase().includes(this.searchText.toUpperCase())
          || product.id.toUpperCase().includes(this.searchText.toUpperCase());
      });
  }

}
