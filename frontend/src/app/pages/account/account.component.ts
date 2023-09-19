import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  constructor(private user: AccountService, private router: Router) {}

  public userSub = new Subscription();
  public userDetails: User;
  public isloggedin: boolean = false;

  ngOnInit() {
    this.userSub = this.user.getUser().subscribe((res) => {
      if (res) this.userDetails = res;
      else this.router.navigate(['/login']);
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
