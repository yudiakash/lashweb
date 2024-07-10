import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MyMessagesService {
  private authToken: any;
  private userId: any;

  constructor(private httpClient: HttpClient) {
    this.getToken();
    this.getUserId();
  }

  public getMessageTypes() {
    return this.httpClient.get(`${environment.apiUrl}${'get-message-type'}`);
  }

  public getMessageList(id: any, data: any, pageNumber: any) {
    this.userId = localStorage.getItem('userId');

    var myFormData = new FormData();
    if (!id) {
      // return this.httpClient.get(`${environment.apiUrl}${'get-messages-by-artist/'}${this.userId}`);
      if (data) {
        myFormData.append('id', this.userId);
        myFormData.append('title', data);
        myFormData.append('pageNumber', pageNumber);
        myFormData.append('pageSize', '10');

        return this.httpClient.post(`${environment.apiUrl}${'get-messages-by-artist'}`, myFormData);
      }
      myFormData.append('id', this.userId);
      myFormData.append('pageNumber', pageNumber);
      myFormData.append('pageSize', '10');
      return this.httpClient.post(`${environment.apiUrl}${'get-messages-by-artist'}`, myFormData);
    } else {
      if (data) {
        myFormData.append('title', data);
        myFormData.append('id', this.userId);
        myFormData.append('msgType', id);
        myFormData.append('pageNumber', pageNumber);
        myFormData.append('pageSize', '10');
        return this.httpClient.post(`${environment.apiUrl}${'get-message-by-type'}`, myFormData);
      }
      myFormData.append('id', this.userId);
      myFormData.append('msgType', id);
      myFormData.append('pageNumber', pageNumber);
      myFormData.append('pageSize', '10');
      return this.httpClient.post(`${environment.apiUrl}${'get-message-by-type'}`, myFormData);
    }
  }

  public getMessageDetailsById(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-messages-body/'}${id}`);
  }

  public deleteMessageById(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'delete-actor-message/'}${id}`);
  }

  public readMessageById(id: any) {
    let body = new HttpParams();
    body = body.set('Id', id);

    return this.httpClient
      .post(`${environment.apiUrl}${'message-read-update'}`, body)
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
  getToken() {
    const token = localStorage.getItem('authToken');
    this.authToken = token;
  }
  getUserId() {
    const userID = localStorage.getItem('userId');
    this.userId = userID;
  }
  // public getreadMessages(msgId:any) {
  //   return this.httpClient.update(`${environment.apiUrl}${'message-read-update'},{Id:msgId});
  // }

  public getUnreadMessages(userId: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-unread-message-by-type/'}${userId}`);
  }
  public applyCastingById(artistid: any, auditionid: any, id: any) {
    return this.httpClient.post(`${environment.apiUrl}${'apply-for-audition'}`, {
      ArtistId: artistid,
      AuditionId: auditionid,
      PartId: id,
    });
  }
  public getAppliedRoleIds(userId: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-roles-applied-artist/'}${userId}`);
  }
}
