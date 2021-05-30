import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AngularFirestore, AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Person } from '../../models/person';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    isLoading = new Subject<boolean>();

    constructor(
        private notificationService: NzNotificationService,
        private angularFireAuth: AngularFireAuth,
        private angularFirestore: AngularFirestore,
        private router: Router, private ngZone: NgZone
    ) {
        this.isLoading.next(false);
    }

    register(userCredential: Person, password: string) {
        this.isLoading.next(true);
        this.angularFireAuth.createUserWithEmailAndPassword(userCredential.mail, password)
            .then(res => {
                this.notificationService.success("Başarılı", "Kayıt olma işleminiz başarı ile tamamladı.", { nzPlacement: "bottomRight" });
                this.setUserData(res.user, userCredential);
                this.ngZone.run(() => {
                    this.router.navigate(['/homepage']);
                });
                this.isLoading.next(false);
                localStorage.clear();
            })
            .catch(error => {
                this.notificationService.error("Hata", "Kayıt olma işlemi sırasında bir hata oluştu:" + error.message, { nzPlacement: "bottomRight" });
                this.isLoading.next(false);
            });
    }

    login(mail: string, password: string) {
        this.isLoading.next(true);
        this.angularFireAuth.signInWithEmailAndPassword(mail, password)
            .then(() => {
                this.ngZone.run(() => {
                    this.router.navigate(['/homepage']);
                });
                this.isLoading.next(false);
                localStorage.clear();
            })
            .catch(error => {
                this.notificationService.error("Hata", "Giriş yapma işlemi sırasında bir hata oluştu:" + error.message, { nzPlacement: "bottomRight" });
                this.isLoading.next(false);
            })
    }

    resetPassword(mail: string) {
        this.isLoading.next(true);
        this.angularFireAuth.sendPasswordResetEmail(mail)
            .then(() => {
                this.notificationService.success("Başarılı!", "Şifre sıfırlama linkiniz mail adresinize gönderilmiştir.", { nzPlacement: "bottomRight" });
                this.ngZone.run(() => {
                    this.router.navigate(['/login']);
                });
                this.isLoading.next(false);
            })
            .catch(error => {
                this.notificationService.error("Hata!", "Bir hata oluştu: " + error.message, { nzPlacement: "bottomRight" });
                this.isLoading.next(false);
            })
    }

    setUserData(person, userCredential: Person) {
        const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${person.uid}`);
        const userData: Person = {
            ...userCredential,
            isAdmin: false,
            favorites: [],
            orders: [],
            addresses: [],
            cards: [],
            personalizedTags: []
        };
        return userRef.set(userData, {
            merge: true
        });
    }

    logOut() {
        return this.angularFireAuth.signOut().then(() => {
            this.ngZone.run(() => {
                this.router.navigate(['/homepage']);
            });
            this.notificationService.success('Oturum Kapatıldı', 'Oturumunuz güvenli bir şekilde sonlandırıldı.', { nzPlacement: "bottomRight" });
            localStorage.clear();
        });
    }

    getActivePersonCredentialsById(uid: string) {
        if (uid) {
            return this.angularFirestore.collection<Person>('users').doc(uid).valueChanges();
        }
    }

    get isLoggedIn() {
        let isLoggedIn;
        this.angularFireAuth.authState.subscribe(person => {
            if (person) {
                isLoggedIn = true;
            } else {
                isLoggedIn = false;
            }
        });
        return isLoggedIn;
    }


}