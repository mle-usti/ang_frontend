import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGaurdGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private location: Location
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this._authService.getToken())
      {
        this.location.back()
        return false;
      }
      // this._router.navigate(['/login']);
      // this.location.back()
    return true;
    
  }
  
}
