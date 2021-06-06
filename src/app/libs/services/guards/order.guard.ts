import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { AddressService } from '../address.service';
import { CartService } from '../cart.service';

@Injectable({
    providedIn: 'root'
})

export class OrderGuard implements CanActivate {

    constructor(
        private cartService: CartService,
        private addressService: AddressService,
        private router: Router,
        private nzNotificationService: NzNotificationService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const cart = this.cartService.getCart();
        const activeAddress = this.addressService.getActiveAddress();
        if (cart?.length <= 0 && (state.url === '/shipment' || '/payment')) {
            this.router.navigate(['/confirm-cart']);
            this.nzNotificationService.error('Sepet Boş', 'Sipariş verebilmek için sepetinizde ürün olmalıdır', { nzPlacement: 'bottomRight' });
        }
        if (activeAddress == null && state.url === '/payment') {
            this.router.navigate(['/shipment']);
            this.nzNotificationService.error('Adres Bilgisi Eksik', 'Lütfen adres bilgisini eksiksiz giriniz', { nzPlacement: 'bottomRight' });
        }
        return true;
    }

}