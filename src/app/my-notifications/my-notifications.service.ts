import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MyNotifiactionsService {
  userId: any;
  constructor(private httpClient: HttpClient) {
    this.getUserId();
  }

  public updateNotifications(data: any) {
    console.log('....data', data);
    return this.httpClient
      .post(`${environment.apiUrl}${'notification-update-by-messages'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
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

  getUserId() {
    const userID = localStorage.getItem('userId');
    this.userId = userID;
  }
}
