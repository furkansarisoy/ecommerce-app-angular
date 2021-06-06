import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/libs/models/product';
import { CategoryService } from 'src/app/libs/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  @Input() isCategoryModalVisible = false;

  categoryForm: FormGroup;

  selectedGender = null;
  genderOptions = [
    {
      key: 'Erkek',
      value: Gender.Male
    },
    {
      key: 'Kadın',
      value: Gender.Female
    }
  ];

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      'name': ['', Validators.required]
    });
  }

  createCategory(category) {
    this.categoryService.createNewCategory(category);
  }

  onGenderValueChange(gender) {
    this.categoryForm.removeControl('gender');
    this.categoryForm.addControl('gender', new FormControl(gender, Validators.required));
    this.selectedGender = gender;
  }

  onFormSubmit(formData: any) {
    if (formData.valid && !(this.selectedGender == null)) {
      this.categoryService.createNewCategory(formData.value);
      this.isCategoryModalVisible = false;
      this.categoryForm.reset();
      this.selectedGender = null;
    } else {
      console.log('form valid değil');
    }
  }

  handleModalCancel() {
    this.isCategoryModalVisible = false;
    this.categoryForm.reset();
    this.selectedGender = null;
  }
}
