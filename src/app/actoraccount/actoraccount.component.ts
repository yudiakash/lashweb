import {
  Component,
  OnInit,
  NgZone,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  TemplateRef,
  HostListener,
  Renderer2,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActorAccountService } from './actoraccount.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../search/search.service';
import { ActorDetailsService } from '../actor-details/actor-details.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';
import { of, from, BehaviorSubject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthenticationService } from '../auth/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd } from '@angular/router';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
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
  selector: 'app-actoraccount',
  templateUrl: './actoraccount.component.html',
  styleUrls: ['./actoraccount.component.scss'],
})
export class ActoraccountComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  title = 'my-image-cropper';
  @ViewChild('myInput') myInputVariable!: ElementRef;
  @ViewChild('agencyDiv') agencyDiv: ElementRef;
  @ViewChild('popupButton') popupButton: ElementRef;
  @ViewChild('popupSecndButton') popupSecndButton: ElementRef;
  @ViewChild('mandatorySkills', { static: false }) mandatorySkillsRef!: ElementRef;
  @ViewChild('nonMandatorySkills', { static: false }) nonMandatorySkillsRef!: ElementRef;
  @ViewChild('openFirstPopup', { static: false }) openFirstPopupRef!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.scrolposition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const targetScrollPosition = 1700;
    if (this.saveBtn && localStorage.getItem('secondPopup') && localStorage.getItem('unShowingSecondPopup')) {
      if (scrollPosition >= targetScrollPosition) {
        this.renderer.selectRootElement(this.popupSecndButton.nativeElement).click();
        // this.openModal(scrollPosition);
        this.secondPopSide = true;
        localStorage.removeItem('secondPopup');
        localStorage.removeItem('unShowingSecondPopup');
      }
    }
  }
  @ViewChild('contentPop') modalContent: TemplateRef<any>;
  @ViewChild('contentPopSecnd') modalContentt: TemplateRef<any>;

  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef;
  img: any;
  imageChangedEventt: any;
  imageUrls: any;
  editArtistId: any;
  imageId: any;
  croppedImagee: any;
  main: boolean;
  updateRes: boolean = false;
  modalReference: NgbModalRef | any;
  newActorAccountForm!: FormGroup;
  newLinkForm!: FormGroup;
  newSkillForm!: FormGroup;
  newRatingForm!: FormGroup;
  newImageForm!: FormGroup;
  newResumeUploadForm!: FormGroup;
  newAudioUploadForm!: FormGroup;
  newVideoUploadForm!: FormGroup;
  newResumeTextForm!: FormGroup;
  bodyTypeList: any = [];
  hairColorList: any = [];
  hairTypeList: any = [];
  eyeTypeList: any = [];
  skinToneList: any = [];
  agencyParms: any = [];
  eduLevels: any = [];
  LinksData: any = [];
  closeResult: any = [];
  id: String;
  userId: any;
  actiorDetails: any = [];
  artistPictures: any = [];
  actorBodyTypeData: any | null;
  actorhairTypeData: any | null;
  actorHairClrTypeData: any | null;
  actorEyeTypeData: any | null;
  actorSkinTypeData: any | null;
  languageSkill: any | null;
  skillList: any | [];
  actorSkillList: any | [];
  imgs: any = [];
  artistToken: any;
  selectedSkill: any;
  imageSrc: any | null;
  filedata: any;
  resumedata: any;
  imagebaseUrl: any | null;
  resumeUrl: any | null;
  youtubeUrl: SafeResourceUrl;
  height: any;
  Resume: any = [];
  encodedToken: string;
  playerType: string;
  observableImage: any;
  newProp5: any[] = [];
  propsData: any = [];
  Icon: any;
  resumeUpdate: boolean = false;
  embedVedio: any;
  artistVocal: any = [];
  public $: any;
  skillsLength: any;
  showmoreBtn: boolean = false;
  menuHidden = false;
  proParents: any;
  proParentId: any;
  ids: any;
  edulevel: any;
  educationLevel: any;
  residenceOptions: any;
  setclick: boolean = false;
  selSkillId: any;
  educationId: number;
  selectedValue: any;
  residenceSelectVal: any;
  ORGSelectValue: any;
  singerSelectValue: any;
  sendRolesSelectValue: any;
  menToneSelectVal: any;
  womantoneselectVal: any;
  driveSelectedVal: any;
  slctVal: number;
  eduid: any;
  uploadImg: boolean = false;
  messageAlert: boolean = false;
  dataFinl: any = [];
  froala1 = new Froala1();
  pendingChanges: any = [];
  eduChanges: string;
  froptions: any;
  isButtonClicked: boolean = false;
  residenceid: any;
  orgMembershipId: any;
  orgOptions: any;
  sendactiongRolesId: any;
  sendRolesOptions: any = [];
  menToneOptions: any = [];
  menToneId: any;
  womenToneOptions: any = [];
  womenToneId: any;
  driveLicenseOptions: any = [];
  driveLicensId: any;
  singerOptions: any = [];
  singerId: any;
  agencyRanks: any;
  fileLength: any;
  fristPicture: any;
  audioPlayer: any;
  // genderValue:number
  genderChangee: any;
  Membership: any;
  Membershipss: any;
  otherValue: any;
  audioObjects: AudioObject[] = [];
  isPlaying: boolean;
  isMuted: boolean;
  buttonIndex: any;
  setOtherValue: boolean = false;
  audioSource: any = {};
  saveBtn: boolean = false;
  loginEmail: any;
  registerName: any;
  emailRegister: any;
  elementMembership: boolean = false;
  planTypeResponse: any = [];

  selectedValues: any[] = [];
  language: any;
  nonMandatorySkills: any;
  MandatorySkills: any;
  pictures: any;
  setButton: boolean = false;
  scrollPosition: number = 0;
  showPopup: boolean = false;
  scndBtnPopup: boolean = false;
  enableBtn: boolean = false;
  bodyTypeErr: boolean = false;
  hairColrErr: boolean = false;
  hairTypeErr: boolean = false;
  eyeVlErr: boolean = false;
  skinToneErr: boolean = false;
  eductnVlErr: boolean = false;
  genderValErr: boolean = false;
  rolesValErr: boolean = false;
  residenceValErr: boolean = false;
  membersipValErr: boolean = false;
  licenseValErr: boolean = false;
  singerValErr: boolean = false;
  agencyValErr: boolean = false;
  heightValErr: boolean = false;
  motherTongueErr: boolean = false;

  enableSide: boolean = false;
  secondPopSide: boolean = false;
  sidebarEnable: any;
  videoEnableBtn: boolean = false;
  linkEnableBtn: boolean = false;
  audioId: any;
  blockingScroll: any;
  scrolposition: any;
  resumeActor: any;
  errormsg: boolean = false;
  urlTested: boolean;
  activeAudioObjects: AudioObject[] = [];
  audioObj: any;
  genderErr: boolean = false;
  isRTL: boolean = false;
  imgOldUrl: any | null = `${environment.oldUrl}`;
  eventName: any;
  formValue: any;
  genderselect: boolean = false;
  bodySelect: boolean = false;
  hairSelect: boolean = false;
  hairTypeSelect: boolean = false;
  eyesSelect: boolean = false;
  skintoneSelect: boolean = false;
  agencySelect: boolean = false;
  membershipSelect: boolean = false;
  licenseSelect: boolean = false;
  studiesSelect: boolean = false;
  passportSelect: boolean = false;
  russianSelect: boolean = false;
  englishSelect: boolean = false;
  arabicSelect: boolean = false;
  residenceSelect: boolean = false;
  saveCapblty: boolean = false;
  copyText: string = 'Copy The Profile Link';
  genderLabelTranslationKey: any;
  currentGenderOptions: any;
  numberRange: any = [];
  routeParent: any;
  languageSet: any;
  motherlangValue: any;
  ctx: any;
  newImageUploadForm: FormGroup;
  croppedImage: any = '';
  imageChangedEvent: any = '';
  croppedEvent: any;
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  init = {
    icons: 'material',
    skin: 'borderless',
    plugins: 'wordcount',
    menubar: false,
    min_height: 150,
  };

  /**
   * constructor function
   *
   * @param actorAccountService
   * @param formBuilder
   * @param ngZone
   * @param router
   * @param route
   * @param searchService
   * @param actorDetailsService
   * @param toastr
   * @param modalService
   * @param sanitizer
   */
  constructor(
    private actorAccountService: ActorAccountService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private actorDetailsService: ActorDetailsService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    public auth: AuthenticationService,
    private renderer: Renderer2,
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.getUserId();
    window.addEventListener('blur', this.handlePageBlur.bind(this));
    window.addEventListener('focus', this.handlePageFocus.bind(this));
  }
  /**
   * onInIt function
   */

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }
  ngOnInit(): void {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
      localStorage.removeItem('getUser');
    }

    const storedValue = localStorage.getItem('saveBtn');
    this.emailRegister = localStorage.getItem('emailRegister');
    JSON.parse(this.emailRegister);
    if (this.emailRegister || this.registerName || storedValue) {
      this.saveBtn = true;
    } else {
      this.saveBtn = false;
    }
    localStorage.setItem('getUser', '1');
    this.id = this.route.snapshot.params['id'];
    this.routeParent = this.route.snapshot['data']['title'];

    this.imagebaseUrl = `${environment.imageUrl}`;
    this.resumeUrl = `${environment.resumeUrl}`;

    this.newActorAccountForm = this.formBuilder.group({
      Gender: [null, Validators.required],
      Height: [null, Validators.required],
      bodyTypeValue: ['', Validators.required],
      hairColorValue: ['', Validators.required],
      hairTypeValue: ['', Validators.required],
      eyeValue: ['', Validators.required],
      skinToneValue: ['', Validators.required],
      AgencyId: ['', Validators.required],
      Value: ['', Validators.required],
      educationValue: [null],
      Id: ['', Validators.required],
      residenceValue: ['', Validators.required],
      residence: [null],
      membershipValue: ['', Validators.required],
      ORGmembership: [null],
      roles_Value: ['', Validators.required],
      send_me_acting_roles: [null],
      gender_tone_Value: ['', Validators.required],
      gender_tone: [null],
      // woman_tone_Value: ['', Validators.required],
      // woman_tone: [null],
      license_Value: ['', Validators.required],
      drive_licenses: [null],
      singerValue: ['', Validators.required],
      singer: [null],
      Name: ['', Validators.required],
      AgencyRankId: ['', Validators.required],
      motherTongue: ['', Validators.required],
    });

    this.newLinkForm = this.formBuilder.group({
      user_id: this.userId,
      link: ['', Validators.required],
      title: ['', Validators.required],
    });

    this.newSkillForm = this.formBuilder.group({
      ArtistId: ['', Validators.required],
      Prop5Id: [null, Validators.required],
      Id: ['', Validators.required],
    });

    this.newRatingForm = this.formBuilder.group({
      Value: ['', Validators.required],
      Id: ['', Validators.required],
    });

    this.newImageForm = this.formBuilder.group({
      PicOrder: ['', Validators.required],
      Id: ['', Validators.required],
      ArtistId: ['', Validators.required],
    });

    this.newImageUploadForm = this.formBuilder.group({
      FileName: new FormControl('', [Validators.required]),
      ArtistId: new FormControl('', [Validators.required]),
    });

    this.newResumeUploadForm = this.formBuilder.group({
      resume_path: new FormControl('', [Validators.required]),
      Id: new FormControl('', [Validators.required]),
    });

    this.newAudioUploadForm = this.formBuilder.group({
      Embed: new FormControl('', [Validators.required]),
      ArtistId: new FormControl('', [
        Validators.required,
        // Validators.pattern("/^(https?|ftp|file):\/\/(www.)?(.*?)\.(mp3)$/")
      ]),
    });

    this.newVideoUploadForm = this.formBuilder.group({
      Embed: new FormControl('', [
        Validators.required,
        //Validators.pattern("/^(https?|ftp|file):\/\/(www.)?(.*?)\.(mp3)$/")
      ]),
      ArtistId: new FormControl('', [Validators.required]),
    });

    this.newResumeTextForm = this.formBuilder.group({
      Resume: new FormControl('', []),
      user_id: new FormControl('', [Validators.required]),
    });
    // this.getPendingChanges();
    this.actorBodyType();
    this.actorHairColor();
    this.actorHairType();
    this.actorEyesType();
    this.actorSkinTone();
    this.actorAgencyParms();
    this.actorEducationLevels();
    this.getSkillList();
    this.getActorDetails();
    this.getAllPropsData();
    this.generateNumberRange();

    // this.getAllAgencyRanks()

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  togglePlay(audioObj: AudioObject, index: any): void {
    this.buttonIndex = index;
    audioObj.isPlaying = !audioObj.isPlaying;
    if (audioObj.isPlaying) {
      // this.playAudio(audioObj);
    } else {
      // this.pauseAudio(audioObj);
    }
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

  // updateVolume(e: MouseEvent) {
  //   const volumeSlider = document.querySelector('.controls .volume-slider') as HTMLElement;
  //   const sliderWidth = window.getComputedStyle(volumeSlider).width;
  //   const newVolume = e.offsetX / parseInt(sliderWidth);
  //   // this.audio.volume = newVolume;
  //   const volumePercentage = document.querySelector('.controls .volume-percentage') as HTMLElement;
  //   volumePercentage.style.width = newVolume * 100 + '%';
  // }
  toggleMute(audioObj: AudioObject) {
    this.audioId = audioObj.eId;
    audioObj.isMuted = !audioObj.isMuted;
    audioObj.audio.muted = !audioObj.audio.muted;
    this.isMuted = audioObj.audio.muted;
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

  get fff() {
    return this.newActorAccountForm.controls;
  }

  get ff() {
    return this.newLinkForm.controls;
  }
  changee(event: any) {
    this.eduid = event.target.value;
  }
  othersChange(event: any) {
    this.otherValue = event.target.value;
    if (this.otherValue == 0) {
      this.setOtherValue = true;
      this.renderer.setStyle(this.agencyDiv.nativeElement, 'display', 'block');
      this.getAllAgencyRanks();
    } else {
      this.renderer.setStyle(this.agencyDiv.nativeElement, 'display', 'none');
      this.newActorAccountForm.patchValue({ Name: '' });
    }
  }
  getAllAgencyRanks() {
    this.actorAccountService.getAllAgencyRanks().subscribe((data: any) => {
      this.agencyRanks = data['data'][4].id;

      this.newActorAccountForm.patchValue({ AgencyRankId: this.agencyRanks });
    });
  }
  formChange(event: any) {
    this.eventName = event.target.name;
    this.formValue = event.target.value;
    if (this.eventName == 'Gender' && this.formValue == 1 && this.womantoneselectVal) {
      this.arabicSelect = true;
    }
    if (this.eventName == 'Gender' && this.formValue == 0 && this.menToneSelectVal) {
      this.englishSelect = true;
    }
    if (this.eventName == 'Gender' && !this.formValue) {
      this.englishSelect = false;
      this.arabicSelect = false;
    }

    switch (this.eventName) {
      case 'Gender':
        this.genderselect = !!this.formValue;
        break;
      case 'bodyTypeValue':
        this.bodySelect = !!this.formValue;
        break;
      case 'hairColorValue':
        this.hairSelect = !!this.formValue;
        break;
      case 'hairTypeValue':
        this.hairTypeSelect = !!this.formValue;
        break;
      case 'eyeValue':
        this.eyesSelect = !!this.formValue;
        break;
      case 'skinToneValue':
        this.skintoneSelect = !!this.formValue;
        break;
      case 'AgencyId':
        this.agencySelect = !!this.formValue;
        break;
      case 'membershipValue':
        this.membershipSelect = !!this.formValue;
        break;
      case 'license_Value':
        this.licenseSelect = !!this.formValue;
        break;
      case 'educationValue':
        this.studiesSelect = !!this.formValue;
        break;
      case 'singerValue':
        this.passportSelect = !!this.formValue;
        break;
      case 'sendactiongRoles':
        this.russianSelect = !!this.formValue;
        break;
      case 'gender_tone_Value':
        this.englishSelect = !!this.formValue;
        break;
      case 'gender_tone_Value':
        this.arabicSelect = !!this.formValue;
        break;
      case 'residenceValue':
        this.residenceSelect = !!this.formValue;
        break;

      default:
        break;
    }
    let checkFrm = false;
    const formValues = this.newActorAccountForm.value;
    if (
      ((formValues.Gender == 0 || formValues.Gender == 1) &&
        formValues.Height != 0 &&
        formValues.bodyTypeValue != '' &&
        formValues.hairColorValue != '' &&
        formValues.hairTypeValue != '' &&
        formValues.eyeValue != '' &&
        formValues.skinToneValue != '' &&
        formValues.Value != '' &&
        formValues.singerValue != '' &&
        formValues.gender_tone_Value != '' &&
        formValues.license_Value != '' &&
        formValues.roles_Value != '' &&
        formValues.membershipValue != '' &&
        formValues.residenceValue != '' &&
        formValues.motherTongue != '' &&
        formValues.AgencyId != '') ||
      formValues.Name != ''
    ) {
      checkFrm = true;
      this.setButton = true;
    } else {
      checkFrm = false;
      this.setButton = false;
    }
    const totalDropdowns = 14;
    if (checkFrm == true) {
      this.enableSide = true;
      this.updateArtistFormAccount();
      // this.getUserId();
    } else {
      this.enableSide = false;
    }
  }

  genderChange(event: any, form: any) {
    this.genderChangee = event.target.value;

    if (this.genderChangee == 1) {
      this.genderLabelTranslationKey = 'Women Tone';
      this.currentGenderOptions = this.womenToneOptions;
      this.newActorAccountForm.patchValue({ gender_tone_Value: '' });
    }
    if (this.genderChangee == 0) {
      this.genderLabelTranslationKey = 'Men Tone';
      this.currentGenderOptions = this.menToneOptions;
      this.newActorAccountForm.patchValue({ gender_tone_Value: '' });
    }
  }

  getActorDetails() {
    this.getUserId();
    this.actorAccountService.getLinks(this.userId).subscribe((data) => {
      this.LinksData = data['data'];
      if (this.saveBtn) {
        if (this.LinksData.length > 0) {
          this.linkEnableBtn = true;
        }
      }
      if (this.LinksData.link) {
        if (this.LinksData.link.includes('instagram')) {
          this.Icon = '../../assets/images/instaIcon.png';
        } else if (this.LinksData.link.includes('facebook')) {
          this.Icon = '../../assets/images/fbIcon.png';
        } else if (this.LinksData.link.includes('twitter')) {
          this.Icon = '../../assets/images/twitterIcon.png';
        } else if (this.LinksData.link.includes('linkedIn')) {
          this.Icon = '../../assets/images/linkeinIcon.png';
        } else if (this.LinksData.link.includes('tiktok')) {
          this.Icon = '../../assets/images/twitterIcon.png';
        } else {
          this.Icon = '../../assets/images/webIcon.png';
        }
      }
    });
  }

  changeSkinTone(event: any) {
    const skinTone = parseInt(event.target.value);

    // this.newActorAccountForm.patchValue({skinToneValue: skinTone})
  }

  /**
   * updateArtistAccount
   * for updating the actor account characteristics
   */
  updateArtistAccount() {
    this.newActorAccountForm.patchValue({ Id: this.artistToken });
    this.newActorAccountForm.patchValue({ educationValue: this.educationId });
    this.newActorAccountForm.patchValue({ residence: this.residenceid });
    this.newActorAccountForm.patchValue({ ORGmembership: this.orgMembershipId });
    this.newActorAccountForm.patchValue({ singer: this.singerId });
    this.newActorAccountForm.patchValue({ send_me_acting_roles: this.sendactiongRolesId });
    this.newActorAccountForm.patchValue({ drive_licenses: this.driveLicensId });
    if (this.newActorAccountForm.value.Gender == 0) {
      this.newActorAccountForm.patchValue({ gender_tone: this.menToneId });
    }
    if (this.newActorAccountForm.value.Gender == 1) {
      this.newActorAccountForm.patchValue({ gender_tone: this.womenToneId });
    }
    if (
      this.agencyParms
        .map((data: any) => data.Name.toLowerCase())
        .includes(this.newActorAccountForm.value.Name.toLowerCase())
    ) {
      const successMessage = this.translate.instant('There is already an existing agency.');
      this.toastr.error(successMessage);
    } else {
      this.actorAccountService.updateActorAccount(this.newActorAccountForm.value, this.id).subscribe((res) => {
        if (res['status'] == 200) {
          this.newActorAccountForm.patchValue({ Name: '' });
          this.setOtherValue = false;
          this.getUserId();
          this.getPendingChanges();
          this.patchCharacteristics();
          this.saveproceed();
          const successMessage = this.translate.instant('Admin will Approve. We will get back to you after 48 hours');
          this.toastr.success(successMessage);
          this.updateArtistPicOrder();
          this.updateArtistVedioOrder();
          this.actorAgencyParms();
          // this.enableBtn = false;
          this.genderErr = false;
          this.bodyTypeErr = false;
          this.hairColrErr = false;
          this.hairTypeErr = false;
          this.eyeVlErr = false;
          this.skinToneErr = false;
          this.eductnVlErr = false;
          this.genderValErr = false;
          this.rolesValErr = false;
          this.residenceValErr = false;
          this.membersipValErr = false;
          this.licenseValErr = false;
          this.singerValErr = false;
          this.agencyValErr = false;
          this.heightValErr = false;
          this.motherTongueErr = false;

          localStorage.removeItem('setButton');
          if (this.elementMembership) {
            localStorage.setItem('saveBtn', JSON.stringify(true));
            localStorage.setItem('renew', JSON.stringify(true));
            this.actorDetailsService.getAllPaymentOptions().subscribe((data) => {
              this.planTypeResponse = data['data'];
              let plnIds = '';

              if (this.planTypeResponse[0].id) {
                plnIds = this.planTypeResponse[0].id;
              }
              localStorage.setItem('planId', plnIds);
              localStorage.setItem('tellusmore', '1');
              this.router.navigate(['/account-payment']);
            });
          }
        } else {
          if (res['message']['Gender']) {
            this.showTosterMessage(res['message']['Gender'], 'error');
            this.genderErr = true;
          } else {
            this.genderErr = false;
          }
          if (res['message']['Height']) {
            this.showTosterMessage(res['message']['Height'], 'error');
            this.heightValErr = true;
          } else {
            this.heightValErr = false;
          }
          if (res['message']['bodyTypeValue']) {
            const errorMessage = this.translate.instant(res['message']['bodyTypeValue'][0]);
            this.toastr.error(errorMessage);
            this.bodyTypeErr = true;
          } else {
            this.bodyTypeErr = false;
          }
          if (res['message']['hairColorValue']) {
            const errorMessage = this.translate.instant(res['message']['hairColorValue'][0]);
            this.toastr.error(errorMessage);
            this.hairColrErr = true;
          } else {
            this.hairColrErr = false;
          }
          if (res['message']['hairTypeValue']) {
            const errorMessage = this.translate.instant(res['message']['hairTypeValue'][0]);
            this.toastr.error(errorMessage);
            this.hairTypeErr = true;
          } else {
            this.hairTypeErr = false;
          }

          if (res['message']['eyeValue']) {
            const errorMessage = this.translate.instant(res['message']['eyeValue'][0]);
            this.toastr.error(errorMessage);
            this.eyeVlErr = true;
          } else {
            this.eyeVlErr = false;
          }

          if (res['message']['skinToneValue']) {
            const errorMessage = this.translate.instant(res['message']['skinToneValue'][0]);
            this.toastr.error(errorMessage);
            this.skinToneErr = true;
          } else {
            this.skinToneErr = false;
          }

          if (res['message']['AgencyId']) {
            const errorMessage = this.translate.instant(res['message']['AgencyId'][0]);
            this.toastr.error(errorMessage);
            this.agencyValErr = true;
          } else {
            this.agencyValErr = false;
          }

          // if (res['message']['educationValue']) {
          //   this.showTosterMessage(res['message']['educationValue'], 'error');
          //   this.eductnVlErr = true
          // }
          // else{
          //   this.eductnVlErr = false
          // }
          if (res['message']['Value']) {
            const errorMessage = this.translate.instant(res['message']['Value'][0]);
            this.toastr.error(errorMessage);
            this.eductnVlErr = true;
          } else {
            this.eductnVlErr = false;
          }
          if (res['message']['singerValue']) {
            const errorMessage = this.translate.instant(res['message']['singerValue'][0]);
            this.toastr.error(errorMessage);
            this.singerValErr = true;
          } else {
            this.singerValErr = false;
          }

          if (res['message']['motherTongue']) {
            const errorMessage = this.translate.instant(res['message']['motherTongue'][0]);
            this.toastr.error(errorMessage);
            this.motherTongueErr = true;
          } else {
            this.motherTongueErr = false;
          }

          if (res['message']['license_Value']) {
            const errorMessage = this.translate.instant(res['message']['license_Value'][0]);
            this.toastr.error(errorMessage);
            this.licenseValErr = true;
          } else {
            this.licenseValErr = false;
          }

          if (res['message']['membershipValue']) {
            const errorMessage = this.translate.instant(res['message']['membershipValue'][0]);
            this.toastr.error(errorMessage);
            this.membersipValErr = true;
          } else {
            this.membersipValErr = false;
          }

          if (res['message']['residenceValue']) {
            const errorMessage = this.translate.instant(res['message']['residenceValue'][0]);
            this.toastr.error(errorMessage);
            this.residenceValErr = true;
          } else {
            this.residenceValErr = false;
          }

          if (res['message']['roles_Value']) {
            const errorMessage = this.translate.instant(res['message']['roles_Value'][0]);
            this.toastr.error(errorMessage);
            this.rolesValErr = true;
          } else {
            this.rolesValErr = false;
          }

          if (res['message']['gender_tone_Value']) {
            const errorMessage = this.translate.instant(res['message']['gender_tone_Value'][0]);
            this.toastr.error(errorMessage);
            this.genderValErr = true;
          } else {
            this.genderValErr = false;
          }
          if (res['message']['agencyName']) {
            const errorMessage = this.translate.instant(res['message']['agencyName'][0]);
            this.toastr.error(errorMessage);
            this.agencyValErr = true;
          } else {
            this.agencyValErr = false;
          }
        }
      });
    }
  }

  /**
   * actorBodyType
   * to get list of body type params
   */
  actorBodyType() {
    this.searchService.getActorsBodyparams(1).subscribe((data) => {
      this.bodyTypeList = data['data'];
    });
  }

  /**
   * actorHairColor
   * to get hair color params
   */
  actorHairColor() {
    this.searchService.getActorsBodyparams(2).subscribe((data) => {
      this.hairColorList = data['data'];
    });
  }

  /**
   * actorHairType
   * to get hair type params
   */
  actorHairType() {
    this.searchService.getActorsBodyparams(4).subscribe((data) => {
      this.hairTypeList = data['data'];
    });
  }

  /**
   * actorEyesType
   * to get eyes params
   */
  actorEyesType() {
    this.searchService.getActorsBodyparams(3).subscribe((data) => {
      this.eyeTypeList = data['data'];
    });
  }

  /**
   * actorSkinTone
   * to get skin tone params
   */
  actorSkinTone() {
    this.searchService.getActorsBodyparams(5).subscribe((data) => {
      this.skinToneList = data['data'];
    });
  }

  /**
   * actorAgencyParms
   * to get agency list
   */
  actorAgencyParms() {
    this.searchService.getActorAgencyParms().subscribe((data) => {
      this.agencyParms = data['data'];
      this.agencyParms.sort((a: any, b: any) => {
        if (a.Name === 'ללא יצוג') {
          return -1;
        } else if (b.Name === 'ללא יצוג') {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  /**
   * actorEducationLevels
   * to get education level list
   */
  actorEducationLevels() {
    this.searchService.getActorCharacteristicByType('Languages').subscribe((data) => {
      this.eduLevels = data['data'];
    });
  }

  /**
   * getSkillList
   * to get skill list
   */
  getSkillList() {
    this.searchService.getSkillList().subscribe((data) => {
      this.skillList = data['data'];
    });
  }

  updateActorAccount(value: any) {
    let body = {};

    this.actorAccountService.updateActorAccount(body, ``).subscribe((response) => {});
  }

  submitActorLink() {
    this.createActorLink();
  }
  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  displayProps() {
    this.showmoreBtn = !this.showmoreBtn;
  }

  /**
   * getUserId
   * to get logged in user data
   * to get current actor account data
   * to patch desired values
   */
  getUserId() {
    const userID = localStorage.getItem('userId');
    const artistID = localStorage.getItem('artistID');
    this.userId = userID;
    this.artistToken = artistID;
    let imgs: any = [];
    if (userID) {
      let encoded: string = btoa(this.artistToken);
      this.encodedToken = encoded;
      this.getPendingChanges();

      this.actorDetailsService.getActorDetials(encoded).subscribe((data) => {
        this.actiorDetails = data['data'];
        const membershipExpiryDate = this.actiorDetails['membershipExpiryDate'];

        const currentDate = new Date();
        if (membershipExpiryDate) {
          const expirationDate = new Date(membershipExpiryDate);
          if (currentDate > expirationDate) {
            // this.Membership =  document.getElementById("expiredNot")
            this.elementMembership = true;
          } else {
            this.elementMembership = false;
          }
        }

        this.resumeActor = this.actiorDetails.Resume;
        this.updateRes = this.resumeActor ? true : false;
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

        this.audioObjects.forEach((audioObj) => {
          const audio = new Audio(audioObj.src);

          audio.addEventListener('loadedmetadata', () => {
            audioObj.duration = audio.duration;
          });
        });

        this.artistPictures = this.actiorDetails.artistPicturesAll;

        this.actorAccountService.setData(this.artistPictures[0]);

        if (this.saveBtn) {
          if (this.artistPictures.length > 0) {
            this.enableBtn = true;
            localStorage.removeItem('enableSideBar');
            this.actorAccountService.sidebarEnable('sidebarEnable');
          } else {
            this.enableBtn = false;
          }
        }

        if (this.enableSide && this.saveBtn) {
          if (localStorage.getItem('unshowingFirstpopup')) {
            // if (this.actiorDetails.skills[0]?.catName == null || !this.actiorDetails.skills) {
            this.pictures = document.getElementById('pictures');
            this.nonMandatorySkillsRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              this.renderer.selectRootElement(this.popupButton.nativeElement).click();
              localStorage.removeItem('unshowingFirstpopup');
            }, 100);
            // }
          }
          if (!this.artistPictures.length) {
            localStorage.setItem('secondPopup', JSON.stringify(true));
          } else {
            localStorage.removeItem('secondPopup');
          }
        }

        this.skillsLength = this.actiorDetails.skills.length;
        this.actiorDetails.skills.map((data: any) => {
          if (this.skillsLength > 10) {
            this.showmoreBtn = true;
          }
        });

        let skillsselected = this.actiorDetails.skills.filter((data: any) => {
          return data.id == `${environment.eduCationLevelId}`;
        });
        let eduLevel: any | null;
        skillsselected.map((data: any) => {
          eduLevel = data['Prop5Value'];
        });

        this.pendingChanges.forEach((data: any) => {
          if (data.parentId == `${environment.eduCationLevelId}`) {
            eduLevel = data.newChildId;
          }
        });

        this.selectedValue = eduLevel;

        // residence
        let residenceselected = this.actiorDetails.skills.filter((data: any) => {
          return data.id == `${environment.residenceId}`;
        });
        let residence: any | null;
        residenceselected.map((data: any) => {
          residence = data['Prop5Value'];
        });
        this.pendingChanges.forEach((data: any) => {
          if (data.parentId == `${environment.residenceId}`) {
            residence = data.newChildId;
          }
        });

        this.residenceSelectVal = residence;

        // ORGmembership
        let ORGmembershipVal = this.actiorDetails.skills.filter((data: any) => {
          return data.id == `${environment.org_membershipId}`;
        });
        let ORGmembership: any | null;
        ORGmembershipVal.map((data: any) => {
          ORGmembership = data['Prop5Value'];
        });
        this.pendingChanges.forEach((data: any) => {
          if (data.parentId == `${environment.org_membershipId}`) {
            ORGmembership = data.newChildId;
          }
        });

        this.ORGSelectValue = ORGmembership;

        // singer
        let singerVal = this.actiorDetails.skills.filter((data: any) => {
          return data.id == `${environment.singerId}`;
        });
        let singer: any | null;
        singerVal.map((data: any) => {
          singer = data['Prop5Value'];
        });
        this.pendingChanges.forEach((data: any) => {
          if (data.parentId == `${environment.singerId}`) {
            singer = data.newChildId;
          }
        });

        this.singerSelectValue = singer;

        // sendRoles
        let sendRolesVal = this.actiorDetails.skills.filter((data: any) => {
          return data.id == `${environment.send_me_acting_rolesId}`;
        });
        let send_me_acting_roles: any | null;
        sendRolesVal.map((data: any) => {
          send_me_acting_roles = data['Prop5Value'];
        });
        this.pendingChanges.forEach((data: any) => {
          if (data.parentId == `${environment.send_me_acting_rolesId}`) {
            send_me_acting_roles = data.newChildId;
          }
        });

        this.sendRolesSelectValue = send_me_acting_roles;

        // mentone value
        let mentoneVal = this.actiorDetails.skills.filter((data: any) => {
          return data.id == `${environment.men_toneId}`;
        });
        let men_tone: any | null;
        mentoneVal.map((data: any) => {
          men_tone = data['Prop5Value'];
        });

        this.menToneSelectVal = men_tone;

        // womentone value
        let wmentoneVal = this.actiorDetails.skills.filter((data: any) => {
          return data.id == `${environment.woman_toneId}`;
        });
        let women_tone: any | null;
        wmentoneVal.map((data: any) => {
          women_tone = data['Prop5Value'];
        });

        this.womantoneselectVal = women_tone;
        const genderMappings = {
          0: { label: 'Men Tone', options: this.menToneOptions },
          1: { label: 'Women Tone', options: this.womenToneOptions },
        };
        const gender = this.actiorDetails.Gender;
        if (gender in genderMappings) {
          const { label, options } = genderMappings[gender];
          this.genderLabelTranslationKey = label;
          this.currentGenderOptions = options;
        }
        // drive liscense
        let driveliscenceVal = this.actiorDetails.skills.filter((data: any) => {
          return data.id == `${environment.drive_licensesId}`;
        });
        let drive_licenses: any | null;
        driveliscenceVal.map((data: any) => {
          drive_licenses = data['Prop5Value'];
        });
        this.pendingChanges.forEach((data: any) => {
          if (data.parentId == `${environment.drive_licensesId}`) {
            drive_licenses = data.newChildId;
          }
        });

        this.driveSelectedVal = drive_licenses;
        this.patchCharacteristics();
        this.artistPictures = this.actiorDetails.artistPicturesAll;
        this.embedVedio = this.actiorDetails.Embed;
        if (this.saveBtn) {
          if (this.embedVedio.length > 0) {
            this.videoEnableBtn = true;
          }
        }
        const artistPictures = of(this.actiorDetails.artistPicturesAll);
        artistPictures.subscribe(function (val: any) {});

        if (data['data']['charValuesData'].length) {
          this.getCharValues(data['data']['charValuesData']);
        }

        if (data['data']['skills'].length) {
          this.getSkillValues(data['data']['skills']);
        }

        if (this.actiorDetails.artistPicturesAll.length) {
          let imageData = this.actiorDetails.artistPicturesAll;
          imageData.forEach(function (this: typeof imageData, value: any) {
            imgs.push(value.picOrder);
          });
          this.imgs = imgs;
        }

        this.patchCharacteristics();
        this.checkFormValidity();
      });
    }
  }

  /**
   * getCharValues
   * @param charValues
   *
   * to get actor saved characteristics
   */
  getCharValues(charValues: any) {
    let actorBTypeData: any | null;
    let actorHcData: any | null;
    let actoreyTypeData: any | null;
    let actorHrTypeData: any | null;
    let actorSkTypeData: any | null;
    charValues.forEach(function (obj: any, index: any) {
      // body type
      if (obj.CharacteristicId == 1) {
        actorBTypeData = obj.Id;
      } else if (obj.CharacteristicId == 2) {
        // hair color
        actorHcData = obj.Id;
      } else if (obj.CharacteristicId == 3) {
        // eye type
        actoreyTypeData = obj.Id;
      } else if (obj.CharacteristicId == 4) {
        // hair type
        actorHrTypeData = obj.Id;
      } else if (obj.CharacteristicId == 5) {
        // skin tone
        actorSkTypeData = obj.Id;
      }
    });

    if (this.pendingChanges) {
      this.pendingChanges.forEach((data: any) => {
        if (data.Type == 2) {
          if (data.Label == 'Body type' || data.Label == 'גוף') actorBTypeData = data.newChildId;
          if (data.Label == 'Hair' || data.Label == 'שיער') actorHcData = data.newChildId;
          if (data.Label == 'Hair type' || data.Label == 'סוג שיער') actorHrTypeData = data.newChildId;
          if (data.Label == 'Eyes' || data.Label == 'עיניים') actoreyTypeData = data.newChildId;
          if (data.Label == 'Skin tone' || data.Label == 'גוון עור') actorSkTypeData = data.newChildId;
        }
      });
      if (!this.saveBtn) {
        this.bodySelect = Boolean(actorBTypeData);
        this.hairSelect = Boolean(actorHcData);
        this.hairTypeSelect = Boolean(actorHrTypeData);
        this.eyesSelect = Boolean(actoreyTypeData);
        this.skintoneSelect = Boolean(actorSkTypeData);
      }
    }
    this.actorBodyTypeData = actorBTypeData;
    this.actorHairClrTypeData = actorHcData;
    this.actorEyeTypeData = actoreyTypeData;
    this.actorhairTypeData = actorHrTypeData;
    this.actorSkinTypeData = actorSkTypeData;
    this.patchCharacteristics();
  }

  /**
   * getSkillValues
   * @param skillValues
   *
   * to get actor language skills
   */
  getSkillValues(skillValues: any) {
    let skillSetLang: any | null;
    skillValues.forEach(function (obj: any, index: any) {
      if (obj.catName == 'Languages') {
        skillSetLang = obj.id;
      }
    });
    this.languageSkill = skillSetLang;
  }

  createActorLink() {
    this.isButtonClicked = true;
    this.actorAccountService.createLink(this.newLinkForm.value).subscribe((res) => {
      if (res['status'] == 400) {
        this.showTosterMessage(res['message'], 'error');
      } else {
        if (this.language == 'he-IL') {
          this.toastr.success('', 'הקישור שלך הועלה וממתין לאישור.');
        } else {
          this.toastr.success('', 'Your link was uploaded and is waiting for approval.');
        }
        this.newLinkForm = this.formBuilder.group({
          user_id: this.userId,
          link: ['', Validators.required],
          title: ['', Validators.required],
        });
        this.getActorDetails();
      }
    });
    setTimeout(() => {
      this.isButtonClicked = false;
    }, 2500);
  }

  deleteActorLink(id: any) {
    this.actorAccountService.deleteLinks(id).subscribe((res) => {
      if (res['status'] == 400) {
        this.showTosterMessage(res['message'], 'error');
      } else {
        if (this.language == 'he-IL') {
          this.toastr.success('', 'הקישור נמחק בהצלחה');
        } else {
          this.toastr.success('', 'Link has been deleted successfully');
        }
        this.getActorDetails();
      }
    });
  }
  // to get selected skill
  /**
   * getSkill
   * @returns
   * onchage to get skill for adding
   */
  getSkill() {
    let skillID = this.selectedSkill;

    if (!skillID) {
      this.showTosterMessage('Please select a skill', 'error');
      const successMessage = this.translate.instant('Please select a skill');
      this.toastr.success(successMessage);

      return;
    }
    this.newSkillForm.patchValue({ ArtistId: this.artistToken, Prop5Id: skillID });

    this.actorAccountService.updateSkillSet(this.newSkillForm.value).subscribe((res) => {
      this.getUserId();

      if (res['status'] == 200) {
        this.getUserId();
        if (this.language == 'he-IL') {
          this.toastr.success('מיומנות חדשה נוספה');
        }
        this.showTosterMessage('New skill has been added.', 'success');
      } else {
        this.showTosterMessage(res['message'], 'error');
      }
    });
  }

  openConfirmDelete(content: any, linkId: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteActorLink(linkId);
      }
    });
  }

  openAddLink(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }
  // to delete selected skill
  /**
   * deleteSkill
   * @param sID
   *
   * to delete an unwanted skill
   */
  deleteSkill(sID: number) {
    if (confirm('Are you sure to delete this skill?')) {
      this.actorAccountService.deleteSkillSet(sID).subscribe((res) => {
        if (res['status'] == 200) {
          this.getUserId();
          const successMessage = this.translate.instant(res['message']);
          this.toastr.success(successMessage);
        } else {
          const successMessage = this.translate.instant(res['message']);
          this.toastr.error(successMessage);
        }
      });
    }
  }

  deleteUnapprovedSkills(id: any) {
    if (confirm('Are you sure to delete this skill?')) {
      this.actorAccountService.deleteUnapprovedSkills(id).subscribe((res) => {
        if (res['status'] == 200) {
          this.getPendingChanges();
          const successMessage = this.translate.instant(res['message']);
          this.toastr.success(successMessage);
        } else {
          const successMessage = this.translate.instant(res['message']);
          this.toastr.error(successMessage);
        }
      });
    }
  }

  /**
   * updateSkillRate
   * @param sID
   * @param rating
   *
   * to update the skill rating
   */
  updateSkillRate(sID: number, rating: number) {
    this.newRatingForm.patchValue({ Id: sID, Value: rating });

    this.actorAccountService.updateSkillRating(this.newRatingForm.value).subscribe((res) => {
      if (res['status'] == 200) {
        this.getUserId();
        this.showTosterMessage('Rating has been updated successfully', 'success');
      } else {
        this.showTosterMessage(res['message'], 'error');
      }
    });
  }

  /**
   * showTosterMessage
   * @param response
   * @param type
   *
   * general function for toast message display.
   */
  showTosterMessage(response: any, type: any) {
    if (type == 'error') {
      this.toastr.error(response, 'Error!');
    }
    if (type == 'success') {
      this.toastr.success(response, 'Success!');
    }

    if (typeof response['title'] !== 'undefined' && type !== 'success') {
      this.toastr.error('title', response['title'][0]);
    }

    if (typeof response['link'] !== 'undefined' && type !== 'success') {
      this.toastr.error('', response['link'][0]);
    }
  }

  /**
   * to patch form values
   */
  patchCharacteristics() {
    if (this.actiorDetails.Gender) {
      this.genderselect = true;
    }

    let formHairtypevalue = this.newActorAccountForm.value.hairTypeValue;
    let formHeightValue = this.newActorAccountForm.value.Height;
    let formBodyTypeValue = this.newActorAccountForm.value.bodyTypeValue;
    let formhaiarColorValue = this.newActorAccountForm.value.hairColorValue;
    let formEyeValue = this.newActorAccountForm.value.eyeValue;
    let formSkinToneValue = this.newActorAccountForm.value.skinToneValue;
    let formAgencyValue = this.newActorAccountForm.value.AgencyId;
    let formSelValueValue = this.newActorAccountForm.value.Value;
    let formSingerValue = this.newActorAccountForm.value.singerValue;
    let formGenderToneValue = this.newActorAccountForm.value.gender_tone_Value;
    let formLicenseValue = this.newActorAccountForm.value.license_Value;
    let formRolesValueValue = this.newActorAccountForm.value.roles_Value;
    let formmembershipValueValue = this.newActorAccountForm.value.membershipValue;
    let formresidenceValueValue = this.newActorAccountForm.value.residenceValue;
    let formmotherTongueValue = this.newActorAccountForm.value.motherTongue;
    let formAgencynamevalue = this.newActorAccountForm.value.Name;

    if (formAgencynamevalue == '' || formAgencynamevalue == null) {
      formAgencyValue = null;
    }
    this.newActorAccountForm.patchValue({
      Id: this.artistToken,
      Gender: this.actiorDetails.Gender,
      Height: formHeightValue ? formHeightValue : this.actiorDetails.Height != 0 ? this.actiorDetails.Height : '',
      bodyTypeValue: formBodyTypeValue ? formBodyTypeValue : this.actorBodyTypeData ?? '',
      hairColorValue: formhaiarColorValue ? formhaiarColorValue : this.actorHairClrTypeData ?? '',
      hairTypeValue: formHairtypevalue ? formHairtypevalue : this.actorhairTypeData ?? '',
      eyeValue: formEyeValue ? formEyeValue : this.actorEyeTypeData ?? '',
      skinToneValue: formSkinToneValue ? formSkinToneValue : this.actorSkinTypeData ?? '',
      AgencyId: formAgencyValue
        ? formAgencyValue
        : this.actiorDetails.AgencyId !== 0
        ? this.actiorDetails.AgencyId
        : '',
      Value: formSelValueValue ? formSelValueValue : this.selectedValue ?? '',
      singerValue: formSingerValue ? formSingerValue : this.singerSelectValue ?? '',
      gender_tone_Value: formGenderToneValue
        ? formGenderToneValue
        : this.menToneSelectVal ?? this.womantoneselectVal ?? '',
      license_Value: formLicenseValue ? formLicenseValue : this.driveSelectedVal ?? '',
      roles_Value: formRolesValueValue ? formRolesValueValue : this.sendRolesSelectValue ?? '',
      membershipValue: formmembershipValueValue ? formmembershipValueValue : this.ORGSelectValue ?? '',
      residenceValue: formresidenceValueValue ? formresidenceValueValue : this.residenceSelectVal ?? '',
      motherTongue: formmotherTongueValue ? formmotherTongueValue : this.actiorDetails.mother_tongue ?? '',
    });
  }

  /**
   * updatePicOrder
   * @param sID
   * @param picOrder
   *
   * to update pic order
   */
  updatePicOrder(sID: number, picOrder: any) {
    this.newImageForm.patchValue({ Id: sID, PicOrder: picOrder, ArtistId: this.artistToken });

    this.actorAccountService.updatePicOrder(this.newImageForm.value).subscribe((res) => {
      if (res['status'] == 200) {
        this.getUserId();
        const successMessage = this.translate.instant('Picture order has been updated successfully');
        this.toastr.success(successMessage);
      } else {
        const successMessage = this.translate.instant(res['message']);
        this.toastr.error(successMessage);
      }
    });
  }
  /**
   *
   * @return response()
   */
  get f() {
    return this.newImageUploadForm.controls;
  }

  /**
   *
   * @return response()
   */
  get im() {
    return this.newResumeUploadForm.controls;
  }

  /**
   *
   * @return response()
   */
  get emAu() {
    return this.newAudioUploadForm.controls;
  }

  /**
   *
   * @return response()
   */
  get vdForm() {
    return this.newVideoUploadForm.controls;
  }

  /**
   * onFileChange
   * image upload function
   *
   * @return response()
   */
  onFileChange(event: any) {
    this.imageChangedEvent = event;
    this.fileLength = event.target.files.length;
    if (this.fileLength > 0) {
      this.isButtonClicked = false;
    }
    if (
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/jpg' ||
      event.target.files[0].type === 'image/png'
      // event.target.files[0].type === 'image/svg' ||
      // event.target.files[0].type === 'image/gif' ||
      // event.target.files[0].type === 'image/tiff'
    ) {
      if (event.target.files[0].size <= 10485760) {
        if (event.target.files.length > 0) {
          this.uploadImg = true;
          this.messageAlert = false;
          const reader = new FileReader();
          this.filedata = event.target.files[0];

          const [file] = event.target.files;
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageSrc = reader.result as string;
            this.newImageUploadForm.patchValue({
              ArtistId: this.artistToken,
            });
          };
        }
      } else if (event.target.files[0].size > 10485760) {
        const successMessage = this.translate.instant('Please Upload File less than 10MB');
        this.toastr.error(successMessage);
        this.messageAlert = true;
      }
    } else {
      this.messageAlert = false;
      const successMessage = this.translate.instant('File type not supported');
      this.toastr.error(successMessage);
    }

    // const reader = new FileReader();

    // if (event.target.files && event.target.files.length) {
    //   this.filedata = event.target.files[0];
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.imageSrc = reader.result as string;
    //     this.newImageUploadForm.patchValue({
    //       ArtistId: this.artistToken,
    //     });
    //   };
    // }
  }

  /**
   * openImageModal
   * for open image upload modal
   */
  openImageModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  /**
   * updateImage
   * to add new actor images to the gallery
   */

  updateImage() {
    this.isButtonClicked = true;
    const rotatedImageData = this.dataURItoBlob(this.croppedEvent);
    var myFormData = new FormData();
    myFormData.append('FileName', rotatedImageData);
    myFormData.append('ArtistId', this.artistToken);

    let initialCount = this.actiorDetails.MaxPictures;
    let currentCount = this.actiorDetails.artistPicturesAll.length;

    if (currentCount < initialCount) {
      this.actorAccountService.updateActorImage(myFormData).subscribe((res) => {
        if (res['status'] == 200) {
          this.getUserId();
          this.closeModal('imageModelClose');
          const successMessage = this.translate.instant('Your pic was uploaded and is waiting for approval');
          this.toastr.success(successMessage);
          this.croppedEvent = '';
          this.croppedImage = '';
          this.imageChangedEvent = '';
          this.myInputVariable.nativeElement.value = '';
        } else {
          const successMessage = this.translate.instant(res['message']);
          this.toastr.error(successMessage);
        }

        setTimeout(() => {
          this.isButtonClicked = false;
        }, 2500);
      });
    } else {
      const successMessage = this.translate.instant(
        `cannot upload more than ${this.actiorDetails.MaxPictures}pictures`
      );
      this.toastr.error(successMessage);
    }
    this.newImageUploadForm.controls['FileName'].reset();
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

  /**
   * deleteActorImage
   * @param imID
   *
   * to delete an image
   */
  deleteActorImage(imID: number) {
    if (confirm('Are you sure to delete this image?')) {
      this.actorAccountService.deleteActorImage(imID).subscribe((res) => {
        if (res['status'] == 200) {
          this.getUserId();
          // this.actorAccountService.setData(this.artistPictures[0]);
          const successMessage = this.translate.instant(res['message']);
          this.toastr.success(successMessage);
          this.getUserId();
          this.actorAccountService.setActordetails(this.artistPictures);
        } else {
          this.showTosterMessage(res['message'], 'error');
        }
      });
    }
  }

  /**
   * openResumeModal
   * for open resume upload modal
   */
  openResumeModal(content: any) {
    if (content) {
      this.resumeUpdate = true;
    }

    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  /**
   * updateResume
   *
   * to update resumes
   */
  updateResume() {
    this.isButtonClicked = true;
    var myFormData = new FormData();
    myFormData.append('resume_path', this.resumedata);
    myFormData.append('Id', this.artistToken);

    this.actorAccountService.updateActorResume(myFormData).subscribe((res) => {
      if (res['status'] == 200) {
        this.getUserId();
        const successMessage = this.translate.instant('Resume has been updated successfully');
        this.toastr.success(successMessage);
        this.closeModal('resumeModelClose');
      } else if (res['status'] == 400) {
        if (typeof res['message']['resume_path'] !== 'undefined') {
          const successMessage = this.translate.instant(res['message']['resume_path'][0]);
          this.toastr.error(successMessage);
        }
      } else {
        const successMessage = this.translate.instant(res['message']);
        this.toastr.error(successMessage);
      }
      setTimeout(() => {
        this.isButtonClicked = false;
      }, 2500);
    });

    // if (this.resumedata) {
    //   this.updateRes = true;
    // }
    // else{
    //   this.updateRes = false;

    // }
  }

  /**
   * onResumeFileChange
   * resume upload function
   *
   * @return response()
   */
  onResumeFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.resumedata = event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newResumeUploadForm.patchValue({
          Id: this.artistToken,
        });
      };
    }
  }

  /**
   * openAudioModal
   * for open audio input modal
   */
  openAudioModal(content: any) {
    this.newAudioUploadForm.patchValue({ ArtistId: this.artistToken });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  /**
   * addAudio
   *
   * to upload an audio url
   */
  addAudio() {
    this.isButtonClicked = true;
    let initialCount = this.actiorDetails.MaxSounds;
    let currentCount = this.actiorDetails.artistVocals?.length;
    if (currentCount < initialCount) {
      this.actorAccountService.addVocalEmbed(this.newAudioUploadForm.value).subscribe((res) => {
        if (res['status'] == 200) {
          this.errormsg = false;
          this.getUserId();
          const successMessage = this.translate.instant(res['message']);
          this.toastr.success(successMessage);
          this.closeModal('audioModelClose');
        } else if (res['status'] == 400) {
          if (typeof res['message']['Embed'] !== 'undefined') {
            this.toastr.error(res['message']['Embed'][0], 'error');
          }
        } else {
          this.toastr.error(res['message'], 'error');
        }
      });
    } else {
      const successMessage = this.translate.instant(
        `you cannot upload more than ${this.actiorDetails.MaxSounds} vocals`
      );
      this.toastr.error(successMessage);
    }
    setTimeout(() => {
      this.isButtonClicked = false;
    }, 2500);
    this.newAudioUploadForm.controls['Embed'].reset();
  }

  /**
   * openVidioModal
   * for open video input modal
   */
  openVideoModal(content: any) {
    this.newVideoUploadForm.patchValue({ ArtistId: this.artistToken });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  addVidio() {
    this.isButtonClicked = true;
    let initialCount = this.actiorDetails.MaxVideos;
    let currentCount = this.actiorDetails.artistEmbeds.length;

    if (currentCount < initialCount) {
      let base: string;
      let vdurl = this.newVideoUploadForm.value.Embed;

      if (vdurl.includes('youtu') || vdurl.includes('soundcloud') || vdurl.includes('vimeo')) {
        this.actorAccountService.addVideoEmbed(this.newVideoUploadForm.value).subscribe((res) => {
          if (res['status'] == 200) {
            this.getUserId();
            const successMessage = this.translate.instant('Your link was uploaded and is waiting for approval');
            this.toastr.success(successMessage);
            this.closeModal('videoModelClose');

            this.newVideoUploadForm.reset();
          } else if (res['status'] == 400) {
            if (typeof res['message']['Embed'] !== 'undefined') {
              this.toastr.error(res['message']['Embed'][0], 'error');
            }
          } else {
            this.toastr.error(res['message'], 'error');
          }
        });
      } else {
        this.toastr.error('Only Youtube or Vimeo videos supported');
      }
    } else {
      this.toastr.error(`you cannot upload more than ${this.actiorDetails.MaxVideos}videos`);
    }
    setTimeout(() => {
      this.isButtonClicked = false;
    }, 2500);
    this.newVideoUploadForm.controls['Embed'].reset();
  }

  /**
   * playVideo
   * for open video input modal
   */
  playVideo(content: any, src: any, type: any) {
    this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    this.playerType = type;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  /**
   * deleteAudio
   * @param audioID
   *
   * to delete an image
   */
  deleteAudio(audioID: number) {
    if (confirm('Are you sure to delete this audio?')) {
      this.actorAccountService.deleteActorAudio(audioID).subscribe((res) => {
        if (res['status'] == 200) {
          this.getUserId();
          const successMessage = this.translate.instant(res['message']);
          this.toastr.success(successMessage);
        } else {
          const successMessage = this.translate.instant(res['message']);
          this.toastr.error(successMessage);
        }
      });
    }
  }

  /**
   * deleteAudio
   * @param videoID
   *
   * to delete an image
   */
  deleteVideo(videoID: number) {
    if (confirm('Are you sure to delete this video?')) {
      this.actorAccountService.deleteActorVideo(videoID).subscribe((res) => {
        if (res['status'] == 200) {
          this.getUserId();
          const successMessage = this.translate.instant(res['message']);
          this.toastr.success(successMessage);
        } else {
          const successMessage = this.translate.instant(res['message']);
          this.toastr.error(successMessage);
        }
      });
    }
  }

  clearModal() {
    this.croppedImage = '';
    this.imageChangedEvent = '';
  }

  closeModal(idElm: any) {
    let Membership: HTMLElement = document.getElementById(idElm) as HTMLElement;
    Membership.click();
    this.clearModal();
  }

  closeModall(content: any) {
    this.modalService.dismissAll(content);
    this.canvasRotation = 0;
    this.clearModal();
  }

  /**
   * openResumeModal
   * for open resume upload modal
   */
  openResumeTextModal(content: any) {
    this.newResumeTextForm.patchValue({ Resume: this.actiorDetails.Resume });
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  /**
   *
   */
  submitResumeTextForm() {
    this.newResumeTextForm.patchValue({ user_id: this.userId });

    this.actorAccountService.updateResumeText(this.newResumeTextForm.value).subscribe((res) => {
      if (res['status'] == 200) {
        this.getUserId();
        const successMessage = this.translate.instant(res['message']);
        this.toastr.success(successMessage);
        this.closeModal('rTextModelClose');
      } else {
        const successMessage = this.translate.instant(res['message']);
        this.toastr.error(successMessage);
      }
    });
  }

  updateArtistPicOrder() {
    let actImages: any = [];

    if (this.actiorDetails.artistPicturesAll.length) {
      let imageData = this.actiorDetails.artistPicturesAll;
      imageData.forEach(function (this: typeof imageData, value: any) {
        actImages.push(value.id);
      });
    }

    let actImagedata = JSON.stringify(actImages);

    this.actorAccountService.updateArtistPicOrder(actImagedata).subscribe((res) => {});
  }
  updateArtistVedioOrder() {
    let vedios: any = [];

    if (this.actiorDetails.Embed.length) {
      let imageData = this.actiorDetails.Embed;
      imageData.forEach(function (this: typeof imageData, value: any) {
        vedios.push(value.id);
      });
    }

    let vedioData = JSON.stringify(vedios);
    this.actorAccountService.updateArtistVedioOrder(vedioData).subscribe((res) => {});
  }

  async getAllPropsData() {
    let response: any;
    this.propsData = [];
    response = await this.actorAccountService.getAllPropsData().toPromise();
    if (response && (response.status == 'success' || response.status == '200') && response.data) {
      this.edulevel = response.data.filter((data: any) => {
        if (data.Id == `${environment.eduCationLevelId}`) {
          return data;
        }
      });
      this.educationId = this.edulevel[0]?.id;
      this.educationLevel = this.edulevel?.filter((data: any) => {
        return data.options;
      });
      this.educationLevel = this.educationLevel[0]?.options.filter((item: any) => {
        return item.value;
      });

      this.languageSet = response.data.filter((data: any) => data.parentId === 110);
      // residence
      const residence = response.data.filter((data: any) => {
        if (data.Id == `${environment.residenceId}`) {
          return data;
        }
      });
      this.residenceid = residence[0]?.id;
      this.residenceOptions = residence?.filter((data: any) => {
        return data.options;
      });
      this.residenceOptions = this.residenceOptions[0]?.options.filter((item: any) => {
        return item.value;
      });

      // org membership
      const org_membership = response.data.filter((data: any) => {
        if (data.Id == `${environment.org_membershipId}`) {
          return data;
        }
      });
      this.orgMembershipId = org_membership[0]?.id;
      this.orgOptions = org_membership?.filter((data: any) => {
        return data.options;
      });
      this.orgOptions = this.orgOptions[0]?.options.filter((item: any) => {
        return item.value;
      });

      // send me acting roles
      const sendactiongRoles = response.data.filter((data: any) => {
        if (data.Id == `${environment.send_me_acting_rolesId}`) {
          return data;
        }
      });
      this.sendactiongRolesId = sendactiongRoles[0]?.id;
      this.sendRolesOptions = sendactiongRoles?.filter((data: any) => {
        return data.options;
      });
      this.sendRolesOptions = this.sendRolesOptions[0]?.options.filter((item: any) => {
        return item.value;
      });

      // men tone
      const menTone = response.data.filter((data: any) => {
        if (data.Id == `${environment.men_toneId}`) {
          return data;
        }
      });
      this.menToneId = menTone[0]?.id;
      this.menToneOptions = menTone?.filter((data: any) => {
        return data.options;
      });
      this.menToneOptions = this.menToneOptions[0]?.options.filter((item: any) => {
        return item.value;
      });

      if (this.actiorDetails.Gender == 0) {
        this.genderLabelTranslationKey = 'Men Tone';
        this.currentGenderOptions = this.menToneOptions;
      }

      // woman tone
      const womenTone = response.data.filter((data: any) => {
        if (data.Id == `${environment.woman_toneId}`) {
          return data;
        }
      });
      this.womenToneId = womenTone[0]?.id;
      this.womenToneOptions = womenTone?.filter((data: any) => {
        return data.options;
      });
      this.womenToneOptions = this.womenToneOptions[0]?.options.filter((item: any) => {
        return item.value;
      });

      if (this.actiorDetails.Gender == 1) {
        this.genderLabelTranslationKey = 'Women Tone';
        this.currentGenderOptions = this.womenToneOptions;
      }

      // drive licenses
      const driveLicens = response.data.filter((data: any) => {
        if (data.Id == `${environment.drive_licensesId}`) {
          return data;
        }
      });
      this.driveLicensId = driveLicens[0]?.id;
      this.driveLicenseOptions = driveLicens?.filter((data: any) => {
        return data.options;
      });
      this.driveLicenseOptions = this.driveLicenseOptions[0]?.options.filter((item: any) => {
        return item.value;
      });

      // singer
      const singer = response.data.filter((data: any) => {
        if (data.Id == `${environment.singerId}`) {
          return data;
        }
      });
      this.singerId = singer[0]?.id;
      this.singerOptions = singer?.filter((data: any) => {
        return data.options;
      });
      this.singerOptions = this.singerOptions[0]?.options.filter((item: any) => {
        return item.value;
      });

      // prop5 values
      this.newProp5 = [];
      response.data.forEach((e: any) => {
        e.isExpanded = false;
        if (!e.parentId) {
          if (!e.options.map((e: any) => e.value).some((x: any) => isNaN(+x))) e.allNum = true;
          else {
            e.allNum = false;
            e.options = e.options.filter(
              (ele: any) => ele.value != '' && ele.value != '1' && ele.value != ' ' && ele.value != null
            );
          }
          let childProps = response.data.filter((f: any) => f.parentId === e.id);

          childProps.forEach((ele: any) => {
            ele.isExpanded = false;
            if (ele.options.map((e: any) => e.value).some((x: any) => isNaN(+x))) {
              ele.allNum = false;
              ele.options = ele.options.filter(
                (e: any) => e.value != '' && e.value != '1' && e.value != ' ' && e.value != null
              );
            } else ele.allNum = true;
          });
          this.newProp5.push({
            ...e,
            child: childProps,
          });

          this.newProp5 = this.newProp5.filter((data: any) => {
            //return data.prop5Name != 'Specialization';
            return (
              data.Id != `${environment.eduCationLevelId}` &&
              data.Id != `${environment.residenceId}` &&
              data.Id != `${environment.org_membershipId}` &&
              data.Id != `${environment.send_me_acting_rolesId}` &&
              data.Id != `${environment.men_toneId}` &&
              data.Id != `${environment.woman_toneId}` &&
              data.Id != `${environment.drive_licensesId}` &&
              data.Id != `${environment.singerId}` &&
              data.is_enabled != 0
            );
          });
        }
      });
    }
  }

  toggleExpand(prop: any) {
    prop.isExpanded = !prop.isExpanded;
  }
  clearSelectedVal(prop: any) {
    delete prop.selectedVal;
  }

  async saveCapabilities(optionID: any, proParent: any, selId: any) {
    this.saveCapblty = true;
    this.slctVal = proParent.selectedVal;

    await this.delayFn(1000);
    let finalData: any = [];
    this.newProp5.forEach((parent) => {
      if (parent.selectedVal) {
        finalData = [];
        finalData.push(parent);
      }
      if (parent.child.length > 0) {
        let childEntries = parent.child.filter((e: any) => e.selectedVal);

        if (childEntries.length > 0)
          childEntries.filter((c: any) => {
            if (c.id == selId) {
              finalData = [];
              finalData.push(c);
            }
          });
      }
    });

    let dataSet = await finalData.map((e: any) => {
      return { Key: e.id, Value: +e.selectedVal };
    });

    if (dataSet.length == 0) {
      this.toastr.error('Please select a skill first');
    } else {
      try {
        this.actorAccountService.artistCapabilitesUpdate(this.artistToken, dataSet).subscribe((response) => {
          if (response && response['status'] == '200') {
            if (this.language == 'he-IL') {
              this.toastr.success('נשמר בהצלחה');
            } else {
              this.toastr.success('Saved successfully');
            }

            this.getUserId();
            this.getPendingChanges();
            this.selSkillId = selId;

            setTimeout(() => {
              this.selSkillId = '';
            }, 2000);
          } else if (response && response['status'] != '200') {
            if (this.language == 'he-IL') {
              this.toastr.error('שמירת היכולות נכשלה');
            } else {
              this.toastr.error('Failed to save capabilities');
            }
          }
        });
      } catch (error) {
        this.toastr.error('Failed to save capabilities');
      }
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    const arrayLength = this.artistPictures.length;
    if (this.isRTL) {
      const targetIndex = arrayLength - 1 - event.currentIndex;
      const previousIndex = arrayLength - 1 - event.previousIndex;
      if (event.previousContainer !== event.container) {
        const draggedItem = this.artistPictures[previousIndex];
        this.artistPictures.splice(previousIndex, 1);
        this.artistPictures.splice(targetIndex, 0, draggedItem);
      } else {
        const movedItem = this.artistPictures.splice(previousIndex, 1)[0];
        this.artistPictures.splice(targetIndex, 0, movedItem);
      }
    } else {
      if (event.previousContainer !== event.container) {
        moveItemInArray(this.artistPictures, event.previousIndex, event.currentIndex);
      } else {
        moveItemInArray(this.artistPictures, event.previousIndex, event.currentIndex);
      }
    }
    this.updateArtistPicOrder();
    this.fristPicture = this.artistPictures[0];
    this.actorAccountService.setData(this.fristPicture);
  }
  drop1(event: CdkDragDrop<string[]>) {
    const arrayLength = this.embedVedio.length;
    if (this.isRTL) {
      const targetIndex = arrayLength - 1 - event.currentIndex;
      const previousIndex = arrayLength - 1 - event.previousIndex;
      if (event.previousContainer !== event.container) {
        const draggedItem = this.embedVedio[previousIndex];
        this.embedVedio.splice(previousIndex, 1);
        this.embedVedio.splice(targetIndex, 0, draggedItem);
      } else {
        const movedItem = this.embedVedio.splice(previousIndex, 1)[0];
        this.embedVedio.splice(targetIndex, 0, movedItem);
      }
    } else {
      if (event.previousContainer !== event.container) {
        moveItemInArray(this.embedVedio, event.previousIndex, event.currentIndex);
      } else {
        moveItemInArray(this.embedVedio, event.previousIndex, event.currentIndex);
      }
    }
    // moveItemInArray(this.embedVedio, event.previousIndex, event.currentIndex);
    this.updateArtistVedioOrder();
  }

  delayFn(timer: any) {
    return new Promise((resolve) => {
      timer = timer || 2000;
      setTimeout(function () {
        resolve(true);
      }, timer);
    });
  }

  copyPageLink(encodeVal: any) {
    const currentUrl = `${environment.siteUrl}actor-details?details=${encodeVal}`;

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

  // code from FROALA DOCS RTL LTR custom decision

  getPendingChanges() {
    const completed = 0;
    const artistID = localStorage.getItem('artistID');
    this.actorAccountService.getPendingChanges(completed, artistID).subscribe((res: any) => {
      this.pendingChanges = res['data'];
      const latestData = this.pendingChanges.reverse();
      this.pendingChanges = this.pendingChanges.filter((item: any, index: any) => {
        return !index || !this.pendingChanges.slice(0, index).some((prevItem: any) => prevItem.Label === item.Label);
      });
      this.pendingChanges.forEach((change: any) => {
        if (change.Type === 2) {
          if (change.Label == 'Body type') this.actorBodyTypeData = change.newChildId;
          if (change.Label == 'Hair type') this.actorhairTypeData = change.newChildId;
          if (change.Label == 'Hair') this.actorHairClrTypeData = change.newChildId;
          if (change.Label == 'Eyes') this.actorEyeTypeData = change.newChildId;
          if (change.Label == 'Skin tone') this.actorSkinTypeData = change.newChildId;
        }

        if (change.parentId == `${environment.eduCationLevelId}`) {
          this.selectedValue = change.newChildId;
          this.newActorAccountForm.patchValue({
            Value: this.selectedValue,
          });
        }
        if (change.parentId == `${environment.residenceId}`) {
          this.residenceSelectVal = change.newChildId;
          this.newActorAccountForm.patchValue({
            residenceValue: this.residenceSelectVal,
          });
        }
        if (change.parentId == `${environment.org_membershipId}`) {
          this.ORGSelectValue = change.newChildId;
          this.newActorAccountForm.patchValue({
            membershipValue: this.ORGSelectValue,
          });
        }
        if (change.parentId == `${environment.send_me_acting_rolesId}`) {
          this.sendRolesSelectValue = change.newChildId;
          this.newActorAccountForm.patchValue({
            roles_Value: this.sendRolesSelectValue,
          });
        }
        if (change.parentId == `${environment.drive_licensesId}`) {
          this.driveSelectedVal = change.newChildId;
          this.newActorAccountForm.patchValue({
            license_Value: this.driveSelectedVal,
          });
        }
        if (change.parentId == `${environment.singerId}`) {
          this.singerSelectValue = change.newChildId;
          this.newActorAccountForm.patchValue({
            singerValue: this.singerSelectValue,
          });
        }
      });
      this.patchCharacteristics();
    });
  }
  saveproceed() {
    if (this.saveBtn) {
      localStorage.removeItem('emailRegister');
      this.actorDetailsService.getAllPaymentOptions().subscribe((data) => {
        this.planTypeResponse = data['data'];
        let plnIds = '';

        if (this.planTypeResponse[0].id) {
          plnIds = this.planTypeResponse[0].id;
        }
        localStorage.setItem('planId', plnIds);
        localStorage.setItem('tellusmore', '1');
        this.router.navigate(['/account-payment']);
        this.sidebarEnable = localStorage.setItem('enabling', JSON.stringify(true));
        this.actorAccountService.setBtnEnable(this.sidebarEnable);
      });
    }
  }
  renew() {
    this.saveBtn = true;
    localStorage.setItem('saveBtn', JSON.stringify(true));
    this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
  }
  getAudioUrl(event: any) {
    if (event.target.value) {
      const url = event.target.value;
      var audioUrlPattern = /^https?:\/\/.+\.mp3$/i;
      this.urlTested = audioUrlPattern.test(url);
      if (this.urlTested == false) {
        this.errormsg = true;
      } else {
        this.errormsg = false;
      }
    } else {
      this.errormsg = false;
    }
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

  private generateNumberRange(): void {
    for (let i = 100; i <= 200; i++) {
      this.numberRange.push(i);
    }
  }
  // triggerButtonClick() {
  //   if (this.openFirstPopupRef && this.openFirstPopupRef.nativeElement) {
  //     this.openFirstPopupRef.nativeElement.click();
  //   }
  // }

  updateArtistFormAccount() {
    this.newActorAccountForm.patchValue({ Id: this.artistToken });
    this.newActorAccountForm.patchValue({ educationValue: this.educationId });
    this.newActorAccountForm.patchValue({ residence: this.residenceid });
    this.newActorAccountForm.patchValue({ ORGmembership: this.orgMembershipId });
    this.newActorAccountForm.patchValue({ singer: this.singerId });
    this.newActorAccountForm.patchValue({ send_me_acting_roles: this.sendactiongRolesId });
    this.newActorAccountForm.patchValue({ drive_licenses: this.driveLicensId });
    if (this.newActorAccountForm.value.Gender == 0) {
      this.newActorAccountForm.patchValue({ gender_tone: this.menToneId });
    }
    if (this.newActorAccountForm.value.Gender == 1) {
      this.newActorAccountForm.patchValue({ gender_tone: this.womenToneId });
    }
    if (
      this.agencyParms
        .map((data: any) => data.Name.toLowerCase())
        .includes(this.newActorAccountForm.value.Name.toLowerCase())
    ) {
      const successMessage = this.translate.instant('There is already an existing agency.');
      this.toastr.error(successMessage);
    }
    if (this.newActorAccountForm.value.Height == 0) {
      this.heightValErr = true;
      const errorMessage = this.translate.instant('The Height value field is required.');
      this.toastr.error(errorMessage);
    } else {
      this.actorAccountService.updateActorAccount(this.newActorAccountForm.value, this.id).subscribe((res) => {
        if (res['status'] == 200) {
          this.newActorAccountForm.patchValue({ Name: '' });
          this.setOtherValue = false;
          this.getUserId();
          this.getPendingChanges();
          // this.patchCharacteristics();
          this.updateArtistPicOrder();
          this.updateArtistVedioOrder();
          this.actorAgencyParms();
          // this.enableBtn = false;
          this.genderErr = false;
          this.bodyTypeErr = false;
          this.hairColrErr = false;
          this.hairTypeErr = false;
          this.eyeVlErr = false;
          this.skinToneErr = false;
          this.eductnVlErr = false;
          this.genderValErr = false;
          this.rolesValErr = false;
          this.residenceValErr = false;
          this.membersipValErr = false;
          this.licenseValErr = false;
          this.singerValErr = false;
          this.agencyValErr = false;
          this.heightValErr = false;
          this.motherTongueErr = false;
        } else {
          if (res['message']['Gender']) {
            this.showTosterMessage(res['message']['Gender'], 'error');
            this.genderErr = true;
          } else {
            this.genderErr = false;
          }

          if (res['message']['bodyTypeValue']) {
            const errorMessage = this.translate.instant(res['message']['bodyTypeValue'][0]);
            this.toastr.error(errorMessage);
            this.bodyTypeErr = true;
          } else {
            this.bodyTypeErr = false;
          }
          if (res['message']['hairColorValue']) {
            const errorMessage = this.translate.instant(res['message']['hairColorValue'][0]);
            this.toastr.error(errorMessage);
            this.hairColrErr = true;
          } else {
            this.hairColrErr = false;
          }
          if (res['message']['hairTypeValue']) {
            const errorMessage = this.translate.instant(res['message']['hairTypeValue'][0]);
            this.toastr.error(errorMessage);
            this.hairTypeErr = true;
          } else {
            this.hairTypeErr = false;
          }

          if (res['message']['eyeValue']) {
            const errorMessage = this.translate.instant(res['message']['eyeValue'][0]);
            this.toastr.error(errorMessage);
            this.eyeVlErr = true;
          } else {
            this.eyeVlErr = false;
          }

          if (res['message']['skinToneValue']) {
            const errorMessage = this.translate.instant(res['message']['skinToneValue'][0]);
            this.toastr.error(errorMessage);
            this.skinToneErr = true;
          } else {
            this.skinToneErr = false;
          }

          if (res['message']['AgencyId']) {
            const errorMessage = this.translate.instant(res['message']['AgencyId'][0]);
            this.toastr.error(errorMessage);
            this.agencyValErr = true;
          } else {
            this.agencyValErr = false;
          }

          if (res['message']['Value']) {
            const errorMessage = this.translate.instant(res['message']['Value'][0]);
            this.toastr.error(errorMessage);
            this.eductnVlErr = true;
          } else {
            this.eductnVlErr = false;
          }
          if (res['message']['singerValue']) {
            const errorMessage = this.translate.instant(res['message']['singerValue'][0]);
            this.toastr.error(errorMessage);
            this.singerValErr = true;
          } else {
            this.singerValErr = false;
          }

          if (res['message']['license_Value']) {
            const errorMessage = this.translate.instant(res['message']['license_Value'][0]);
            this.toastr.error(errorMessage);
            this.licenseValErr = true;
          } else {
            this.licenseValErr = false;
          }

          if (res['message']['membershipValue']) {
            const errorMessage = this.translate.instant(res['message']['membershipValue'][0]);
            this.toastr.error(errorMessage);
            this.membersipValErr = true;
          } else {
            this.membersipValErr = false;
          }

          if (res['message']['residenceValue']) {
            const errorMessage = this.translate.instant(res['message']['residenceValue'][0]);
            this.toastr.error(errorMessage);
            this.residenceValErr = true;
          } else {
            this.residenceValErr = false;
          }

          if (res['message']['roles_Value']) {
            const errorMessage = this.translate.instant(res['message']['roles_Value'][0]);
            this.toastr.error(errorMessage);
            this.rolesValErr = true;
          } else {
            this.rolesValErr = false;
          }

          if (res['message']['gender_tone_Value']) {
            const errorMessage = this.translate.instant(res['message']['gender_tone_Value'][0]);
            this.toastr.error(errorMessage);
            this.genderValErr = true;
          } else {
            this.genderValErr = false;
          }
          if (res['message']['agencyName']) {
            const errorMessage = this.translate.instant(res['message']['agencyName'][0]);
            this.toastr.error(errorMessage);
            this.agencyValErr = true;
          } else {
            this.agencyValErr = false;
          }
          if (res['message']['motherTongue']) {
            const errorMessage = this.translate.instant(res['message']['motherTongue'][0]);
            this.toastr.error(errorMessage);
            this.motherTongueErr = true;
          } else {
            this.motherTongueErr = false;
          }
        }
      });
    }
  }

  checkFormValidity() {
    const formValues = this.newActorAccountForm.value;
    if (
      ((formValues.Gender == 0 || formValues.Gender == 1) &&
        formValues.Height != 0 &&
        formValues.bodyTypeValue != '' &&
        formValues.hairColorValue != '' &&
        formValues.hairTypeValue != '' &&
        formValues.eyeValue != '' &&
        formValues.skinToneValue != '' &&
        formValues.Value != '' &&
        formValues.singerValue != '' &&
        formValues.gender_tone_Value != '' &&
        formValues.license_Value != '' &&
        formValues.roles_Value != '' &&
        formValues.membershipValue != '' &&
        formValues.residenceValue != '' &&
        formValues.motherTongue != '' &&
        formValues.AgencyId != '') ||
      formValues.Name != ''
    ) {
      this.setButton = true;
    } else {
      this.setButton = false;
    }
  }

  rotateImage(direction: 'left' | 'right' | '') {
    const canvas = document.createElement('canvas');
    this.ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.height;
      canvas.height = img.width;
      this.ctx.translate(canvas.width / 2, canvas.height / 2);
      if (direction === 'right' || direction === 'left') {
        this.ctx.rotate(((direction === 'right' ? 90 : -90) * Math.PI) / 180);
      }
      this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
      const rotatedDataURL = canvas.toDataURL();
      const trustedUrl = this.sanitizer.bypassSecurityTrustUrl(rotatedDataURL);
      this.imageSrc = trustedUrl;
    };
    img.src = this.imageSrc.changingThisBreaksApplicationSecurity as string;
  }

  imageCropped(event: any) {
    this.croppedEvent = event.objectUrl;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    const originalMimeType = this.filedata.type;
    let targetFormat = 'image/png';

    if (originalMimeType === 'image/jpeg' || originalMimeType === 'image/jpg') {
      targetFormat = 'image/jpeg';
    } else if (originalMimeType === 'image/gif') {
      targetFormat = 'image/gif';
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      this.croppedEvent = canvas.toDataURL(targetFormat);
    };
    img.src = this.croppedEvent;
  }

  imageCroppedd(event: any) {
    this.croppedEvent = event.objectUrl;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      this.croppedEvent = canvas.toDataURL('image/png');
    };
    img.src = this.croppedEvent;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {}
  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }
  clear() {
    this.croppedImage = '';
    this.imageChangedEvent = '';
    this.myInputVariable.nativeElement.value = '';
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  loadImageFailed() {
    alert('Please recheck the image uploaded or please resize the image and upload again');
  }
  editActorImage(content: any, filename: any, pic: any) {
    this.editArtistId = pic.artistId;
    this.imageId = pic.id;
    this.imageUrls = this.imagebaseUrl + filename;
    this.actorAccountService.getImageBlob(this.imageUrls).subscribe((data) => {
      const mimeType = data.type;
      const file = new File([data], filename, { type: mimeType });
      this.imageChangedEventt = { target: { files: [file] } };
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  updateEditImage() {
    const rotatedImageData = this.dataURItoBlob(this.croppedEvent);
    const frmData = new FormData();
    frmData.append('FileName', rotatedImageData);
    frmData.append('ArtistId', this.artistToken);
    frmData.append('imageId', this.imageId);
    this.actorAccountService.updateEditImage(frmData).subscribe((res: any) => {
      this.croppedImage = '';
      this.imageChangedEventt = '';
      this.canvasRotation = 0;

      if (res['status'] == 200) {
        this.toastr.success(res['message']);
        this.closeModal('imageModelClosee');
        this.getUserId();
      } else {
        this.toastr.error(res['message']);
      }
    });
  }
}

export class Froala {
  options: Object = {
    // toolbarButtons: [ 'bold', 'italic', 'strikeThrough', 'subscript', 'superscript',
    //   'fontFamily', 'fontSize', 'paragraphFormat', 'align',
    //   'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertImage', 'embedly', 'insertTable',
    //   'insertLink', 'specialCharacters', 'insertHR', 'clearFormatting', 'print', 'pdf', 'spellChecker',
    //   'undo', 'redo', 'backgroundColor', 'rtl', 'ltr'],
    key: 'wFE7nE5H5I4A3B9D6C5fLUQZf1ASFb1EFRNh1Hb1BCCQDUHnA8B6E5A4B1D3F3A1C8B6==',
    toolbarButtons: [
      ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
      ['fontFamily', 'fontSize', 'backgroundColor', 'textColor'],
      ['paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-'],
      ['insertImage', 'embedly', 'insertTable', 'insertLink'],
      ['specialCharacters', 'insertHR', 'clearFormatting'],
      ['print', 'spellChecker'],
      ['undo', 'redo'],
      ['RTL', 'LTR'],
    ],
    customButtons: {
      rightToLeft: {
        title: 'rtl',
        icon: {
          type: 'font',
          value: 'fa fa-long-arrow-right', // Font Awesome icon class fa fa-*
        },
        callback: function (editor: any) {
          editor.saveSelection();
          var selectedElements = editor.getSelectionElements();
          var containerDiv = document.createElement('div');
          containerDiv.dir = 'rtl';
          containerDiv.style.textAlign = 'right';
          for (var i = 0; i < selectedElements.length; i++) containerDiv.appendChild(selectedElements[i]);
          editor.saveUndoStep();
        },
      },
      leftToRight: {
        title: 'ltr',
        icon: {
          type: 'font',
          value: 'fa fa-long-arrow-left', // Font Awesome icon class fa fa-*
        },
        callback: function (editor: any) {
          editor.saveSelection();
          var selectedElements = editor.getSelectionElements();
          var containerDiv = document.createElement('div');
          containerDiv.dir = 'ltr';
          containerDiv.style.textAlign = 'left';
          for (var i = 0; i < selectedElements.length; i++) containerDiv.appendChild(selectedElements[i]);
          editor.saveUndoStep();
        },
      },
    },
    fontFamily: {
      'Arial,Helvetica,sans-serif': 'Arial',
      "'Courier New',Courier,monospace": 'Courier New',
      'Georgia,serif': 'Georgia',
      'Impact,Charcoal,sans-serif': 'Impact',
      "'Lucida Console',Monaco,monospace": 'Lucida Console',
      'Tahoma,Geneva,sans-serif': 'Tahoma',
      "'Times New Roman',Times,serif": 'Times New Roman',
      'Verdana,Geneva,sans-serif': 'Verdana',
    },
  };
  constructor() {}
}

export class Froala1 {
  options: Object = {
    // toolbarButtons: [ 'bold', 'italic', 'strikeThrough', 'subscript', 'superscript',
    //   'fontFamily', 'fontSize', 'paragraphFormat', 'align',
    //   'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertImage', 'embedly', 'insertTable',
    //   'insertLink', 'specialCharacters', 'insertHR', 'clearFormatting', 'print', 'pdf', 'spellChecker',
    //   'undo', 'redo', 'backgroundColor', 'rtl', 'ltr'],
    key: 'wFE7nE5H5I4A3B9D6C5fLUQZf1ASFb1EFRNh1Hb1BCCQDUHnA8B6E5A4B1D3F3A1C8B6==',
    toolbarButtons: [
      ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'html'],
      ['fontFamily', 'fontSize', 'backgroundColor', 'textColor'],
      ['paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-'],
      ['insertImage', 'embedly', 'insertTable', 'insertLink'],
      ['specialCharacters', 'insertHR', 'clearFormatting'],
      ['print', 'spellChecker'],
      ['undo', 'redo'],
      ['RTL', 'LTR'],
    ],
    fontFamily: {
      'Arial,Helvetica,sans-serif': 'Arial',
      "'Courier New',Courier,monospace": 'Courier New',
      'Georgia,serif': 'Georgia',
      'Impact,Charcoal,sans-serif': 'Impact',
      "'Lucida Console',Monaco,monospace": 'Lucida Console',
      'Tahoma,Geneva,sans-serif': 'Tahoma',
      "'Times New Roman',Times,serif": 'Times New Roman',
      'Verdana,Geneva,sans-serif': 'Verdana',
    },
    toolbarSticky: false,
    toolbarStickyOffset: 50,
  };
  constructor() {}
}
