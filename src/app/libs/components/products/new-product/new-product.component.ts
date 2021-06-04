import { Component, OnInit } from '@angular/core';
import { ProductFormType } from '../product-form/product-form.component';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  title = 'Yeni Ürün Oluştur';
  type = ProductFormType.Create;

  constructor() { }

  ngOnInit(): void { }

}
