import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { PhotographersService } from '../photographers/photographers.service';
import { SearchService } from '@app/search/search.service';
import { environment } from '@env/environment';
@Pipe({
  name: 'shortenUrl',
})
export class ShortenUrlPipe implements PipeTransform {
  transform(value: string, maxLength: number = 20): string {
    if (value.length <= maxLength) {
      return value;
    } else {
      return value.substr(0, maxLength) + '...';
    }
  }
}
@Component({
  selector: 'app-photographers',
  templateUrl: './photographers.component.html',
  styleUrls: ['./photographers.component.scss'],
})
export class PhotographersComponent implements OnInit {
  photographersList: any = [];
  language: any;
  isRTL: boolean = false;
  imageReSizeUrl: any | null;
  imagebaseUrl: any | null;

  constructor(private photographersService: PhotographersService, private searchService: SearchService) {
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;
    this.imagebaseUrl = `${environment.imgNewsUrl}`;
  }
  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }
  ngOnInit(): void {
    this.photographersService.getPhotographersList().subscribe((data) => {
      let response = data;
      this.photographersList = response['data'];
      this.translateText();
      this.translateTextHe();
    });
  }

  async translateText() {
    await Promise.all(
      this.photographersList.map(async (data: any) => {
        const names = `${data.the_title}`;
        const translatedText = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          names
        );
        data['translatedEnName'] = translatedText;

        const shortText = `${data.the_content}`;
        const translatedTextt = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          shortText
        );
        data['translatedEnText'] = translatedTextt;

        const excerpt = `${data.the_excerpt}`;
        const translatedText2 = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          excerpt
        );
        data['translatedEnex'] = translatedText2;

        const address = `${data.address}`;
        const translatedText3 = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          address
        );
        data['translatedEnadd'] = translatedText3;
      })
    );
  }
  async translateTextHe() {
    await Promise.all(
      this.photographersList.map(async (data: any) => {
        const names = `${data.the_title}`;
        const translatedText = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          names
        );
        data['translatedHeName'] = translatedText;

        const shortText = `${data.the_content}`;
        const translatedTextt = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          shortText
        );
        data['translatedHeText'] = translatedTextt;

        const excerpt = `${data.the_excerpt}`;
        const translatedText2 = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          excerpt
        );
        data['translatedHeEx'] = translatedText2;

        const address = `${data.address}`;
        const translatedText3 = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          address
        );
        data['translatedHeadd'] = translatedText3;
      })
    );
  }
}
