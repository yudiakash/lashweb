import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from '@app/search/search.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
})
export class NewsDetailsComponent implements OnInit {
  newsDetails: any = [];
  id: number = 0;
  imgNewsUrl: any | null;
  safeHtmlContent: any;
  language: any;
  isRTL: boolean = false;

  constructor(
    private newsService: NewsService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getNewsDetailsById();
    this.imgNewsUrl = `${environment.imgNewsUrl}`;
  }

  // for getNewsDetailsById
  getNewsDetailsById() {
    this.newsService.getNewsDetailsById(this.id).subscribe((data) => {
      this.newsDetails = data['data'];
      let htmlBody = this.newsDetails.longt;
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(htmlBody, 'text/html');
      htmlBody = htmlDoc.documentElement.innerHTML;
      this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(htmlBody);
      console.log(this.newsDetails);
      // this.translateTextHe();
      //sthis.translateTextEn();
    });
  }

  async translateTextEn() {
    const names = `${this.newsDetails.title}`.toLowerCase();
    const translatedText = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      names
    );
    this.newsDetails['translatedNameEn'] = translatedText;

    // const htmlBody = this.newsDetails.longt;
    // const textToTranslate = htmlBody
    //   .replace(/<[^>]+>/g, ' ')
    //   .replace(/\s+/g, ' ')
    //   .replace(/&nbsp;/g, ' ');
    // const translatedText1 = await this.searchService.translateText(
    //   environment.hebrewLanguage,
    //   environment.englishLanguage,
    //   textToTranslate
    // );
    // const translatedHTML = htmlBody.replace(/>(.*?)</g, function (match: any, contents: any) {
    //   return match.replace(contents, translatedText1);
    // });

    // this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(translatedHTML);
    // this.newsDetails['transEnContnt'] = this.safeHtmlContent;
  }

  async translateTextHe() {
    const names = `${this.newsDetails.title}`.toLowerCase();
    const translatedText = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      names
    );
    this.newsDetails['translatedNameHe'] = translatedText;

    // const htmlBody = this.newsDetails.longt;
    // const textToTranslate = htmlBody
    //   .replace(/<[^>]+>/g, ' ')
    //   .replace(/\s+/g, ' ')
    //   .replace(/&nbsp;/g, ' ');
    // const translatedText1 = await this.searchService.translateText(
    //   environment.englishLanguage,
    //   environment.hebrewLanguage,
    //   textToTranslate
    // );
    // const translatedHTML = htmlBody.replace(/>(.*?)</g, function (match: any, contents: any) {
    //   return match.replace(contents, translatedText1);
    // });
    // this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(translatedHTML);
    // this.newsDetails['transHeContnt'] = this.safeHtmlContent;
  }
}
