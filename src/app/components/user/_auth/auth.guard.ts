import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    // Gets the current time
    let now = new Date();

    if ((localStorage.getItem('userToken') != null) && (now.getTime() < Number(localStorage.getItem('expires')))  ) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      //this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
