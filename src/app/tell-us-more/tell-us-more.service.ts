import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TellUsMoreService {
  userId: any;
  artistId: any;
  constructor(private httpClient: HttpClient) {
    this.getUserId();
    this.getArtistId();
  }

  public getTellUsMoreById() {
    let id = this.userId;
    return this.httpClient.get(`${environment.apiUrl}${'get-ability-text-details-by-artist/'}${id}`);
  }

  public updateTellUsMore(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'update-actor-ability-text'}`, data)
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

  public getActorDetials(data: string) {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-details-by-id/'}${data}`);
  }

  getArtistId() {
    const artistID = localStorage.getItem('artistID');
    this.artistId = artistID;
  }

  getUserId() {
    const userID = localStorage.getItem('userId');
    this.userId = userID;
  }
}
