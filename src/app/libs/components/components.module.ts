// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Ng Zorro
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

// Components
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    NzCarouselModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
