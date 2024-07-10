import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../workshops/workshops.service';
import { NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SearchService } from '@app/search/search.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
})
export class WorkshopComponent implements OnInit {
  workshopData: any = [];
  imageUrl = `${environment.imgNewsUrl}`;
  id: any;
  wrkRecomendations: any;
  wrkSchedule: any;
  safeVdoLink: any;
  accruedDate: any;
  currentDate: any;
  language: any;
  isRTL: boolean = false;
  imageReSizeUrl: any | null;

  constructor(
    private workshopService: WorkshopsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private searchService: SearchService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;

    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.getWorkshopDetails();
      this.getWorkshopRecomendations();
      this.getWorkshopSchedule();
    });
  }

  getWorkshopDetails() {
    this.workshopService.getWorkshopsDetails(this.id).subscribe((data) => {
      this.workshopData = data['data'];
      this.translateTextHe();
      this.translateText();

      if (this.workshopData.early_bird_date) {
        this.accruedDate = new Date(this.workshopData.early_bird_date);
      } else {
        this.accruedDate = new Date(this.workshopData.date);
      }

      this.currentDate = new Date();

      if (this.workshopData && this.workshopData.vdo_link) {
        const videoId = this.extractVideoId(this.workshopData.vdo_link);
        if (videoId) {
          const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
          this.safeVdoLink = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
        } else {
          const spotifyMatch = this.workshopData.vdo_link.match(/open\.spotify\.com\/episode\/([a-zA-Z0-9]+)/);
          const vimeoMatch = this.workshopData.vdo_link.match(/vimeo\.com\/(\d+)/);
          if (spotifyMatch) {
            const spotifyEpisodeId = spotifyMatch[1];
            const safeVdoLink = `https://open.spotify.com/embed/episode/${spotifyEpisodeId}`;
            this.safeVdoLink = this.sanitizer.bypassSecurityTrustResourceUrl(safeVdoLink);
          } else if (vimeoMatch) {
            const vimeoVideoId = vimeoMatch[1];
            const safeVdoLink = `https://player.vimeo.com/video/${vimeoVideoId}`;
            this.safeVdoLink = this.sanitizer.bypassSecurityTrustResourceUrl(safeVdoLink);
          } else {
            const videoLink = this.workshopData.vdo_link;
            const youtubeEmbedUrl = `${videoLink}`;
            this.safeVdoLink = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
          }
        }
      }

      // this.safeVdoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.workshopData.vdo_link);
    });
  }

  getWorkshopRecomendations() {
    this.workshopService.getWorkshopsRecomByWorkshop(this.id).subscribe((data) => {
      this.wrkRecomendations = data['data'];
    });
  }

  getWorkshopSchedule() {
    this.workshopService.getWorkshopsScheduleByWorkshop(this.id).subscribe((data) => {
      this.wrkSchedule = data['data'];
    });
  }
  RequestInformation() {
    localStorage.setItem('RequestInformation', JSON.stringify(true));
    this.router.navigateByUrl('/workshop-registration/' + this.id);
  }

  extractVideoId(url: string): string | null {
    const regexMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return regexMatch ? regexMatch[1] : null;
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
    this.workshopData['transNameHe'] = translatedText;

    var location = `${this.workshopData.location}`.toLowerCase();
    const transLocation = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      location
    );
    this.workshopData['LocationHe'] = transLocation;

    var title1 = `${this.workshopData.long_desc}`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(title1, 'text/html');
    const divElements = doc.querySelectorAll('div');
    const textContents = Array.from(divElements).map((element: any) => element.textContent.trim());
    const translatedSentence = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      title1
    );
    this.workshopData['transTextHe'] = translatedSentence;

    this.wrkRecomendations.map(async (data: any) => {
      // const names = `${data.recommendation_text}`.toLowerCase();
      // const translatedText = await this.searchService.translateText(
      //   environment.englishLanguage,
      //   environment.hebrewLanguage,
      //   names
      // );
      // data['transRecHe'] = translatedText;

      const author = `${data.author}`.toLowerCase();
      const translatedText1 = await this.searchService.translateText(
        environment.englishLanguage,
        environment.hebrewLanguage,
        author
      );
      data['transAutorHe'] = translatedText1;
    });
    this.wrkSchedule?.map(async (data: any) => {
      const schedule = `${data.schedule}`.toLowerCase();
      const translatedShedule = await this.searchService.translateText(
        environment.englishLanguage,
        environment.hebrewLanguage,
        schedule
      );
      data['sheduleHe'] = translatedShedule;

      // const names = `${data.desc}`.toLowerCase();
      // const translatedText = await this.searchService.translateText(
      //   environment.englishLanguage,
      //   environment.hebrewLanguage,
      //   names
      // );
      // // const safeHtmlContent: SafeHtml = this.sanitizer.bypassSecurityTrustResourceUrl(translatedText);
      // data['transDescHe'] = translatedText;
    });
  }

  async translateText() {
    var title = `${this.workshopData.title}`.toLowerCase();

    const translatedText = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      title
    );
    this.workshopData['titleEn'] = translatedText;

    var location = `${this.workshopData.location}`.toLowerCase();
    const transLocation = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      location
    );
    this.workshopData['LocationEn'] = transLocation;
    // var title1 = `${this.workshopData.long_desc}`;
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(title1, 'text/html');

    // // Extract text content from div elements
    // const divElements = doc.querySelectorAll('div');

    // const sentences = title1.split('. ');
    // const translatedSentences = [];

    // for (const sentence of sentences) {
    //   const translatedSentence = await this.searchService.translateText(
    //     environment.hebrewLanguage,
    //     environment.englishLanguage,
    //     sentence
    //   );
    //   translatedSentences.push(translatedSentence);
    // }
    // const translatedParagraph = translatedSentences.join('. ');
    // this.workshopData['longDescEn'] = translatedParagraph;

    this.wrkRecomendations.map(async (data: any) => {
      const names = `${data.recommendation_text}`.toLowerCase();
      const translatedText = await this.searchService.translateText(
        environment.hebrewLanguage,
        environment.englishLanguage,
        names
      );
      data['RecEn'] = translatedText;

      const author = `${data.author}`.toLowerCase();
      const translatedText1 = await this.searchService.translateText(
        environment.hebrewLanguage,
        environment.englishLanguage,
        author
      );
      data['autorEn'] = translatedText1;
    });
    this.wrkSchedule?.map(async (data: any) => {
      const schedule = `${data.schedule}`.toLowerCase();
      const translatedShedule = await this.searchService.translateText(
        environment.hebrewLanguage,
        environment.englishLanguage,
        schedule
      );
      data['sheduleEn'] = translatedShedule;

      // const names = `${data.desc}`.toLowerCase();
      // const translatedText = await this.searchService.translateText(
      //   environment.hebrewLanguage,
      //   environment.englishLanguage,
      //   names
      // );
      // // const safeHtmlContent: SafeHtml = this.sanitizer.bypassSecurityTrustResourceUrl(translatedText);
      // data['sheduleDescEn'] = translatedText;
    });
  }
}
