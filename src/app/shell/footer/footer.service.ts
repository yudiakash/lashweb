import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor(private httpClient: HttpClient) {}
  public storeSubscriptions(data: any) {
    // const formData = new FormData();
    // formData.set("email",id);

    return this.httpClient.post(`${environment.apiUrl}${'store-subscriptions'}`, data);
  }

  public sendSlackMessage(data: any) {
    return this.httpClient.post(`${environment.apiUrl}${'send-chatbot-message'}`, data);
  }
}
