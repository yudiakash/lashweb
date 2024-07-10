import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CastingCallDetailsService {
  constructor(private httpClient: HttpClient) {}

  public getCastingCallDetailsById(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-audition-deatils-with-roles-by-id/'}${id}`);
  }
}
