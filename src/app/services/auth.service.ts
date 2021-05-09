import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config/app.config';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public vg: AppConfig) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.vg.connected) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}