import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../models/order';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private angularFirestore: AngularFirestore,
        private nzNotificationService: NzNotificationService) { }

    getOrders() {
        return this.angularFirestore.collection<Order>('orders').valueChanges();
    }

    getOrderById(orderId: string) {
        return this.angularFirestore.collection<Order>('orders', ref => ref.where('id', '==', orderId)).valueChanges();
    }

    getOrderUserId(uid: string) {
        return this.angularFirestore.collection<Order>('orders', ref => ref.where('uid', '==', uid)).valueChanges();
    }

    updateOrderById(orderId: string, orderData: any) {
        const orderRef = this.angularFirestore.doc(`orders/${orderId}`);
        return orderRef.update(orderData)
            .then(() => {
                this.nzNotificationService.success("Başarılı!", "Ürün başarılı bir şekilde güncellendi", { nzPlacement: 'bottomRight' });
            }).catch(error => this.nzNotificationService.error("Hata!", "Ürün güncellenirken bir hata ile karşılaşıldı:" + error, { nzPlacement: 'bottomRight' }));
    }

    createOrder(order: Order) {
        const id = this.angularFirestore.createId();
        const orderRef = this.angularFirestore.doc(`orders/${id}`);
        const orderData = {
            id: id,
            ...order
        };
        return orderRef.set(orderData, {
            merge: true
        }).then(() => {
            this.nzNotificationService.success("Başarılı!", "Yeni ürün başarılı bir şekilde eklendi", { nzPlacement: 'bottomRight' });
        }).catch(error => this.nzNotificationService.error("Hata!", "Yeni ürün eklenirken bir hata ile karşılaşıldı:" + error, { nzPlacement: 'bottomRight' }));
    }

}
