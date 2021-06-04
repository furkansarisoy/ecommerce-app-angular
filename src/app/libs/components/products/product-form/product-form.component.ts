import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/libs/models/product';
import { SelectOptions } from '../../shared/select/select.component';

export enum ProductFormType {
  Edit = 'edit',
  Create = 'create'
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() data: Product;
  @Input() title: string = ' ';
  @Input() pageType: ProductFormType;
  @Input() genderOptions: SelectOptions[];
  @Input() categoryOptions: SelectOptions[];
  @Input() productStateOptions: SelectOptions[];

  date = new Date();
  productForm: FormGroup;
  previewImageUrls = [];

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.productForm = this.formBuilder.group({
        'title': [this.data?.title || '', Validators.required],
        'description': [this.data?.description || '', Validators.required],
        'price': [this.data?.price || 0, Validators.required]
      });
      this.initDefaultFormControls();
      this.mapData();
    }
  }

  initDefaultFormControls() {
    this.onImagesValueChange(this.data?.previewImageUrls);
    this.onColorInputValueChange(this.data?.colors);
    this.onTagInputValueChange(this.data?.tags);
    this.onSizeInputValueChange(this.data?.sizes);
    this.onCategoryValueChange(this.data?.category);
    this.onProductStateValueChange(this.data?.state);
    this.onGenderValueChange(this.data?.gender);
  }

  mapData() {
    if (this.data?.previewImageUrls) {
      this.previewImageUrls = this.data.previewImageUrls.map(item => {
        return {
          value: item
        };
      });
    }
  }

  onImagesValueChange(images: string[]) {
    this.productForm.removeControl('previewImageUrls');
    this.productForm.addControl('previewImageUrls', new FormControl(images, Validators.required));
  }

  onColorInputValueChange(colors: string[]) {
    this.productForm.removeControl('colors');
    this.productForm.addControl('colors', new FormControl(colors, Validators.required));
  }

  onTagInputValueChange(tags: string[]) {
    this.productForm.removeControl('tags');
    this.productForm.addControl('tags', new FormControl(tags, Validators.required));
  }

  onSizeInputValueChange(sizes: string[]) {
    this.productForm.removeControl('sizes');
    this.productForm.addControl('sizes', new FormControl(sizes, Validators.required));
  }

  onGenderValueChange(gender: string) {
    this.productForm.removeControl('gender');
    this.productForm.addControl('gender', new FormControl(gender, Validators.required));
  }

  onCategoryValueChange(category: string) {
    this.productForm.removeControl('category');
    this.productForm.addControl('category', new FormControl(category, Validators.required));
  }

  onProductStateValueChange(state: string) {
    this.productForm.removeControl('state');
    this.productForm.addControl('state', new FormControl(state, Validators.required));
  }

}
