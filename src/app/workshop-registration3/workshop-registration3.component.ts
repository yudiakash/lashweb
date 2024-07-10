import { Component, OnInit } from '@angular/core';
import { SearchService } from '@app/search/search.service';
import { WorkshopsService } from '@app/workshops/workshops.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-workshop-registration3',
  templateUrl: './workshop-registration3.component.html',
  styleUrls: ['./workshop-registration3.component.scss'],
})
export class WorkshopRegistration3Component implements OnInit {
  workshopId: any;
  workshopData: any = [];
  imageUrl = `${environment.imgNewsUrl}`;
  language: any;
  isRTL: boolean = false;
  imageReSizeUrl = `${environment.imgBaseUrl}`;

  constructor(private worshopservice: WorkshopsService, private searchService: SearchService) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    localStorage.removeItem('RequestInformation');
    localStorage.removeItem('title');
    localStorage.removeItem('discountAmount');
    localStorage.removeItem('idregistration');
    this.workshopId = localStorage.getItem('workshopId');
    this.getWorkshopDetails();
  }
  getWorkshopDetails() {
    this.worshopservice.getWorkshopsDetails(this.workshopId).subscribe((data) => {
      this.workshopData = data['data'];
      this.translateTextHe();
      this.translateText();
    });
  }

  async translateTextHe() {
    var title = `${this.workshopData.title}`.toLowerCase();
    if (title.includes('eyt')) {
      title = title.replace('eyt', 'איט');
    }
    const translatedText = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      title
    );
    this.workshopData['titleHe'] = translatedText;
  }
  async translateText() {
    var title = `${this.workshopData.title}`.toLowerCase();
    const translatedText = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      title
    );
    this.workshopData['titleEn'] = translatedText;
  }
}
