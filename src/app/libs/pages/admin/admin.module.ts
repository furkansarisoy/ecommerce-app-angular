//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Ng zorro modules
import { ComponentsModule } from '../../components/components.module';

// Component imports
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
        ComponentsModule
    ],
    exports: [
        AdminComponent
    ]
})
export class AdminModule { }
