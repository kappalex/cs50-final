import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  authSub
  signedIn

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      this.authSub = this.authService.getAuthState().subscribe((res) => {
        this.signedIn = res;
      })
      if (!this.signedIn) {
        this.router.navigateByUrl('/home');
      }

    return this.signedIn;
  }
  
}
