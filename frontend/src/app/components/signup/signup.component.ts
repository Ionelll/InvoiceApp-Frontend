import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  toggle = false;
  constructor(private userapi: AccountService) {}
  register(ngform: NgForm) {
    if (ngform.valid) {
      this.userapi.register(ngform.value);
    } else return;
  }
}
