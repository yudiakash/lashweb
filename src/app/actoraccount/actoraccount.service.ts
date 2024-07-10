import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActorAccountService {
  private dataSubject = new BehaviorSubject<any>(null);
  public dataActorDetails = new BehaviorSubject<any>(null);

  userId: any;
  constructor(private httpClient: HttpClient) {
    // const savedData = localStorage.getItem('data');
    // if (savedData) {
    //   this.dataSubject.next(JSON.parse(savedData));
    // }
  }
  setData(data: any) {
    // localStorage.setItem('data', JSON.stringify(data));
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.asObservable();
  }
  setBtnEnable(data: any) {
    this.dataSubject.next(data);
  }
  getBtnEnable() {
    return this.dataSubject.asObservable();
  }
  sidebarEnable(data: any) {
    this.dataSubject.next(data);
  }
  getsidebarEnable() {
    return this.dataSubject.asObservable();
  }

  setActordetails(data: any) {
    this.dataActorDetails.next(data);
  }
  getActordetails() {
    return this.dataActorDetails.asObservable();
  }

  public getLinks(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'get-links/'}${id}`);
  }

  public getActorsBodyparams(charId: number) {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-params/'}${charId}`);
  }

  public getActorAgencyParms() {
    return this.httpClient.get(`${environment.apiUrl}${'get-actor-agency-params'}`);
  }

  public getSearchItemList(data: any) {
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

    return this.httpClient.get(`${environment.apiUrl}${'get-actor-actress-by-search'}`, { params: queryParams });
  }
  // Error handling
  errorHandl(error: { error: { message: string }; status: any; message: any }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  public createLink(data: any) {
    console.log(data);
    return this.httpClient
      .post(`${environment.apiUrl}${'add-links'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public updateActorAccount(data: any, id: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'add-artist-characterastics'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public deleteLinks(id: any) {
    return this.httpClient.get(`${environment.apiUrl}${'destroy-links/'}${id}`);
  }

  getUserId() {
    const userID = localStorage.getItem('userId');
    this.userId = userID;
  }
  public updateSkillSet(skillData: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'store-actor-skills'}`, skillData)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public deleteSkillSet(skillId: any) {
    return this.httpClient.get(`${environment.apiUrl}${'delete-actor-skills/'}${skillId}`);
  }

  public updateSkillRating(skillData: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'update-actor-skill-value'}`, skillData)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  /**
   * to update image order
   *
   * @param orderData
   * @returns
   */
  public updatePicOrder(orderData: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'image-order-update'}`, orderData)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  /**
   * to update image for an artist
   *
   * @param imageData
   * @returns
   */
  public updateActorImage(imageData: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient
      .post(`${environment.apiUrl}${'add-artist-image'}`, imageData, { headers: headers })
      .pipe(retry(1), catchError(this.errorHandl));
  }

  /**
   * deleteActorImage
   * to delete n Image
   *
   * @param imageId
   * @returns
   */
  public deleteActorImage(imageId: any) {
    return this.httpClient.get(`${environment.apiUrl}${'destroy-actor-images/'}${imageId}`);
  }

  public updateActorResume(fileData: any) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient
      .post(`${environment.apiUrl}${'add-artist-resume'}`, fileData, { headers: headers })
      .pipe(retry(1), catchError(this.errorHandl));
  }

  /**
   * addVocalEmbed
   *
   * to add an audio url
   */
  public addVocalEmbed(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'add-vocal-demo'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  /**
   * addVideoEmbed
   *
   * to add an audio url
   */
  public addVideoEmbed(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'add-artist-embed'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  /**
   * deleteActorAudio
   * to delete an Audio
   *
   * @param audioId
   * @returns
   */
  public deleteActorAudio(audioId: any) {
    return this.httpClient.get(`${environment.apiUrl}${'delete-embed-vocal/'}${audioId}`);
  }

  /**
   * deleteActorVideo
   * to delete an video
   *
   * @param videoID
   * @returns
   */
  public deleteActorVideo(videoID: any) {
    return this.httpClient.get(`${environment.apiUrl}${'delete-embed-vocal/'}${videoID}`);
  }

  public updateResumeText(data: any) {
    return this.httpClient
      .post(`${environment.apiUrl}${'update-resume'}`, data)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public updateArtistPicOrder(data: any) {
    const frmData = new FormData();
    frmData.append('images', data);

    return this.httpClient
      .post(`${environment.apiUrl}${'image-order-update-position'}`, frmData)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public updateArtistVedioOrder(data: any) {
    const frmData = new FormData();
    frmData.append('vedio', data);

    return this.httpClient
      .post(`${environment.apiUrl}${'video-order-update-position'}`, frmData)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getAllPropsData() {
    return this.httpClient.get(`${environment.apiUrl}get-prop5-values`);
  }

  artistCapabilitesUpdate(id: any, data: Array<any>) {
    return this.httpClient.put(`${environment.apiUrl}save-additional-capabilities`, {
      ArtistId: id,
      values: data,
    });
  }

  getPendingChanges(completed: any, artistId: any) {
    return this.httpClient.get(`${environment.apiUrl}get-completed-incompleted-changes/${completed}/${artistId}`);
  }
  deleteUnapprovedSkills(id: any) {
    let content = JSON.stringify(id);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: content,
    };
    return this.httpClient.delete(`${environment.apiUrl}delete-notification`, options);
  }
  getAllAgencyRanks() {
    return this.httpClient.get(`${environment.apiUrl}agency-rank-list`);
  }
  public getImageBlob(data: any): Observable<Blob> {
    return this.httpClient.post(`${environment.apiUrl}${'fetch-image'}`, { image_url: data }, { responseType: 'blob' });
  }
  public updateEditImage(formaData: any) {
    return this.httpClient.post(`${environment.apiUrl}${'change-artist-image'}`, formaData);
  }
}
