import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable()
export class loggedInGuard  {
  constructor(private _router: Router, private user: AccountService) {}
  private token: boolean;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //check some condition
    this.user.getUser().subscribe((res) => {
      if (res) this.token = true;
      else this.token = false;
    });
    if (!this.token) {
      this._router.navigate(['/login']);
      return false;
    } else return true;
  }
}
