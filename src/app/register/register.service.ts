import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  public createArtist(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'actor-register'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public updatePartialArtist(data: any, id: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'update-actor-register'}/${id}`, data)
      .pipe(retry(0), catchError(this.errorHandl));
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

  public getPartialArtist(idAct: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-partially-created-actor-details/'}${idAct}`);
  }
  public createDirectors(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'create-caster'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public getCountryList() {
    return this.httpClient.get(`${environment.apiUrl}${'country-list'}`);
  }
}
