import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { CategorizedProduct, Product } from '../../models/product';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  activePersonId: string;
  activePerson;
  products: CategorizedProduct[];
  categories: string[];

  selectedCategory = 0;
  subscriptions: Subscription[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthenticationService,
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.getProductsAndCategories(),
      this.subscribeToActivePersonId()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  subscribeToActivePersonId() {
    return this.angularFireAuth.authState.subscribe(state => {
      if (state.uid) {
        this.activePersonId = state.uid;
        this.subscribeToActivePerson();
      } else {
        this.activePersonId = null;
        this.activePerson = null;
      }
    });
  }

  subscribeToActivePerson() {
    this.authService.getActivePersonCredentialsById(this.activePersonId).subscribe(person => {
      this.activePerson = person;
    });
  }

  getProductsAndCategories() {
    return this.productService.getProducts().subscribe(products => {
      this.products = this.productService.categorizeProducts(products);
      this.categories = this.productService.getCategories(products);
    });
  }

  onCategoryItemClick(index) {
    this.selectedCategory = index;
  }

  onProductClick(id: string) {
    this.router.navigate([`/product/${id}`]);
  }

  onFavClick(event, product: Product) {
    event.stopPropagation();
    if (this.activePersonId) {
      const favorites = this.activePerson.favorites;
      const isFavExist = favorites.some(fav => fav.id === product.id);
      const userRef = this.angularFireStore.collection('users').doc(this.activePersonId);
      if (isFavExist) {
        console.log('ürün zaten favorilerinizde');
      } else {
        userRef.update({
          favorites: [
            ...favorites,
            product
          ]
        }).then(() => {
          console.log('favorilendi')
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

}
