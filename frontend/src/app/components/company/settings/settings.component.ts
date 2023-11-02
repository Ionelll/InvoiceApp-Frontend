import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private account: AccountService) {}
  toggle = true;
  company: boolean;
  ngOnInit(): void {
    this.account.getUser().subscribe((res) => {
      if (res) {
        this.company = true;
      }
    });
  }
}
