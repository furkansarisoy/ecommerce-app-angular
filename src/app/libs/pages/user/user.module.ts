//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Ng zorro modules
import { ComponentsModule } from '../../components/components.module';

// Component imports
import { UserComponent } from './user.component';
import { HomepageComponent } from '../../components/homepage/homepage.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { LoginComponent } from '../../components/authentication/login/login.component';
import { RegisterComponent } from '../../components/authentication/register/register.component';
import { ResetPasswordComponent } from '../../components/authentication/reset-password/reset-password.component';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { AuthenticationGuard } from '../../services/authentication/authentication.guard';
import { ConfirmCartComponent } from '../../components/buying-process/confirm-cart/confirm-cart.component';
import { ShipmentComponent } from '../../components/buying-process/shipment/shipment.component';
import { PaymentComponent } from '../../components/buying-process/payment/payment.component';

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
        path: 'categories/:gender', component: CategoriesComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'reset-password', component: ResetPasswordComponent
      },
      {
        path: 'product/:id', component: ProductDetailComponent
      },
      {
        path: 'confirm-cart', component: ConfirmCartComponent
      },
      {
        path: 'shipment', component: ShipmentComponent
      },
      {
        path: 'payment', component: PaymentComponent
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
