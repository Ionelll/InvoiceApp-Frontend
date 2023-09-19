import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ClientService } from '../../../services/invoice-services/client.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-client',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss'],
})
export class SearchClientComponent implements OnInit {
  constructor(private client: ClientService) {}

  public searchControl = new FormControl();
  public clientList: string[];
  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => {
        if (this.searchControl.value && this.searchControl.value.length >= 3) {
          this.client.setClients(value);
        }
      });
    this.client.getClients().subscribe((response) => {
      this.clientList = response;
    });
  }
  onSearchClient() {
    this.client.searchClient(this.searchControl.value);
  }
}
