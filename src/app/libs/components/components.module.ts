// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Ng Zorro
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';

// Components
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    NzCarouselModule,
    NzCardModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
