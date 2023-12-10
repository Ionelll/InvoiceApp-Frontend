import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(private account: AccountService) {}
  userSub = new Subscription();
  token: boolean;

  ngOnInit(): void {
    this.userSub = this.account.getUser().subscribe((res) => {
      if (res) {
        this.token = true;
      }
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout() {
    this.account.logout();
  }
}
