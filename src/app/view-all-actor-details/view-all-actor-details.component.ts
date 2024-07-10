import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorDetailsService } from '../actor-details/actor-details.service';
import { ActorAccountService } from '../actoraccount/actoraccount.service';
import { environment } from '@env/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

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
  selector: 'app-view-all-actor-details',
  templateUrl: './view-all-actor-details.component.html',
  styleUrls: ['./view-all-actor-details.component.scss'],
})
export class ViewAllActorDetailsComponent implements OnInit {
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
  pendingChanges: any = [];
  selectedValue: any;
  pendingCharValue: any = [];
  actiorTitle: boolean = false;
  audioObjects: AudioObject[] = [];
  isPlaying: boolean;
  buttonIndex: any;
  audioId: any;
  lastImage: any = [];
  isMuted: boolean;
  activeAudioObjects: AudioObject[] = [];
  audioObj: any;
  imgOldUrl: any | null = `${environment.oldUrl}`;

  constructor(
    private route: ActivatedRoute,
    private actorAccountService: ActorAccountService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private actorDetailsService: ActorDetailsService
  ) {
    window.addEventListener('blur', this.handlePageBlur.bind(this));
    window.addEventListener('focus', this.handlePageFocus.bind(this));
  }

  ngOnInit(): void {
    this.resumeUrl = `${environment.resumeUrl}`;
    this.imagebaseUrl = `${environment.imageUrl}`;
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;
    // this.imgNewsUrl = `${environment.imgUrl}`;
    this.imgNewsUrl = `${environment.defaultImgUrl}`;
    this.route.queryParams.subscribe((params) => {
      this.detailsID = params['details'];
    });
    this.getActorById();
    this.getActorDetails();
    this.getPendingChanges();
  }

  getActorDetails() {
    const userID = localStorage.getItem('userId');
    this.actorAccountService.getLinks(userID).subscribe((data) => {
      this.LinksData = data['data'];
      console.log('linkss', this.LinksData);
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
      console.log('this.actiorDetails.charValuesData', this.actiorDetails.charValuesData);
      this.actiorDetails.charValuesData.filter((data: any) => {
        this.pendingCharValue.filter((pendingvalue: any) => {
          if (data.Title === pendingvalue.Label) {
            data['newValue'] = pendingvalue.newChildName;
          }
        });
      });

      this.actiorDetails.charValuesData = this.actiorDetails.charValuesData.filter((item: any, index: any) => {
        return (
          !index ||
          !this.actiorDetails.charValuesData.slice(0, index).some((prevItem: any) => prevItem.Title === item.Title)
        );
      });

      console.log(' this.actiorDetails', this.actiorDetails);

      this.maxPictures = this.actiorDetails.artistPicturesAll.length;
      if (this.actiorDetails.artistPicturesAll.length) {
        let imageData = this.actiorDetails.artistPicturesAll;
        imageData.forEach(function (this: typeof imageData, value: any) {
          if (value.main == 0) {
            imgSub.push({ img: value.fileName, loc: 'sub', flag: value.flag });
            subImgCount++;
          } else {
            imgMain.push({ img: value.fileName, flag: value.flag });
          }
        });
        this.subImages = imgSub.slice(0, 4);
        this.imageSub = this.subImages.filter((data: any) => {
          if (data.img) {
            data['image'] = `${this.imagebaseUrl}${data.img}`;
            data['thumbImage'] = `${this.imagebaseUrl}${data.img}`;
          } else {
            data['thumbImage'] = `	https://gilnat.azurewebsites.net/Uploads/${data.img}`;
          }
        });

        this.mainImages = imgMain;
        console.log('this.mainImages', this.mainImages);
        this.lastImage = this.subImages.slice(-2);
      }
    });
  }
  getPendingChanges() {
    const completed = 0;
    const artistID = localStorage.getItem('artistID');
    this.actorAccountService.getPendingChanges(completed, artistID).subscribe((res: any) => {
      // console.log('pending changes-----> ', res);
      this.pendingChanges = res['data'];

      this.pendingCharValue = this.pendingChanges.filter((change: any) => {
        if (change.Type === 2) {
          // console.log('dataaa',change);
          return change;
        }
      });
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
}
