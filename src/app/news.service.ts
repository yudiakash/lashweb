import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  public getNewsList() {
    return this.httpClient.get(`${environment.apiUrl}${'get-news-data?pageNumber=0&pageSize=30'}`);
  }

  public getNewsDetailsById(id: number) {
    return this.httpClient.get(`${environment.apiUrl}${'get-news-list/'}${id}`);
  }
}
