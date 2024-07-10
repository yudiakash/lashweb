import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart, Event as NavigationEvent } from '@angular/router';
import { ActorDetailsService } from '@app/actor-details/actor-details.service';
import { ActorAccountService } from '@app/actoraccount/actoraccount.service';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { SearchService } from '@app/search/search.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;

  authRouteList = [
    '/my-messages',
    '/my-payments',
    '/my-account-details',
    '/my-subscription',
    '/tell-us-more',
    '/my-notifications',
    '/actor-account',
    '/payment-history',
  ];
  isHome: boolean = true;
  event$: any;
  artistToken: any;
  currentRoute: any;
  isShowDivIf = false;
  profileStatus: any = [];
  unReadMessage: number | 0;
  userId: any;
  actiorDetails: any = [];
  mainImages: any = [];
  imgNewsUrl = `${environment.defaultImgUrl}`;
  imageReSizeUrl = `${environment.imgBaseUrl}`;
  imagebaseUrl = `${environment.imageUrl}`;
  dummyImage: boolean = false;
  data: any;
  isRTL: boolean = false;
  language: any;
  artistPictures: any;
  encodeId: any;

  constructor(
    private router: Router,
    public auth: AuthenticationService,
    private credentialsService: CredentialsService,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private actorDetailsService: ActorDetailsService,
    private actorAccountService: ActorAccountService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';

    this.getUserId();
    this.getprofileStatus();
    this.checkCurrentRoute();
    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url;
        this.updateIsHome();
      }
    });
    this.actorAccountService.getActordetails().subscribe((data) => {
      if (data?.length <= 1) {
        this.dummyImage = true;
      } else {
        this.dummyImage = false;
      }
    });

    this.actorAccountService.getData().subscribe((data) => {
      this.data = data.fileName;
      this.getprofileStatus();
    });
  }

  getprofileStatus() {
    const artistID = localStorage.getItem('artistID');
    if (artistID) {
      this.actorDetailsService.getUserProfileStatus(artistID).subscribe((data) => {
        this.profileStatus = data['data'];
      });
    }
  }
  getUnreadMessages() {
    this.actorDetailsService.getUnreadMessages(this.userId).subscribe((data) => {
      this.unReadMessage = data['data'].length;
    });
  }
  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('artistID');
    this.toastr.success('Successfully Logged out..');

    this.ngZone.run(() => this.router.navigateByUrl('/login'));
  }

  ngOnDestroy() {
    if (this.event$) {
      this.event$.unsubscribe();
    }
  }

  private checkCurrentRoute() {
    this.currentRoute = this.router.url; // Get the current route
    this.updateIsHome();
  }

  private updateIsHome() {
    this.isHome = !this.authRouteList.includes(this.currentRoute);
  }

  private getUserId() {
    const userID = localStorage.getItem('userId');
    const artistID = localStorage.getItem('artistID');
    this.userId = userID;
    this.artistToken = artistID;
    this.encodeId = btoa(this.artistToken);

    if (userID) {
      let encoded: string = btoa(this.artistToken);
      this.actorDetailsService.getActorDetials(encoded).subscribe((data) => {
        this.actiorDetails = data['data'];
        this.artistPictures = this.actiorDetails.artistPicturesAll[0];
        this.translateText();
        this.translateTextHe();
      });
    }
  }

  async translateText() {
    const names = `${this.actiorDetails.FirstName} ${this.actiorDetails.LastName}`;
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.hebrewLanguage}&tl=${environment.englishLanguage}&dt=t&q=שם:${names}&key=${environment.translateApiKey}`;
    try {
      const response = await fetch(apiUrl);
      const translationData = await response.json();
      const translatedText = translationData[0][0][0];
      const translatedValue = translatedText.split(':')[1].trim();
      this.actiorDetails['transNameEn'] = translatedValue;
    } catch (error) {}
  }

  async translateTextHe() {
    const names = `${this.actiorDetails.FirstName} ${this.actiorDetails.LastName}`;
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.englishLanguage}&tl=${environment.hebrewLanguage}&dt=t&q=Name:${names}&key=${environment.translateApiKey}`;
    try {
      const response = await fetch(apiUrl);
      const translationData = await response.json();
      const translatedText = translationData[0][0][0];
      const translatedValue = translatedText.split(':')[1].trim();
      this.actiorDetails['transEnNameHe'] = translatedValue;
    } catch (error) {}
  }
}
