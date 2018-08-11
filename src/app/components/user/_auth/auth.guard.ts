import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  // Gets the current time
  private now = new Date();

  constructor(private router : Router){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

    if ((sessionStorage.getItem('userToken') != null) && (this.now.getTime() < Number(sessionStorage.getItem('expires')))  ) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      //this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
