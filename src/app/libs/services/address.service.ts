import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Address } from '../models/address';

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    private storageSub = new Subject<String>();

    constructor() { }

    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }

    setActiveAddress(address: Address) {
        localStorage.setItem('address', JSON.stringify(address));
        this.storageSub.next('set active address');
    }

    removeActiveAddress() {
        localStorage.removeItem('address');
        this.storageSub.next('address removed');
    }

    getActiveAddress() {
        return JSON.parse(localStorage.getItem('address'));
    }

}
