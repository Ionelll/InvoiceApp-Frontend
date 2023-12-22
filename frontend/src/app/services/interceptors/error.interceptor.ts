import {
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.error.message) {
          case 'Token expired':
            localStorage.removeItem('token');
        }
        return of({ error: true, message: error.error.message });
      })
    );
  }
}
