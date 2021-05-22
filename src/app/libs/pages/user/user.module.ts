//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component imports
import { UserComponent } from './user.component';

// Ng zorro modules
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '', component: UserComponent
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
