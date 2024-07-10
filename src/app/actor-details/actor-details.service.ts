import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ActorDetailsService {
  constructor(private httpClient: HttpClient) {}

  public getActorDetials(data: string) {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-details-by-id/'}${data}`);
  }

  public getUnreadMessages(data: string) {
    return this.httpClient.post(`${environment.apiUrl}${'get-unread-messages'}`, { id: data, pageSize: '25' });
  }

  public updateSelectedPlan(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'update-payment-plan'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public updatePaymentPlan(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'add-payment'}`, data)
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

  public getCurrentPlanDetails(userId: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-current-plan/'}${userId}`);
  }
  public getUserProfileStatus(userId: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-profile-completion/'}${userId}`);
  }

  public reNewPlanDetails(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'renew-subscription-plan'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public varifyResetPasswordEmail(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'verify-reset-password-email'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public resetPasswordEmail(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'reset-password-email'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public getAllPaymentOptions() {
    return this.httpClient.get(`${environment.apiUrl}${'get-all-payment-options'}`);
  }

  public getPaymentPlanById(idPlan: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-payment-options-by-id/'}${idPlan}`);
  }
  public verifyResetusernameEmail(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'verify-reset-username-email'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  public resetUsernameEmail(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'reset-username-email'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }
}
