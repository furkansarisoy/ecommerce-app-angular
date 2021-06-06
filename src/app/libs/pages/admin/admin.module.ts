//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../services/guards/admin.guard';

// Ng zorro modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

// Component imports
import { ComponentsModule } from '../../components/components.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from '../../components/products/products.component';
import { EditProductComponent } from '../../components/products/edit-product/edit-product.component';
import { NewProductComponent } from '../../components/products/new-product/new-product.component';
import { OrdersComponent } from '../../components/orders/orders.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
            {
                path: 'products', component: ProductsComponent
            },
            {
                path: 'edit-product/:id', component: EditProductComponent
            },
            {
                path: 'new-product', component: NewProductComponent
            },
            {
                path: 'orders', component: OrdersComponent
            }
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
