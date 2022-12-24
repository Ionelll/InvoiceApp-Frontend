import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private api:ApiService){}
  login(ngform:NgForm){
    let form=new FormData()
    form.append('username',ngform.value.email)
    form.append('password',ngform.value.password)
    this.api.login(form)
  }
  signup(ngform:NgForm){
    let form=new FormData()
    form.append('email',ngform.value.email)
    form.append('password',ngform.value.password)
    this.api.register(form)
  }
}
