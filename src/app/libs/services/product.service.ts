import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategorizedProduct, Product } from '../models/product';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private angularFirestore: AngularFirestore,
    private nzNotificationService: NzNotificationService) { }

  getProducts() {
    return this.angularFirestore.collection<Product>('products').valueChanges();
  }

  getProductById(productId: string) {
    return this.angularFirestore.collection<Product>('products', ref => ref.where('id', '==', productId)).valueChanges();
  }

  updateProductById(productId: string, productData: any) {
    const productRef = this.angularFirestore.doc(`products/${productId}`);
    return productRef.update(productData)
      .then(() => {
        this.nzNotificationService.success("Başarılı!", "Ürün başarılı bir şekilde güncellendi", { nzPlacement: 'bottomRight' });
      }).catch(error => this.nzNotificationService.error("Hata!", "Ürün güncellenirken bir hata ile karşılaşıldı:" + error, { nzPlacement: 'bottomRight' }));
  }

  createProduct(product: Product) {
    const id = this.angularFirestore.createId();
    const productRef = this.angularFirestore.doc(`products/${id}`);
    const productData = {
      id: id,
      ...product
    };
    return productRef.set(productData, {
      merge: true
    }).then(() => {
      this.nzNotificationService.success("Başarılı!", "Yeni ürün başarılı bir şekilde eklendi", { nzPlacement: 'bottomRight' });
    }).catch(error => this.nzNotificationService.error("Hata!", "Yeni ürün eklenirken bir hata ile karşılaşıldı:" + error, { nzPlacement: 'bottomRight' }));
  }

  categorizeProducts(products: Product[]): CategorizedProduct[] {

    const categories = this.getCategories(products);

    /* categorize products which have any category */
    const categorizedProducts = categories.map(category => {
      /* get products of the category */
      const productsByCategory = products.filter(product => product.category === category);
      return {
        category: category,
        data: productsByCategory
      };
    });

    return categorizedProducts;
  }

  getCategories(products: Product[]): string[] {
    /* handle when products data is broken or empty array */
    if (!products) {
      return null;
    } else if (!products.length) {
      return [];
    }

    /* get categories */
    const allCategories = products
      .map(product => {
        return product.category
      });

    /* Delete duplicate */
    const categories = [...new Set(allCategories)];

    return categories;
  }

}
