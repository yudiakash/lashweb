import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkshopsService {
  constructor(private httpClient: HttpClient) {}

  public getWorkshopsList() {
    return this.httpClient.get(`${environment.apiUrl}${'get-workshop-list'}`);
  }

  public getWorkshopsScheduleByWorkshop(data: string) {
    return this.httpClient.get(`${environment.apiUrl}${'get-workshop-schedule-list/'}${data}`);
  }

  public getWorkshopsDetails(data: string) {
    return this.httpClient.get(`${environment.apiUrl}${'get-workshop-details/'}${data}`);
  }

  public getWorkshopsRecomByWorkshop(data: string) {
    return this.httpClient.get(`${environment.apiUrl}${'get-workshop-recommendation-details/'}${data}`);
  }
  public createWorkshop(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'register-workshop'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  public workshopPayment(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'workshop-payment'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  public AddCouponCode(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'apply-coupon-code'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  public GetLiveCode(data: string) {
    return this.httpClient.get(`${environment.apiUrl}${'get-live-code/'}${data}`);
  }
  public DeleteLiveCode(data: string) {
    return this.httpClient.get(`${environment.apiUrl}${'delete-live-code/'}${data}`);
  }

  public workshopPaymentConfirmation(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'workshop-payment-confirmation'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

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
