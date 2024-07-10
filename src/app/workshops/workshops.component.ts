import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../workshops/workshops.service';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { SearchService } from '@app/search/search.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
})
export class WorkshopsComponent implements OnInit {
  workshopList: any = [];
  imageUrl = `${environment.imgNewsUrl}`;
  workshopData: any = [];
  expired: boolean;
  language: any;
  isRTL: boolean = false;
  isExpanded: boolean = false;
  constructor(
    private workshopService: WorkshopsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public router: Router,
    private searchService: SearchService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.getWorkShopList();
  }

  getWorkShopList() {
    this.workshopService.getWorkshopsList().subscribe((data) => {
      this.workshopList = data['data'];
      this.translateTextHe();
      this.translateText();
      const currentDate = new Date();
      const providedDate = new Date(this.workshopList.date);
      if (providedDate < currentDate) {
        this.expired = true;
        console.log('The provided date is expired.');
      } else {
        this.expired = false;
        console.log('The provided date is not expired.');
      }
    });
  }
  Register(id: any) {
    this.workshopService.getWorkshopsDetails(id).subscribe((data) => {
      this.workshopData = data['data'];
      if (!this.workshopData.fee && !this.workshopData.early_bird_fee && !this.workshopData.external_link) {
        var successMessage = this.translate.instant('Please reach out to the Shalash team.');
        this.toastr.error(successMessage);
      } else {
        if (data['data'].external_link && data['data'].external_link !== '') {
          // window.location.href = data['data'].external_link;
          this.router.navigate(['workshop', id]);
        } else {
          this.router.navigate(['workshop', id]);
        }
      }
    });
  }
  async translateTextHe() {
    await Promise.all(
      this.workshopList.map(async (data: any) => {
        const location = `${data.location}`.toLowerCase();
        const translatedLocation = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          location
        );
        data['locationHe'] = translatedLocation;

        const names = `${data.title}`.toLowerCase();
        const translatedText = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          names
        );
        data['translatedHeName'] = translatedText;

        const shortDesc = `${data.sht_desc}`;
        const translatedText1 = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          shortDesc
        );
        data['transShortHe'] = translatedText1;

        const longDesc = `${data.long_desc}`;
        const translatedText2 = await this.searchService.translateText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          longDesc
        );
        data['transLongHe'] = translatedText2;
      })
    );
  }

  async translateText() {
    await Promise.all(
      this.workshopList.map(async (data: any) => {
        const location = `${data.location}`.toLowerCase();
        const translatedLocation = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          location
        );
        data['locationEn'] = translatedLocation;

        const names = `${data.title}`.toLowerCase();
        const translatedText = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          names
        );
        data['translatedName'] = translatedText;

        const shortDesc = `${data.sht_desc}`;
        const translatedText1 = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          shortDesc
        );
        data['transShort'] = translatedText1;
        const longDesc = `${data.long_desc}`;
        const translatedText2 = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          longDesc
        );
        data['transLong'] = translatedText2;
      })
    );
  }

  detailsPage(id: any) {
    this.router.navigate(['workshop', id]);
  }
  getLimitedDescription(content: string): string {
    if (!this.isExpanded && content.split(' ').length > 190) {
      const words = content.split(' ').slice(0, 190);
      return words.join(' ') + '.';
    }
    return content;
  }
  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  isContentExceedsLimit(content: string): boolean {
    return content.split(' ').length > 170;
  }
}
