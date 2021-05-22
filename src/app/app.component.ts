import { Component, OnInit } from '@angular/core';
import { Product, ProductState } from './libs/models/product';
import { ProductService } from './libs/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }

  addNewProduct() {
    const product: Product = {
      title: 'Title',
      description: 'Description',
      colors: ['red', 'cyan'],
      sizes: ['small', 'large'],
      stock: 100,
      previewImageUrls: ['url1', 'url2'],
      price: 200,
      tags: ['test', 'deneme'],
      category: 'Deneme Kategorisi',
      state: ProductState.Active
    };
    this.productService.createProduct(product).then(res => console.log(res));
  }

  getProducts() {
    this.productService.getProducts().subscribe(q => console.log(q));
  }

  getProductById() {
    const id = '2Xhu1EDsNSbetIU1zYov';
    this.productService.getProductById(id).subscribe(q => console.log(q));
  }

  updateProduct() {
    const id = '2Xhu1EDsNSbetIU1zYov'
    const product = {
      title: 'Updated',
      description: 'Up',
    };
    this.productService.updateProductById(id, product);
  }

}
