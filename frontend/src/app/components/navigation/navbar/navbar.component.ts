import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CreateInvoice } from '../../../services/invoice-services/articles.service';
import { AccountService } from '../../../services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  private user = new Subscription();
  animif1 = false;
  companyValidation: boolean;
  token: boolean = false;

  constructor(
    private invoice: CreateInvoice,
    private account: AccountService
  ) {}
  ngOnInit(): void {
    this.account.isLoggedIn();
    this.user = this.account.getUser().subscribe((res) => {
      if (res) {
        this.token = true;
      }
    });
    this.account.getCompanyValidation().subscribe((res) => {
      this.companyValidation = res;
    });
  }
  export() {
    window.print();

    window.location.reload();
  }
  clearTable() {
    this.invoice.clearTable();
  }
  signOut() {
    this.account.logout();
  }

  ngAfterViewInit(): void {
    this.animif1 = true;
  }
  ngOnDestroy() {
    this.user.unsubscribe();
  }
}
