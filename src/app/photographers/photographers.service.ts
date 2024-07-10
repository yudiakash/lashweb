import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotographersService {
  constructor(private httpClient: HttpClient) {}

  public getPhotographersList() {
    return this.httpClient.get(`${environment.apiUrl}${'top-photographer-list'}`);
  }
}
