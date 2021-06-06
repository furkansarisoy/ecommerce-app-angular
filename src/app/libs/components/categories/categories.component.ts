import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { Product, ProductState } from '../../models/product';
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
    private categoryService: CategoryService,
    private nzMessageService: NzMessageService
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
    this.categorizedProducts = this.products.filter(product => product.category === category.id && product.state === ProductState.Active);
  }

  onProductClick(id: string) {
    this.router.navigate([`/product/${id}`]);
  }

  onFavClick(event, product: Product) {
    event.stopPropagation();
    if (this.activePersonId) {
      const favorites = this.activePerson?.favorites;
      const isFavExist = this.isFaved(product);
      const userRef = this.angularFireStore.collection('users').doc(this.activePersonId);
      if (isFavExist) {
        const filteredFavs = favorites?.filter(fav => fav.id !== product.id);
        userRef.update({
          favorites: filteredFavs
        }).then(() => this.nzMessageService.warning(`${product.title} favorilerinizden çıkarıldı!`));
      } else {
        userRef.update({
          favorites: [
            ...favorites,
            product
          ]
        }).then(() => this.nzMessageService.success(`${product.title} favorilerinize eklendi!`));
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  isFaved(product) {
    return this.activePerson?.favorites.some(fav => fav.id === product.id);
  }

}
