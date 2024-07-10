import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CastingCallsService {
  constructor(private httpClient: HttpClient) {}

  public getCastingCallsList(data: any, pageNumber: any) {
    let queryParams = new HttpParams();
    if (data) {
      queryParams = queryParams
        .set('Keyword', data.Keyword)
        .set('catName', data.catName)
        .set('gender', data.gender)
        .set('minAge', data.minAge)
        .set('maxAge', data.maxAge);
    }

    return this.httpClient.get(`${environment.apiUrl}${'get-casting-details-by-search'}?pageNumber=${pageNumber}`, {
      params: queryParams,
    });
  }

  public getCastingCallCategories() {
    return this.httpClient.get(`${environment.apiUrl}${'get-audition-type'}`);
  }
}
