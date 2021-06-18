import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ng-zorro 
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';

import { ComponentsModule } from '../../components/components.module';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

const routes: Routes = [
  {
    path: '', component: UserProfileComponent, children: [
      {
        path: '', redirectTo: 'orders'
      },
      {
        path: 'orders', component: ProfileOrdersComponent
      },
      {
        path: 'favorites', component: ProfileFavoritesComponent
      },
      {
        path: 'settings', component: ProfileSettingsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    UserProfileComponent,
    ProfileOrdersComponent,
    ProfileFavoritesComponent,
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
    NzTableModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule
  ],
  exports: []
})
export class UserProfileModule { }
