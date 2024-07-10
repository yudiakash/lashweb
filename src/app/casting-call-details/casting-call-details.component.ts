import { Component, OnInit } from '@angular/core';
import { CastingCallDetailsService } from '../casting-call-details/casting-call-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MyMessagesService } from '../my-messages/my-messages.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../auth/authentication.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from '@app/search/search.service';

@Component({
  selector: 'app-casting-call-details',
  templateUrl: './casting-call-details.component.html',
  styleUrls: ['./casting-call-details.component.scss'],
})
export class CastingCallDetailsComponent implements OnInit {
  castingDetails: any = [];
  id: number = 0;
  open: boolean = true;
  disabled: boolean = true;
  auditionId: string;
  artistToken: any;
  auditionUrl: any | null;
  imageReSizeUrl: any | null;
  language: any;
  isRTL: boolean = false;

  constructor(
    public auth: AuthenticationService,
    private myMessagesService: MyMessagesService,
    private toastr: ToastrService,
    private castingCallDetailsService: CastingCallDetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private searchService: SearchService
  ) {}
  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    //this.id = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((params) => {
      this.id = params['details'];
    });
    this.getCastingCallDetailsById();
    this.getUserId();
  }

  getUserId() {
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;
    this.auditionUrl = `${environment.auditionUrl}`;
    const artistID = localStorage.getItem('artistID');
    console.log('artistID....', artistID);
    this.artistToken = artistID;
    console.log('this.artistToken', this.artistToken);
  }

  // for getting casting call details
  getCastingCallDetailsById() {
    this.castingCallDetailsService.getCastingCallDetailsById(this.id).subscribe((data) => {
      if (data['status'] == '401') {
        this.router.navigateByUrl('/casting-calls');
      }
      this.castingDetails = data['data'][0];
      this.auditionId = this.castingDetails['auditionId'];
      this.translateTextEn();
      this.translateTextHe();
    });
  }
  applyCasting(id: any) {
    let auditionid = Number(this.auditionId);
    const artistToken = Number(this.artistToken);

    if (this.auth.isAuthenticated) {
      this.myMessagesService.applyCastingById(artistToken, auditionid, id).subscribe((data: any) => {
        if (data['status'] == 200) {
          const successMessage = this.translate.instant('Successfully applied');
          this.toastr.success(successMessage);
        } else if (data['status'] != 200) {
          const successMessage = this.translate.instant(data['message']);
          this.toastr.error(successMessage);
        } else {
          const successMessage = this.translate.instant('Error occurred. Please try again!');
          this.toastr.error(successMessage);
        }
      });
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  async translateTextEn() {
    const names = `${this.castingDetails.auditionTypeName}`.toLowerCase();
    const translatedText = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      names
    );
    this.castingDetails['transAuditionEn'] = translatedText;

    const title = `${this.castingDetails.inviteMsgTitle}`.toLowerCase();
    const translatedText1 = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      title
    );
    this.castingDetails['transMsgEn'] = translatedText1;

    const description = `${this.castingDetails.auditionDescription}`.toLowerCase();
    const translatedText2 = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      description
    );
    this.castingDetails['transDescEn'] = translatedText2;

    const auditionType = `${this.castingDetails.auditionTypeName}`.toLowerCase();

    const translatedText3 = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      auditionType
    );
    this.castingDetails['tranTypeEn'] = translatedText3;

    const auditionLocation = `${this.castingDetails.auditionLocation}`.toLowerCase();
    const translatedText4 = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      auditionLocation
    );
    this.castingDetails['auditionLoctnEn'] = translatedText4;

    const auditionBudgetName = `${this.castingDetails.auditionBudgetName}`.toLowerCase();
    const translatedText5 = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      auditionBudgetName
    );
    this.castingDetails['audBudgetEn'] = translatedText5;
  }

  async translateTextHe() {
    const names = `${this.castingDetails.auditionTypeName}`.toLowerCase();
    const translatedText = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      names
    );
    this.castingDetails['transAuditionHe'] = translatedText;

    const title = `${this.castingDetails.inviteMsgTitle}`.toLowerCase();
    const translatedText1 = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      title
    );
    this.castingDetails['transMsgHe'] = translatedText1;

    const description = `${this.castingDetails.auditionDescription}`.toLowerCase();
    const translatedText2 = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      description
    );
    this.castingDetails['transDescHe'] = translatedText2;

    const auditionType = `${this.castingDetails.auditionTypeName}`.toLowerCase();
    const translatedText3 = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      auditionType
    );
    this.castingDetails['tranTypeHe'] = translatedText3;

    const auditionLocation = `${this.castingDetails.auditionLocation}`.toLowerCase();
    const translatedText4 = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      auditionLocation
    );
    this.castingDetails['auditionLoctnHe'] = translatedText4;

    const auditionBudgetName = `${this.castingDetails.auditionBudgetName}`.toLowerCase();
    const translatedText5 = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      auditionBudgetName
    );
    this.castingDetails['audBudgetHe'] = translatedText5;
  }
}
