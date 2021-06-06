// Angular modules
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import tr from '@angular/common/locales/tr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Component imports
import { AppComponent } from './app.component';

// Ng zorro modules
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { tr_TR } from 'ng-zorro-antd/i18n';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AdminGuard } from './libs/services/guards/admin.guard';

const adminOnly = () => hasCustomClaim('admin');
const redirectToHomepage = () => redirectUnauthorizedTo(['/homepage']);

registerLocaleData(tr);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./libs/pages/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./libs/pages/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule,
    NzNotificationModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: tr_TR },
    { provide: LOCALE_ID, useValue: 'tr-TR' },
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
