import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { ActorDetailsService } from '../actor-details/actor-details.service';
import { AuthenticationService } from '../auth/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { I18nService } from '../i18n/i18n.service';
import { environment } from '@env/environment';
import { ActorAccountService } from '@app/actoraccount/actoraccount.service';
import { RegisterService } from '@app/register/register.service';
import { SearchService } from '@app/search/search.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  authToken: any;
  userId: any;
  artistToken: any;
  currentRoute: any;
  isHome: boolean = true;
  language: any;
  dummyImage: boolean = false;
  event$;
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
  actiorDetails: any = [];
  profileStatus: any = [];
  mainImages: any = [];
  imgMain: any = [];
  unReadMessage: number | 0;
  isShowDivIf = false;
  imageReSizeUrl: any | null;
  imagebaseUrl: any | null;
  imgNewsUrl: any | null;
  artistPictures: any = [];
  data: any;
  sideImages: any = [];
  encoded: string;
  enablesideBar: any;
  disableLinks: boolean = false;
  setSide: boolean = false;
  imgOldUrl: any | null = `${environment.oldUrl}`;
  isRTL: boolean = false;

  constructor(
    private i18nService: I18nService,
    private router: Router,
    private actorDetailsService: ActorDetailsService,
    public auth: AuthenticationService,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private actorAccountService: ActorAccountService,
    private registerService: RegisterService,
    private searchService: SearchService
  ) {
    this.getToken();
    // this.getUserId();
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;
    this.imagebaseUrl = `${environment.imageUrl}`;
    // this.imgNewsUrl = `${environment.imgUrl}`;
    this.imgNewsUrl = `${environment.defaultImgUrl}`;
    this.mainImages = [];
    this.actiorDetails = '';

    this.event$ = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url;

        if (this.authRouteList.indexOf(this.currentRoute) !== -1) {
          this.isHome = false;
        } else {
          this.isHome = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.language = localStorage.getItem('language');
    this.enablesideBar = localStorage.getItem('enableSideBar');
    localStorage.getItem('emailRegister');

    if (this.enablesideBar) {
      this.disableLinks = true;
    } else if (!this.enablesideBar || this.enablesideBar == null) {
      this.disableLinks = false;
    }
    const setLnguage = localStorage.getItem('[I18nService] Language set to en-US');
    if (this.auth.isAuthenticated) {
      this.getUserId();
      this.getprofileStatus();
      this.actorAccountService.getActordetails().subscribe((data) => {
        if (data?.length <= 1) {
          this.dummyImage = true;
        } else {
          this.dummyImage = false;
        }
      });
      // this.actorAccountService.getsidebarEnable().subscribe((data) => {
      //   if (data == 'sidebarEnable') {
      //     this.disableLinks = false;
      //   }
      // });
      this.actorAccountService.getData().subscribe((data) => {
        if (data == 'sidebarEnable') {
          this.disableLinks = false;
          this.dummyImage = false;
        }
        if (data?.fileName && data != undefined) {
          this.dummyImage = false;

          this.data = data.fileName;
          this.getprofileStatus();
        }
        this.getprofileStatus();
      });
    }
    this.encoded = btoa(this.artistToken);
  }

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
    // this.getprofileStatus();
    if (localStorage.getItem('getUser') || localStorage.getItem('renderSidebar')) {
      this.getprofileStatus();
      // this.getUserId();
    }
  }

  getToken() {
    const token = localStorage.getItem('authToken');
    this.authToken = token;
  }
  getprofileStatus() {
    const artistID = localStorage.getItem('artistID');
    if (artistID) {
      this.actorDetailsService.getUserProfileStatus(artistID).subscribe((data) => {
        this.profileStatus = data['data'];
      });
    }
    localStorage.removeItem('getUser');
    localStorage.removeItem('renderSidebar');
  }
  getUserId() {
    this.enablesideBar = localStorage.getItem('enableSideBar');
    if (this.enablesideBar) {
      this.disableLinks = true;
    }
    if (!this.enablesideBar || this.enablesideBar == null) {
      this.disableLinks = false;
    }
    const userID = localStorage.getItem('userId');
    const artistID = localStorage.getItem('artistID');
    this.userId = userID;
    this.artistToken = artistID;
    let imgMain: any = [];
    this.mainImages = [];
    let imgSub: any = [];
    let demoImg: any = [];
    let subImgCount = 1;

    if (userID) {
      let encoded: string = btoa(this.artistToken);
      this.actorDetailsService.getActorDetials(encoded).subscribe((data) => {
        this.actiorDetails = data['data'];
        this.translateText();
        this.translateTextHe();
        this.artistPictures = this.actiorDetails.artistPicturesAll[0];
        // this.artistPictures = this.artistPictures.find((data: any) => {
        //   if (data.main == 1) {
        //     return data;
        //   }
        // });
        if (this.actiorDetails.artistPictures.length) {
          let imageData = this.actiorDetails.artistPictures;
          imageData.forEach(function (this: typeof imageData, value: any) {
            if (value.main == 0) {
              imgSub.push({ img: value.fileName, loc: 'sub', flag: value.flag });
              subImgCount++;
            } else {
              imgMain.push({ img: value.fileName, flag: value.flag });
            }
          });
          // let imageData = this.actiorDetails.artistPictures;
          // imageData.forEach(function (this: typeof imageData, value: any) {
          //   if (value.main == 1) {
          //     imgMain.push(value.fileName);
          //   }
          // });
          // this.mainImages = imgMain;
        }
        this.actiorDetails.artistPictures;

        if (this.actiorDetails.artistPicturesAll[0]) {
          this.sideImages = this.actiorDetails.artistPicturesAll[0].fileName;
        }
      });

      this.getUnreadMessages();
    }
    localStorage.removeItem('getUser');
    localStorage.removeItem('renderSidebar');
  }

  getUnreadMessages() {
    this.actorDetailsService.getUnreadMessages(this.userId).subscribe((data) => {
      this.unReadMessage = data['data'].length;
    });
  }

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('artistID');
    localStorage.removeItem('emailRegister');
    localStorage.removeItem('secondPopup');
    localStorage.removeItem('enableSideBar');
    localStorage.removeItem('unshowingRenewal');
    localStorage.removeItem('renew');
    localStorage.removeItem('saveBtn');
    if (this.i18nService.language == 'en-US' || this.language == 'en-US') {
      this.toastr.success('Successfully Logged out..');
    } else {
      this.toastr.success('התנתקת בהצלחה..');
    }
    this.ngZone.run(() => this.router.navigateByUrl('/login'));
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
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async translateTextHe() {
    const names = `${this.actiorDetails.FirstName} ${this.actiorDetails.LastName}`;
    const translatedText = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      names
    );
    this.actiorDetails['transEnNameHe'] = translatedText;
  }
}
