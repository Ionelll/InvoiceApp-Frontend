import { trigger, transition, animate, style } from '@angular/animations';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { CreateInvoice } from '../../services/invoice-services/articles.service';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  public user = new Subscription();
  animif1 = false;
  animif2 = false;
  vatpercent = '';
  scrollTop = window.scrollY;
  hideNav = true;
  hideButtons = false;
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
  }
  export() {
    window.print();

    window.location.reload();
  }
  clearTable() {
    this.invoice.clearTable();
  }

  ngAfterViewInit(): void {
    this.animif1 = true;
  }
  ngOnDestroy() {
    this.user.unsubscribe();
  }
}
