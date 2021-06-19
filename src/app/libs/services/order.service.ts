import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order, OrderState } from '../models/order';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private angularFirestore: AngularFirestore,
        private nzNotificationService: NzNotificationService
    ) { }

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
                this.nzNotificationService.success("Başarılı!", "Sipariş başarılı bir şekilde güncellendi", { nzPlacement: 'bottomRight' });
            }).catch(error => this.nzNotificationService.error("Hata!", "Sipariş güncellenirken bir hata ile karşılaşıldı:" + error, { nzPlacement: 'bottomRight' }));
    }

    createOrder(order: Order) {
        order.id = this.angularFirestore.createId();
        const orderRef = this.angularFirestore.doc(`orders/${order.id}`);
        const orderData = {
            ...order,
            date: Date.now()
        };
        return orderRef.set(orderData, {
            merge: true
        }).then(() => {
            this.setOrderIdToUserData(order);
        })
            .catch(error => this.nzNotificationService.error("Hata!", "Yeni sipariş eklenirken bir hata ile karşılaşıldı:" + error, { nzPlacement: 'bottomRight' }));
    }

    setOrderIdToUserData(order: Order) {
        if (order.uid) {
            const userRef = this.angularFirestore.collection('users').doc(order.uid);
            let person;
            userRef.get().subscribe(res => {
                person = res.data();
                userRef.update({
                    orders: [
                        ...person.orders,
                        order.id
                    ]
                });
            });
        }
    }

    formatStateName(state: string) {
        switch (state) {
            case OrderState.Cancelled:
                return {
                    text: 'İptal Edildi',
                    color: 'red'
                }
            case OrderState.Delivered:
                return {
                    text: 'Teslim Edildi',
                    color: 'green'
                }
            case OrderState.Ordered:
                return {
                    text: 'Sipariş Alındı',
                    color: 'blue'
                }
            case OrderState.Preparing:
                return {
                    text: 'Hazırlanıyor',
                    color: 'blue'
                }
            case OrderState.Shipment:
                return {
                    text: 'Kargoya Verildi',
                    color: 'blue'
                }
            default:
                return {
                    text: 'Veri Yok',
                    color: 'black'
                };
        }
    }

}
