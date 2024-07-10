import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NewsService } from '../news.service';
import { HomeService } from '../home.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../auth/authentication.service';
import { environment } from '@env/environment';
import { QuoteService } from './quote.service';
import { WorkshopsService } from '@app/workshops/workshops.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  closeResult: string;
  quote: string | undefined;
  isLoading = false;
  newsList: any = [];
  auditionListOther: any = [];
  auditionListFilim: any = [];
  auditionListStage: any = [];
  auditionListTv: any = [];
  auditionListCommercial: any = [];
  Object = Object;
  imgList: any = [];
  imgArray: any = [];
  intervalId: any = '';
  imagebaseUrl: any | null;
  imageReSizeUrl: any | null;
  imgUrl: any | null;
  imgNewsUrl: any | null;
  resumeUrl: string;
  randomNum1: any;
  randomNum2: any;
  fileNames: any;
  randomNum3: any = [];
  randomNum4: any = [];
  workshopList: any = [];
  translatedtext: any = [];
  language: any;
  isRTL: boolean = false;
  readMoreText: any = null;

  constructor(
    private quoteService: QuoteService,
    private newsService: NewsService,
    private homeService: HomeService,
    private modalService: NgbModal,
    public auth: AuthenticationService,
    private workshopService: WorkshopsService,
    private translate: TranslateService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';

    if (this.isRTL) {
      this.readMoreText = '...קרא עוד';
    } else {
      this.readMoreText = '... See More';
    }
  }

  ngOnInit() {
    this.imgNewsUrl = `${environment.imgNewsUrl}`;
    // this.imgUrl = `${environment.imgUrl}`;
    this.imgUrl = `${environment.defaultImgUrl}`;
    this.resumeUrl = `${environment.resumeUrl}`;
    this.imagebaseUrl = `${environment.imageUrl}`;
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;
    this.isLoading = true;
    // this.quoteService
    //   .getRandomQuote({ category: 'dev' })
    //   .pipe(
    //     finalize(() => {
    //       this.isLoading = false;
    //     })
    //   )
    //   .subscribe((quote: string) => {
    //     this.quote = quote;
    //   });
    // for news service
    this.newsService.getNewsList().subscribe((data) => {
      let response = data;
      this.newsList = response['data']['data'];
      this.translateText();
      this.translateTextHe();
    });

    // for get act
    this.homeService.getlatestAuditionsList().subscribe((data) => {
      let auditionResponse = data;
      this.auditionListOther = auditionResponse['data'].other;
      this.auditionListFilim = auditionResponse['data'].film;
      this.auditionListStage = auditionResponse['data'].stage;
      this.auditionListTv = auditionResponse['data'].tv;
      this.auditionListCommercial = auditionResponse['data'].commercial;
    });

    this.getActorImages();
    this.getWorkShopList();

    this.translate.onLangChange.subscribe((ev) => {
      if (ev['lang'] !== 'en-US') {
        this.readMoreText = '...קרא עוד';
      } else {
        this.readMoreText = '... See More';
      }
      this.getWorkShopList();
    });
  }
  getActorImages() {
    this.homeService.getActorImages().subscribe((data) => {
      let auditionResponse = data;
      this.imgArray = auditionResponse['data'];
      console.log(this.imgList);
      this.imgList = auditionResponse['data'];

      this.intervalId = setInterval(() => {
        this.randomNum1 = Math.floor(Math.random() * this.imgList.length);
        this.randomNum2 = Math.floor(Math.random() * this.imgList.length);
        this.randomNum3 = Math.floor(Math.random() * this.imgList.length);
        this.randomNum4 = Math.floor(Math.random() * this.imgList.length);

        let temp = this.imgList[this.randomNum1].fileName;
        this.imgList[this.randomNum1].fileName = this.imgList[this.randomNum2].fileName;
        this.imgList[this.randomNum2].fileName = temp;
      }, 3000);
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }
  getWorkShopList() {
    // this.workshopService.getWorkshopsList().subscribe((data) => {
    //   this.workshopList = data['data'];
    // });
    this.workshopService.getWorkshopsList().subscribe((data: any) => {
      this.workshopList = data['data'].map((item: any) => ({
        ...item,
        sht_desc: `${item.sht_desc.substring(0, 90)} <span class="linltxt" style="color:blue;">${
          this.readMoreText
        }</span>`,
      }));
    });
  }

  async translateText() {
    await Promise.all(
      this.newsList.map(async (data: any) => {
        const names = `${data.title}`;
        const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.hebrewLanguage}&tl=${environment.englishLanguage}&dt=t&q=${names}&key=${environment.translateApiKey}`;
        try {
          const response = await fetch(apiUrl);
          const translationData = await response.json();
          const translatedText = translationData[0][0][0];
          this.translatedtext = translatedText;
          data['transEnTitle'] = this.translatedtext;
        } catch (error) {
          console.error('Error:', error);
        }

        const textNames = `${data.shortText}`;
        const apiUrl1 = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.hebrewLanguage}&tl=${environment.englishLanguage}&dt=t&q=${textNames}&key=${environment.translateApiKey}`;
        try {
          const response = await fetch(apiUrl1);
          const translationData = await response.json();
          const translatedText = translationData[0][0][0];
          this.translatedtext = translatedText;
          data['transEnText'] = this.translatedtext;
        } catch (error) {
          console.error('Error:', error);
        }
      })
    );

    // await Promise.all(
    //   this.workshopList.map(async (data: any) => {
    //     const names = `${data.title}`;
    //     const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.hebrewLanguage}&tl=${environment.englishLanguage}&dt=t&q=${names}&key=${environment.translateApiKey}`;
    //     try {
    //       const response = await fetch(apiUrl);
    //       const translationData = await response.json();
    //       const translatedText = translationData[0][0][0];
    //       this.translatedtext = translatedText;
    //       data['transEnListTitle'] = this.translatedtext;
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }

    //     const textNames = `${data.sht_desc}`;
    //     const apiUrl1 = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.hebrewLanguage}&tl=${environment.englishLanguage}&dt=t&q=${textNames}&key=${environment.translateApiKey}`;
    //     try {
    //       const response = await fetch(apiUrl1);
    //       const translationData = await response.json();
    //       const translatedText = translationData[0][0][0];
    //       this.translatedtext = translatedText;
    //       data['transEnText'] = this.translatedtext;
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   })
    // );
  }

  async translateTextHe() {
    await Promise.all(
      this.newsList.map(async (data: any) => {
        const names = `${data.title}`.toLowerCase();
        const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.englishLanguage}&tl=${environment.hebrewLanguage}&dt=t&q=${names}&key=${environment.translateApiKey}`;
        try {
          const response = await fetch(apiUrl);
          const translationData = await response.json();
          const translatedText = translationData[0][0][0];
          this.translatedtext = translatedText;
          data['transHeTitle'] = this.translatedtext;
        } catch (error) {
          console.error('Error:', error);
        }

        const textNames = `${data.shortText}`;
        const apiUrl1 = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.englishLanguage}&tl=${environment.hebrewLanguage}&dt=t&q=${textNames}&key=${environment.translateApiKey}`;
        try {
          const response = await fetch(apiUrl1);
          const translationData = await response.json();
          const translatedText = translationData[0][0][0];
          this.translatedtext = translatedText;
          data['transHeText'] = this.translatedtext;
        } catch (error) {
          console.error('Error:', error);
        }
      })
    );
    // await Promise.all(
    //   this.workshopList.map(async (data: any) => {
    //     let title = data.title.toLowerCase();
    //     if (title.includes('eyt')) {
    //       title = title.replace('eyt', 'איט');
    //     }
    //     const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.englishLanguage}&tl=${environment.hebrewLanguage}&dt=t&q=${title}&key=${environment.translateApiKey}`;
    //     try {
    //       const response = await fetch(apiUrl);
    //       const translationData = await response.json();
    //       const translatedText = translationData[0][0][0];
    //       this.translatedtext = translatedText.toLowerCase();
    //       data['transHeListTitle'] = this.translatedtext;
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }

    //     const textNames = `${data.sht_desc}`;
    //     const apiUrl1 = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.englishLanguage}&tl=${environment.hebrewLanguage}&dt=t&q=${textNames}&key=${environment.translateApiKey}`;
    //     try {
    //       const response = await fetch(apiUrl1);
    //       const translationData = await response.json();
    //       const translatedText = translationData[0][0][0];
    //       this.translatedtext = translatedText;
    //       data['transHeText'] = this.translatedtext;
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   })
    // );
  }
}
