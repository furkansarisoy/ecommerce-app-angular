import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
    userData: any;

    constructor(private notificationService: NzNotificationService, private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore, private router: Router, private ngZone: NgZone) {
        this.angularFireAuth.authState.subscribe(person => {
            if (person) {
                this.userData = person;
                localStorage.setItem('person', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('person'));
            } else {
                localStorage.setItem('person', null);
                JSON.parse(localStorage.getItem('person'));
            }
        })
    }

    register(userCredential: Person, password: string) {
        this.angularFireAuth.createUserWithEmailAndPassword(userCredential.mail, password)
            .then(res => {
                this.notificationService.success("Başarılı", "Kayıt olma işleminiz başarı ile tamamladı.", { nzPlacement: "bottomRight" });
                this.setUserData(res.user, userCredential);
                this.ngZone.run(() => {
                    this.router.navigate(['/homepage']);
                });
            })
            .catch(error => {
                this.notificationService.error("Hata", "Kayıt olma işlemi sırasında bir hata oluştu:" + error.message, { nzPlacement: "bottomRight" });
            });
    }

    login(mail: string, password: string) {
        this.angularFireAuth.signInWithEmailAndPassword(mail, password)
            .then(() => {
                this.notificationService.success("Başarılı", "Başarıyla giriş yapıldı. Yönlendiriliyorsunuz...", { nzPlacement: "bottomRight" });
                this.ngZone.run(() => {
                    this.router.navigate(['/homepage']);
                });
            })
            .catch(error => {
                this.notificationService.error("Hata", "Giriş yapma işlemi sırasında bir hata oluştu:" + error.message, { nzPlacement: "bottomRight" });

            })
    }

    resetPassword(mail: string) {
        this.angularFireAuth.sendPasswordResetEmail(mail)
            .then(() => {
                this.notificationService.success("Başarılı!", "Şifre sıfırlama linkiniz mail adresinize gönderilmiştir.", { nzPlacement: "bottomRight" });
                this.ngZone.run(() => {
                    this.router.navigate(['/login']);
                });
            })
            .catch(error => {
                this.notificationService.error("Hata!", "Bir hata oluştu: " + error.message, { nzPlacement: "bottomRight" })
            })
    }

    get isLoggedIn(): boolean {
        const person = JSON.parse(localStorage.getItem('person'));
        return (person !== null) ? true : false;
    }

    setUserData(person, userCredential: Person) {
        const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${person.uid}`);
        const userData: Person = userCredential;
        return userRef.set(userData, {
            merge: true
        });
    }

    logOut() {
        return this.angularFireAuth.signOut().then(() => {
            localStorage.removeItem('person');
            this.ngZone.run(() => {
                this.router.navigate(['/homepage']);
            });
            this.notificationService.success('Oturum Kapatıldı', 'Oturumunuz güvenli bir şekilde sonlandırıldı.');
        })
    }

}