//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Ng zorro modules
import { ComponentsModule } from '../../components/components.module';

// Component imports
import { UserComponent } from './user.component';
import { HomepageComponent } from '../../components/homepage/homepage.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { LoginComponent } from '../../components/authorization/login/login.component';
import { RegisterComponent } from '../../components/authorization/register/register.component';
import { ResetPasswordComponent } from '../../components/authorization/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {
        path: '', redirectTo: 'homepage'
      },
      {
        path: 'homepage', component: HomepageComponent
      },
      {
        path: 'categories', component: CategoriesComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'reset-password', component: ResetPasswordComponent
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
