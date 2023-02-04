import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.scss'],
})
export class SearchCompanyComponent implements OnInit {
  searchControl = new FormControl();
  options: string[] = [];

  filteredoptions = new Observable<string[]>();
  private _filter(value: string): string[] {
    if (value.length > 0) {
      const filterValue = value;
      return this.options.filter((option) =>
        option.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else return [];
  }

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.clientList();
    this.api.clients$.subscribe((res) => {
      this.options = res;
    });
    this.filteredoptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  onSearchClient() {
    this.api.searchClient(this.searchControl.value);
  }
}
