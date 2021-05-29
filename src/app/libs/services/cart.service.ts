import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor() { }

    addToCart(product: any) {
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({ product, id: Math.random() });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    deleteFromCart(id: any) {
        let activeCart = JSON.parse(localStorage.getItem('cart'));
        let cart = activeCart.filter(cartItem => cartItem.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    getCart() {
        return JSON.parse(localStorage.getItem('cart'));
    }

}
