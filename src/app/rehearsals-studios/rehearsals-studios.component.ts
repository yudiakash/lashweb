import { Component, OnInit } from '@angular/core';
import { RehearsalsStudiosService } from '../rehearsals-studios/rehearsals-studios.service';
import { SearchService } from '@app/search/search.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-rehearsals-studios',
  templateUrl: './rehearsals-studios.component.html',
  styleUrls: ['./rehearsals-studios.component.scss'],
})
export class RehearsalsStudiosComponent implements OnInit {
  studiosList: any = [];
  language: any;
  isRTL: boolean = false;

  constructor(private rehearsalsStudiosService: RehearsalsStudiosService, private searchService: SearchService) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.rehearsalsStudiosService.getRehearsalsStudiosList().subscribe((data) => {
      let response = data;
      this.studiosList = response['data'];
      this.translateText();
      this.translateTextEn();
      console.log(response['data']);
    });
  }

  async translateText() {
    await Promise.all(
      this.studiosList.map(async (data: any) => {
        const names = `${data.the_title}`.toLowerCase();
        const translatedText = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          names
        );
        data['translatedNameHe'] = translatedText.toLowerCase();
        const address = `${data.address}`.toLowerCase();
        const translatedText1 = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          address
        );
        data['transAddressHe'] = translatedText1.toLowerCase();
      })
    );
  }

  async translateTextEn() {
    await Promise.all(
      this.studiosList.map(async (data: any) => {
        const names = `${data.the_title}`.toLowerCase();
        const translatedText = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          names
        );
        data['translatedNameEn'] = translatedText.toLowerCase();
        const address = `${data.address}`.toLowerCase();
        const translatedText1 = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          address
        );
        data['transAddressEn'] = translatedText1.toLowerCase();
      })
    );
  }
}
