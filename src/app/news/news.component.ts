import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { environment } from '@env/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SearchService } from '@app/search/search.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  imageReSizeUrl: any | null;
  imgUrl: any | null;
  imgNewsUrl: any | null;
  newsList: any = [];
  safeHtmlContent: any;
  language: any;
  isRTL: boolean = false;

  constructor(
    private newsService: NewsService,
    private searchService: SearchService,
    private sanitizer: DomSanitizer
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.imgNewsUrl = `${environment.imgNewsUrl}`;
    //this.imgUrl = `${environment.imgUrl}`;
    this.imgUrl = `${environment.defaultImgUrl}`;
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;
    this.newsService.getNewsList().subscribe((data) => {
      let response = data;
      this.newsList = response['data']['data'];
      // let htmlBody = this.newsList.shortt;
      // const parser = new DOMParser();
      // const htmlDoc = parser.parseFromString(htmlBody, 'text/html');
      // const contentEditableElems = htmlDoc.querySelectorAll('[contenteditable]');
      // contentEditableElems.forEach((elem) => elem.removeAttribute('contenteditable'));
      // htmlBody = htmlDoc.documentElement.innerHTML;
      // this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(htmlBody);
      //this.translateText();
      //this.translateTextHe();
    });
  }
  async translateText() {
    await Promise.all(
      this.newsList.map(async (data: any) => {
        const names = `${data.title}`;
        const translatedText = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          names
        );
        data['translatedEnName'] = translatedText;

        const shortText = `${data.shortText}`;
        const translatedTextt = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          shortText
        );
        data['translatedEnText'] = translatedTextt;
      })
    );
  }
  async translateTextHe() {
    await Promise.all(
      this.newsList.map(async (data: any) => {
        const names = `${data.title}`;
        const translatedText = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          names
        );
        data['translatedHeName'] = translatedText;

        const shortText = `${data.shortText}`;
        const translatedTextt = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          shortText
        );
        data['translatedHeText'] = translatedTextt;
      })
    );
  }
}
