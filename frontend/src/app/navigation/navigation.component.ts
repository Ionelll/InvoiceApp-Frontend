import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  user:User=JSON.parse(localStorage.getItem('User'))
}
