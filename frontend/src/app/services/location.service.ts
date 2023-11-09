import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private http: HttpClient) {}
  // getLocation(input: string) {
  //   this.http
  //     .get(
  //       `${
  //         environment.locationUrl +
  //         input +
  //         '&key=' +
  //         environment.placesKey +
  //         '&types=adress'
  //       }`
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }
}
