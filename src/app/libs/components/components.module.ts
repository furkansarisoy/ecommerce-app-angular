// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ng Zorro
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

// Components
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    NzCarouselModule,
    NzCardModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    RouterModule,
    NzFormModule,
    NzRadioModule,
    NzInputNumberModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
