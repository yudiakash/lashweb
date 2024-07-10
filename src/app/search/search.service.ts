import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  public getActorsBodyparams(charId: number) {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-params/'}${charId}`);
  }

  public getActorAgencyParms() {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-agency-params'}`);
  }

  public getSearchItemList(data: any, pageNumber: any) {
    let queryParams = new HttpParams();

    if (data) {
      console.log(data.s_name);
      queryParams = queryParams
        .set('s_name', data.s_name)
        .set('keyword', data.keyword)
        .set('gender', data.gender)
        .set('maxAge', data.maxAge)
        .set('minHeight', data.minHeight)
        .set('body', data.body)
        .set('hair_color', data.hair_color)
        .set('hair_type', data.hair_type)
        .set('eyes', data.eyes)
        .set('skin_tone', data.skin_tone)
        .set('agencyIds', data.agencyIds);
    }

    return this.httpClient
      .post(`${environment.apiUrl}${'get-actor-actress-by-search'}?pageNumber=${pageNumber}`, data)
      .pipe(retry(1), catchError(this.errorHandl));

    return this.httpClient.get(`${environment.apiUrl}${'get-actor-actress-by-search'}`, { params: queryParams });
  }

  public getActorCharacteristicByType(data: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-items-by-category-name/'}${data}`);
  }

  public getSkillList() {
    return this.httpClient.get(`${environment.apiUrl}${'get-skill-list'}`);
  }

  getAllPropsData() {
    return this.httpClient.get(`${environment.apiUrl}get-prop5-values`);
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

  async translateText(sourceLanguage: any, targetLanguage: any, name: any): Promise<string> {
    // const apiUrl = `https://www.google.com/inputtools/try/?text=${name}&input=${sourceLanguage}&script=${targetLanguage}`;
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${name}&model=base&key=${environment.translateApiKey}`;
    try {
      const response = await fetch(apiUrl);
      const translationData = await response.json();
      const translatedText = translationData[0][0][0];
      return translatedText;
    } catch (error) {
      console.error('Error:', error);
      return '';
    }
  }

  async translateHebrewNameText(sourceLanguage: any, targetLanguage: any, name: any): Promise<string> {
    // const apiUrl = `https://www.google.com/inputtools/try/?text=${name}&input=${sourceLanguage}&script=${targetLanguage}`;
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=The person's name is:${name}&model=base&key=${environment.translateApiKey}`;

    try {
      const response = await fetch(apiUrl);
      const translationData = await response.json();
      const translatedText = translationData[0][0][0];
      const translatedValue = translatedText.split(':')[1].trim();

      return translatedValue;
    } catch (error) {
      console.error('Error:', error);
      return '';
    }
  }

  public getSiteSettings() {
    return this.httpClient.get(`${environment.apiUrl}${'get-site-settings'}`);
  }
}
