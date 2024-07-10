import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private dataSubject = new BehaviorSubject<any>(null);
  userId: any;
  artistId: any;
  constructor(private httpClient: HttpClient) {}
  setData(data: any) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }

  public tranzilaPayment(data: any) {
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
