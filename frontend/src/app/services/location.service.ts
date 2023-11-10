import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private http: HttpClient) {}
  // getLocation(input: string) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('X-Goog-Api-Key', environment.placesKey);
  //   headers.append('X-Goog-FieldMask', 'places.address');
  //   this.http
  //     .post(`https://places.googleapis.com/v1/places:${input}`, {
  //       headers: headers,
  //     })
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }
}
