import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authToken: string | null;

  constructor(public http: HttpClient) {
    this.getToken();
  }
  login(url: any, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    return this.http.post(url, data, { headers: headers }).pipe(catchError(this.errorHandl));
  }

  getToken() {
    const token = localStorage.getItem('authToken');
    // console.log(token);
    this.authToken = token;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('UserID');
    localStorage.removeItem('userId');
    localStorage.removeItem('artistID');

    localStorage.clear();
  }

  // Error handling
  errorHandl(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => {
      return errorMessage;
    });
  }

  get isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }
}
