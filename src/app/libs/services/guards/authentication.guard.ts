import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private angularFireAuth: AngularFireAuth
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.angularFireAuth.authState.subscribe(person => {
            if (person && (state.url === '/login' || '/register' || '/reset-password')) {
                this.router.navigate(['/homepage']);
                return false;
            } else if (person == null && !(state.url === '/register' || '/reset-password')) {
                this.router.navigate(['/login']);
                return false;
            }
        });
        return true;
    }

}