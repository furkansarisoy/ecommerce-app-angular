import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/libs/models/product';
import { CategoryService } from 'src/app/libs/services/category.service';
import { ProductService } from 'src/app/libs/services/product.service';
import { SelectOptions } from '../../shared/select/select.component';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  title = 'Yeni Ürün Oluştur';

  constructor(private productService: ProductService) { }

  ngOnInit(): void { }

  onProductCreate(product: Product) {
    if (product) {
      this.productService.createProduct(product);
    }
  }

}
