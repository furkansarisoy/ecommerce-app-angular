import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {

    adminOnlyPages = '/admin' || '/admin/products' || '/admin/orders';
    isAllowed: boolean;
    isLoading = true;
    constructor(
        private router: Router,
        private angularFireAuth: AngularFireAuth,
        private authService: AuthenticationService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.angularFireAuth.authState.subscribe(person => {
            if (person?.uid) {
                this.authService.getActivePersonCredentialsById(person.uid).subscribe(person => {
                    if (!person?.isAdmin && (state.url === this.adminOnlyPages)) {
                        this.router.navigate(['/homepage']);
                        console.log(person);
                    }
                });
            } else {
                this.router.navigate(['/homepage']);
            }
        });
        return true;
    }


}