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
import { AuthenticationGuard } from '../../services/guards/authentication.guard';
import { ConfirmCartComponent } from '../../components/buying-process/confirm-cart/confirm-cart.component';
import { ShipmentComponent } from '../../components/buying-process/shipment/shipment.component';
import { PaymentComponent } from '../../components/buying-process/payment/payment.component';
import { OrderGuard } from '../../services/guards/order.guard';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { PersonalizedFilterComponent } from '../../components/personalized-filter/personalized-filter.component';

const redirectLoggedInToHomepage = () => redirectLoggedInTo(['homepage']);
const redirectUnauthorizedToLoginPage = () => redirectUnauthorizedTo(['login']);

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
        path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHomepage }
      },
      {
        path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHomepage }
      },
      {
        path: 'reset-password', component: ResetPasswordComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHomepage }
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
      },
      {
        path: 'personalized-filter', component: PersonalizedFilterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLoginPage }
      },
      {
        path: 'profile',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLoginPage },
        loadChildren: () => import('../user-profile/user-profile.module').then(m => m.UserProfileModule)
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
