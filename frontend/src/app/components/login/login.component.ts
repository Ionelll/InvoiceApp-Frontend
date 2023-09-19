import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private userapi: AccountService) {}
  login(ngform: NgForm) {
    let form = new FormData();
    if (ngform.valid) {
      form.append('email', ngform.value.email);
      form.append('password', ngform.value.password);
      this.userapi.login(form);
    } else return;
  }
}
