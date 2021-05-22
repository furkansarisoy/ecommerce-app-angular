//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Ng zorro modules
import { ComponentsModule } from '../../components/components.module';

// Component imports
import { UserComponent } from './user.component';
import { HomepageComponent } from '../../components/homepage/homepage.component';
import { CategoriesComponent } from '../../components/categories/categories.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {
        path: 'homepage', component: HomepageComponent
      },
      {
        path: 'categories', component: CategoriesComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
