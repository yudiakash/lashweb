import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MyaccountService {
  userId: any;

  constructor(private httpClient: HttpClient) {
    this.getUserId();
  }

  public getMyAccountDetailsById() {
    let id = localStorage.getItem('userId');
    return this.httpClient.get(`${environment.apiUrl}${'actor-details/'}${id}`);
  }

  public updateArtist(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'update-actor-details-by-id'}`, data)
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
  getPendingChanges(completed: any, artistId: any) {
    return this.httpClient.get(`${environment.apiUrl}get-completed-incompleted-changes/${completed}/${artistId}`);
  }
}
