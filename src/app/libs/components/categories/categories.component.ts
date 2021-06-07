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
  categories: any[];
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
    this.isLoading = true;
    this.subscriptions = [
      this.subscribeToActivePersonId()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  subscribeToActivePersonId() {
    return this.angularFireAuth.authState.subscribe(state => {
      if (state) {
        this.activePersonId = state.uid;
        this.subscribeToActivePerson();
      } else {
        this.activePersonId = null;
        this.activePerson = null;
        this.getParamsFromUrl();
      }
    });
  }

  subscribeToActivePerson() {
    this.authService.getActivePersonCredentialsById(this.activePersonId).subscribe(person => {
      this.activePerson = person;
      this.getParamsFromUrl();
    });
  }

  getParamsFromUrl() {
    return this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.genderParam = params.get('gender');
      this.getProductsByGender(this.genderParam);
      this.getCategoriesByGender(this.genderParam);
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
      if (this?.activePerson?.personalizedTags.length) {
        this.setPersonalizedCategory();
      } else {
        this.filterProductsByCategoryId(this.categories[0]);
      }
    })
  }

  filterProductsByCategoryId(category) {
    if (category.id === 'personalized') {
      this.categorizedProducts = this.filterProductsByPersonalizedTags();
    } else {
      this.categorizedProducts = this.products.filter(product => product.category === category.id && product.state === ProductState.Active);
    }
    this.isLoading = false;
  }


  setPersonalizedCategory() {
    this.categories = [
      {
        name: 'Sana Özel Ürünler',
        id: 'personalized'
      },
      ...this.categories
    ];
    this.filterProductsByCategoryId(this.categories[0]);
  }

  filterProductsByPersonalizedTags() {
    const tags: string[] = this.activePerson.personalizedTags;
    const filteredProducts = this.products.filter(product => {
      return product.tags.some(tag => tags.includes(tag)) && product.state === ProductState.Active;
    });
    return filteredProducts;
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
