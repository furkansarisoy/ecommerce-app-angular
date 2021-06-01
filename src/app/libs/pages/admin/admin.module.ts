//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Ng zorro modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

// Component imports
import { ComponentsModule } from '../../components/components.module';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [

        ]
    }
]

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ComponentsModule,
        NzLayoutModule,
        NzMenuModule,
        NzIconModule
    ],
    exports: [
        AdminComponent
    ]
})
export class AdminModule { }
