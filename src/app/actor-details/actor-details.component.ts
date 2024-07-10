import { Component, OnInit } from '@angular/core';
import { ActorDetailsService } from '../actor-details/actor-details.service';
import { ActivatedRoute } from '@angular/router';
import { ActorAccountService } from '../actoraccount/actoraccount.service';
import { environment } from '@env/environment';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from '@app/search/search.service';
import { AuthenticationService } from '../auth/authentication.service';
import { Title } from '@angular/platform-browser';

interface AudioObject {
  eId: number;
  src: string;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  audio: HTMLAudioElement;
  volumeLevel: any;
  isMuted: boolean;
}

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss'],
})
export class ActorDetailsComponent implements OnInit {
  actiorDetails: any = [];
  detailsID: string | undefined;
  subImages: any = [];
  mainImages: any = [];
  LinksData: any = [];
  resumeUrl: string;
  youtubeUrl: SafeResourceUrl;
  playerType: string;
  imageSub: any = [];
  imagebaseUrl: any | null;
  imageReSizeUrl: any | null;
  imgNewsUrl: any | null;
  maxPictures: any;
  lastImage: any = [];
  audioObjects: AudioObject[] = [];
  audioId: any;
  isMuted: boolean;
  buttonIndex: any;
  isPlaying: boolean;
  activeAudioObjects: AudioObject[] = [];
  audioObj: any;
  imgOldUrl: any | null = `${environment.oldUrl}`;
  language: any;
  isRTL: boolean = false;
  copyText: string = 'Copy The Profile Link';
  safeHtmlContent: SafeHtml;
  authSearchCheck: boolean = true;
  authUseCheck: boolean = true;

  constructor(
    private actorAccountService: ActorAccountService,
    private actorDetailsService: ActorDetailsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private searchService: SearchService,
    public auth: AuthenticationService,
    private titleService: Title
  ) {
    window.addEventListener('blur', this.handlePageBlur.bind(this));
    window.addEventListener('focus', this.handlePageFocus.bind(this));
  }

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.resumeUrl = `${environment.resumeUrl}`;
    this.imagebaseUrl = `${environment.imageUrl}`;
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;
    //this.imgNewsUrl = `${environment.imgUrl}`;
    this.imgNewsUrl = `${environment.defaultImgUrl}`;
    this.route.queryParams.subscribe((params) => {
      this.detailsID = params['details'];
    });

    this.getActorById();
    this.getActorDetails();
    if (!this.auth.isAuthenticated) {
      this.authUseCheck = false;
    }
    this.getSiteSettings();
  }

  getActorDetails() {
    const userID = localStorage.getItem('userId');
    this.actorAccountService.getLinks(userID).subscribe((data) => {
      this.LinksData = data['data'];
    });
  }

  getActorById() {
    let Id = this.detailsID!;
    let imgSub: any = [];
    let demoImg: any = [];
    let imgMain: any = [];
    let subImgCount = 1;
    this.actorDetailsService.getActorDetials(Id).subscribe((data) => {
      this.actiorDetails = data['data'];
      this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.actiorDetails.Resume);
      this.translateText();
      this.translateTextHe();

      let combinedname = `${this.actiorDetails.FirstName} ${this.actiorDetails.LastName}`.toLowerCase();
      this.getTitlename(combinedname);
      this.audioObjects = this.actiorDetails.artistVocals.map((obj: any) => {
        return {
          eId: obj.id,
          src: obj.embed,
          currentTime: 0,
          isPlaying: false,
          audio: new Audio(obj.embed),
          duration: 120,
          volumeLevel: 0.5,
          isMuted: false,
        };
      });
      this.maxPictures = this.actiorDetails.artistPictures.length;
      console.log(' this.actiorDetails', this.actiorDetails);

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

        // for (let n = subImgCount; n < 4; n++) {
        //   if (this.actiorDetails['Gender'] == 1) {
        //     imgSub.push({ img: 'female.png', loc: 'avathar' });
        //   } else {
        //     imgSub.push({ img: 'male.png', loc: 'avathar' });
        //   }
        // }
        this.subImages = imgSub.slice(0, 4);
        this.imageSub = this.subImages.filter((data: any) => {
          if (data.img) {
            data['image'] = `${this.imagebaseUrl}${data.img}`;

            data['thumbImage'] = `${this.imagebaseUrl}${data.img}`;

            // data.thumbImage = data.img;
            // delete data.img;
            // if (data.loc == 'avathar') {
            //   data.thumbImage = `https://gilnat.azurewebsites.net/Uploads/${data.thumbImage}`;
            // } else {
            //   data.thumbImage = `https://gilnat.azurewebsites.net/Uploads/${data.thumbImage}`;
            // }
          } else {
            data['thumbImage'] = `	https://gilnat.azurewebsites.net/Uploads/${data.img}`;
          }
        });
        this.mainImages = imgMain;
        this.lastImage = this.subImages.slice(-2);
      }
    });
  }
  playVideo(content: any, src: any, type: any) {
    this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    this.playerType = type;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }
  togglePlay(audioObj: AudioObject, index: any): void {
    console.log('audio object', this.audioObjects);
    this.buttonIndex = index;
    audioObj.isPlaying = !audioObj.isPlaying;
    this.audioId = this.audioObjects.find((data: any) => {
      if (data['eId'] == audioObj['eId']) {
        return data['eId'];
      }
    });
  }

  playAudio(audioObj: AudioObject, index: any): void {
    this.audioObj = audioObj;
    this.isPlaying = true;
    audioObj.isPlaying = true;
    audioObj.audio.currentTime = audioObj.currentTime;

    audioObj.audio.addEventListener('timeupdate', () => {
      audioObj.currentTime = audioObj.audio.currentTime;
    });

    audioObj.audio.addEventListener('ended', () => {
      audioObj.isPlaying = false;
      audioObj.currentTime = 0;
    });

    this.activeAudioObjects.push(audioObj);
    audioObj.audio.play();
  }

  pauseAudio(audioObj: AudioObject, index: any): void {
    this.audioObj = audioObj;
    this.isPlaying = false;
    audioObj.isPlaying = false;
    audioObj.currentTime = audioObj.audio.currentTime;
    audioObj.audio.pause();
    const indexToRemove = this.activeAudioObjects.indexOf(audioObj);
    if (indexToRemove !== -1) {
      this.activeAudioObjects.splice(indexToRemove, 1);
    }
  }
  getTimeCodeFromNum(num: number) {
    let seconds = parseInt(num.toString(), 10);
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    const hours = Math.floor(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) {
      return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    } else {
      return `${String(hours).padStart(2, '0')}:${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    }
  }
  updateVolume(e: MouseEvent) {
    const volumeSlider = document.querySelector('.controls .volume-slider') as HTMLElement;
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    // this.audio.volume = newVolume;
    const volumePercentage = document.querySelector('.controls .volume-percentage') as HTMLElement;
    volumePercentage.style.width = newVolume * 100 + '%';
  }
  toggleMute(audioObj: AudioObject) {
    this.audioId = audioObj.eId;
    audioObj.isMuted = !audioObj.isMuted;
    audioObj.audio.muted = !audioObj.audio.muted;
    this.isMuted = audioObj.audio.muted;
  }
  handlePageBlur() {
    for (const audioObj of this.activeAudioObjects) {
      if (audioObj.isPlaying) {
        audioObj.audio.pause();
        audioObj.audio.currentTime = 0;
      }
    }
  }
  handlePageFocus() {
    for (const audioObj of this.activeAudioObjects) {
      if (audioObj.isPlaying) {
        // audioObj.audio.play();
      }
    }
  }
  ngOnDestroy() {
    this.stopAudio();
  }
  stopAudio() {
    if (this.audioObj && this.audioObj.isPlaying) {
      this.audioObj.audio.pause();
      this.audioObj.audio.currentTime = 0;
    }
  }
  async translateText() {
    const names = `${this.actiorDetails.FirstName} ${this.actiorDetails.LastName}`;
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.hebrewLanguage}&tl=${environment.englishLanguage}&dt=t&q=The person's name is:${names}&key=${environment.translateApiKey}`;
    try {
      const response = await fetch(apiUrl);
      const translationData = await response.json();
      const translatedText = translationData[0][0][0];
      const translatedValue = translatedText.split(':')[1].trim();
      this.actiorDetails['transNameEn'] = translatedValue;
    } catch (error) {
      console.error('Error:', error);
    }

    this.actiorDetails.skills.map(async (data: any) => {
      const names = `${data.prop5Name}`.toLowerCase();
      const translatedText = await this.searchService.translateText(
        environment.hebrewLanguage,
        environment.englishLanguage,
        names
      );
      data['transEnProp'] = translatedText;
      const selectnames = `${data.selectedVal}`;
      const translatedselValue = await this.searchService.translateText(
        environment.hebrewLanguage,
        environment.englishLanguage,
        selectnames
      );
      data['transEnslValue'] = translatedselValue;
    });
    const resume = `${this.actiorDetails.Resume}`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(resume, 'text/html');
    const elements = doc.querySelectorAll('body');
    const textContentArray: string[] = [];
    Array.from(elements).forEach((element: Element) => {
      const originalText = element.textContent;
      if (originalText) {
        const trimmedText = originalText.trim();
        if (trimmedText.length > 0) {
          textContentArray.push(trimmedText);
        }
      }
    });

    const textContent = textContentArray.join('\n');
    const translatedTextt = await this.searchService.translateText(
      environment.hebrewLanguage,
      environment.englishLanguage,
      textContent
    );
    this.actiorDetails['translatedEnResume'] = translatedTextt;
  }
  async translateTextHe() {
    const names = `${this.actiorDetails.FirstName} ${this.actiorDetails.LastName}`.toLowerCase();
    const translatedText = await this.searchService.translateHebrewNameText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      names
    );
    this.actiorDetails['translatedNameHe'] = names; //translatedText;
    this.actiorDetails.skills.map(async (data: any) => {
      const names = `${data.prop5Name}`;
      const translatedText = await this.searchService.translateText(
        environment.englishLanguage,
        environment.hebrewLanguage,
        names
      );
      data['transHeProp'] = translatedText;
      const selectnames = `${data.selectedVal}`;
      const translatedselValue = await this.searchService.translateText(
        environment.englishLanguage,
        environment.hebrewLanguage,
        selectnames
      );
      data['transHeSlValue'] = translatedselValue;
    });

    const resume = `${this.actiorDetails.Resume}`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(resume, 'text/html');
    const elements = doc.querySelectorAll('body');
    const textContentArray: string[] = [];
    Array.from(elements).forEach((element: Element) => {
      const originalText = element.textContent;
      if (originalText) {
        const trimmedText = originalText.trim();
        if (trimmedText.length > 0) {
          textContentArray.push(trimmedText);
        }
      }
    });
    const textContent = textContentArray.join('\n');
    const translatedTextt = await this.searchService.translateText(
      environment.englishLanguage,
      environment.hebrewLanguage,
      textContent
    );
    this.actiorDetails['translatedHeResume'] = translatedTextt;
  }

  copyPageLink() {
    const currentUrl = window.location.href;

    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    // Select the input content
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Optionally, you can provide user feedback (e.g., show a tooltip or a message)
    this.copyText = 'Profile Link Copied';

    setTimeout(() => {
      this.copyText = 'Copy The Profile Link';
    }, 10000);
  }

  async getSiteSettings() {
    await this.searchService.getSiteSettings().subscribe((data: any) => {
      let response = data['data'];

      if (response.show_actors == 1) {
        this.authSearchCheck = true;
      } else {
        if (this.authUseCheck == false) {
          this.authSearchCheck = false;
        }
      }
    });
  }

  getTitlename(name: any) {
    if (name == null) {
      this.titleService.setTitle('Actor Details');
    } else {
      this.titleService.setTitle(name);
    }
  }
}
