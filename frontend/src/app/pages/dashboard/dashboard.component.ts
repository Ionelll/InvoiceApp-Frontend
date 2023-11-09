import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.navigateByUrl('dashboard/company');
  }
}
