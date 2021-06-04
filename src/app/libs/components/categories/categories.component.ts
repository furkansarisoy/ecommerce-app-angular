import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription } from 'rxjs';
import { CategorizedProduct, Product } from '../../models/product';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  activePersonId: string;
  activePerson;
  products: Product[];
  categorizedProducts: Product[];
  categories: string[];
  genderParam: string;
  subscriptions: Subscription[];
  isLoading = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.subscriptions = [
      this.getParamsFromUrl(),
      this.subscribeToActivePersonId()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getParamsFromUrl() {
    return this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.isLoading = true;
      this.genderParam = params.get('gender');
      this.getProductsByGender(this.genderParam);
      this.getCategoriesByGender(this.genderParam);
    });
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

  getProductsByGender(gender) {
    return this.productService.getProductsByGender(gender).subscribe(products => {
      this.products = products;
    });
  }

  getCategoriesByGender(gender) {
    return this.categoryService.getCategoriesByGender(gender).subscribe(categories => {
      this.categories = categories;
      this.isLoading = false;
      this.filterProductsByCategoryId(this.categories[0]);
    })
  }

  filterProductsByCategoryId(category) {
    this.categorizedProducts = this.products.filter(product => product.category === category.id);
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
