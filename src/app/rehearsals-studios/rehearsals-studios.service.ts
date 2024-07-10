import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class RehearsalsStudiosService {
  constructor(private httpClient: HttpClient) {}

  public getRehearsalsStudiosList() {
    return this.httpClient.get(`${environment.apiUrl}${'get-rehersal-studio-list'}`);
  }
}
