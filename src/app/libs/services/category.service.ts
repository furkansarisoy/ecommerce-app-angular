import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Gender } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {


    constructor(
        private angularFireStore: AngularFirestore,
        private nzNotificationSerivce: NzNotificationService
    ) { }

    getCategoriesByGender(gender: string) {
        return this.angularFireStore.collection<any>('categories', ref => ref.where('gender', '==', gender)).valueChanges();
    }

    createNewCategory(category) {
        const id = this.angularFireStore.createId();
        const categoryRef = this.angularFireStore.doc(`categories/${id}`);
        categoryRef.set({ ...category, id: id }, {
            merge: true
        }).then(() => {
            this.nzNotificationSerivce.success(category.name, 'Kategori başarı ile oluşturuldu', { nzPlacement: 'bottomRight' });
        }).catch(error => {
            this.nzNotificationSerivce.error(category.name, 'Kategori oluşturulurken bir hata ile karşılaşıldı: ' + error, { nzPlacement: 'bottomRight' });
        })
    }

}
