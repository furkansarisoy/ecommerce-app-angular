import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private storageSub = new Subject<String>();

    constructor() { }

    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }

    addToCart(product: any) {
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({ ...product, id: Math.random() });
        localStorage.setItem('cart', JSON.stringify(cart));
        this.storageSub.next('changed');
    }

    deleteFromCart(id: any) {
        let activeCart = JSON.parse(localStorage.getItem('cart'));
        let cart = activeCart.filter(cartItem => cartItem.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.storageSub.next('changed');
    }

    getCart() {
        return JSON.parse(localStorage.getItem('cart'));
    }

    get Subtotal() {
        let cart = this.getCart();
        let subtotal = 0;
        cart?.forEach(cartItem => {
            subtotal = subtotal + (cartItem.count * cartItem.product.price);
        });
        return subtotal;
    }

    get StorageSub() {
        return this.storageSub;
    }

}
