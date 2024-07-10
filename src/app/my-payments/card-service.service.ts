import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private httpClient: HttpClient) {}

  public addCardDetails(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'add-credit-card-details'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public getcardList(userid: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-card-no/'}${userid}`);
  }

  public getCardDetail(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-card-details/'}${id}`);
  }

  public deleteCard(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'delete-credit-card-details/'}${id}`);
  }

  public getPaymentHistory(userid: any) {
    return this.httpClient.get(`${environment.apiUrl}${'patment-history/'}${userid}`);
  }

  public getDefaultCard(userid: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-default-card/'}${userid}`);
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
}
