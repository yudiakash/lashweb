import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  public getlatestAuditionsList() {
    return this.httpClient.get(`${environment.apiUrl}${'get-latest-audition-list'}`);
  }

  public getActorImages() {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-images'}`);
  }
}
