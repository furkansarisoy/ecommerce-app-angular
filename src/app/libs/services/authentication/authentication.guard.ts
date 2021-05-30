import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private angularFireAuth: AngularFireAuth
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.angularFireAuth.authState.subscribe(person => {
            if (person && (this.router.url === '/login' || '/register' || '/reset-password')) {
                this.router.navigate(['/homepage']);
            }
            if (person == null) {
                this.router.navigate(['/login']);
            }
        });
        return true;
    }

}