// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Ng Zorro
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

// Components
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './authorization/login/login.component';
import { RegisterComponent } from './authorization/register/register.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './authorization/reset-password/reset-password.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    CategoriesComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    NzCarouselModule,
    NzCardModule,
    NzButtonModule,
    FormsModule,
    NzInputModule,
    NzIconModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
