import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Product, ProductState } from 'src/app/libs/models/product';
import { CategoryService } from 'src/app/libs/services/category.service';
import { SelectOptions } from '../../shared/select/select.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Input() data: Product;
  @Input() title: string = ' ';

  @Output() formSubmit = new EventEmitter<Product>();

  date = Date.now();
  productForm: FormGroup;
  previewImageUrls = [];
  categoryOptions: SelectOptions[];
  genderOptions: SelectOptions[] = [
    {
      key: 'Erkek',
      value: 'male'
    },
    {
      key: 'Kadın',
      value: 'female'
    }
  ];
  productStateOptions: SelectOptions[] = [
    {
      key: 'Aktif',
      value: ProductState.Active
    },
    {
      key: 'İnaktif',
      value: ProductState.Deactive
    },
    {
      key: 'Stokta Yok',
      value: ProductState.OutOfStock
    }
  ];

  selectedGender;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private nzNotificationService: NzNotificationService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.productForm = this.formBuilder.group({
      'title': [this.data?.title || '', Validators.required],
      'description': [this.data?.description || '', Validators.required],
      'price': [this.data?.price || 0, Validators.required]
    });
    this.initDefaultFormControls();
    this.mapData();
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
    console.log("sizes", sizes);

    this.productForm.removeControl('sizes');
    this.productForm.addControl('sizes', new FormControl(sizes, Validators.required));
  }

  onGenderValueChange(gender: string) {
    this.productForm.removeControl('gender');
    this.productForm.addControl('gender', new FormControl(gender, Validators.required));
    this.getCategoriesByGender(gender);
  }

  onCategoryValueChange(category: string) {
    this.productForm.removeControl('category');
    this.productForm.addControl('category', new FormControl(category, Validators.required));
  }

  onProductStateValueChange(state: string) {
    this.productForm.removeControl('state');
    this.productForm.addControl('state', new FormControl(state, Validators.required));
  }

  getCategoriesByGender(gender: string) {
    if (gender) {
      this.categoryService.getCategoriesByGender(gender).subscribe(categories => {
        this.categoryOptions = categories.map(category => {
          return {
            key: category.name,
            value: category.id
          }
        });
      });
    }
  }

  onFormSubmit() {
    if (this.productForm.valid) {
      this.formSubmit.emit(this.productForm.value);
    } else {
      this.nzNotificationService.error('Hata!', 'Tüm alanların doldurulması zorunludur', { nzPlacement: 'bottomRight' });
    }
  }

  onCancelClick() {
    this.router.navigate(['/admin/products']);
  }

}
