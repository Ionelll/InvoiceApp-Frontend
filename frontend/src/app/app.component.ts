import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'InvoiceFree';
  route: string;

  constructor(private router: Router) {
    setTimeout(() => {
      this.route = this.router.url;
      console.log(this.router.url);
    });
  }
}
