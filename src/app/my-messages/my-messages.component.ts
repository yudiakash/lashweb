import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { MyMessagesService } from '../my-messages/my-messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActorAccountService } from '@app/actoraccount/actoraccount.service';
import { ActorDetailsService } from '@app/actor-details/actor-details.service';
import { CastingCallsService } from '@app/casting-calls/casting-calls.service';
import { CastingCallDetailsService } from '@app/casting-call-details/casting-call-details.service';
import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Renderer2, ElementRef } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { environment } from '@env/environment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from '@app/search/search.service';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.scss'],
})
export class MyMessagesComponent implements OnInit {
  @ViewChild('messageSidebar') messageSidebar: ElementRef;
  @ViewChild('showSidee') showSidee: ElementRef;
  @ViewChild('messageSection') messageSection: ElementRef;
  messagesTypeList: any = [];
  countUnread: number = 0;
  clickedDetails: boolean = false;
  messageList: any = [];
  id: number | null;
  messageId: number | null;
  messageDetails: any = [];
  selectedtn: any | null;
  actiorDetails: any = [];
  userId: any;
  artistToken: any;
  encodedToken: string;
  gender: any;
  artistID: any;
  castingCalls: any = [];
  categoryName: string = '';
  roledDatas: any = [];
  array: any = [];
  castingDetails: any = [];
  body: string;
  auditionId: string;
  rolesDatas: any = [];
  data: any = [];
  unreadMsg: any = [];
  intervalId: any = '';
  setStyle: boolean;
  messagess: any = [];
  readByActorr: any;
  setRead: boolean = false;
  readOncee: any;
  idRead: any;
  readmsg: any;
  msgRead: any = [];
  reading: any;
  msgId: any;
  newCastingMessage: any = 2;
  selectedMessageTypeId: any = 2;
  readMsgList: any = [];
  successMsg: boolean = false;
  errorMsg: boolean = false;
  errorMessages: any;
  eror: boolean = false;
  castingId: any;
  msggId: any;
  // age :any
  birthDate: any;
  public expiryDate: any = Date;
  public birthdate: any = Date;
  public age: any;
  ageValidation: boolean = false;
  dateValidation: boolean = false;
  firstMsg: any;
  newSearchForm!: FormGroup;
  page: any;
  count: number = 0;
  tableSize: number = 10;
  messageBody: any;
  closingDate: any;
  auditionUrl: any | null;
  imageFile: any;
  encoded: any;
  safeHtmlContent: any;
  isShowDivIf = false;
  expandingToggle: boolean = false;
  roleId: any;
  slctRole: any;
  roleIndex: any;
  appliedRolesId: any;
  appliedData: any = [];
  setCasting: boolean = false;
  appliesArtistId: any;
  elementMembership: boolean = false;
  saveBtn: boolean = false;
  currentPage = 1;
  totalCount: number = 0;
  loadedMessaage: boolean = false;
  sidebarOpen: boolean = false;
  language: any;
  isRTL: boolean = false;

  constructor(
    private myMessagesService: MyMessagesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private actorDetailsService: ActorDetailsService,
    private castingCallsService: CastingCallsService,
    private castingCallDetailsService: CastingCallDetailsService,
    private rd: Renderer2,
    private _el: ElementRef,
    public auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
    private translate: TranslateService,
    private searchService: SearchService
  ) {}
  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.auditionUrl = `${environment.auditionUrl}`;
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
      localStorage.removeItem('getUser');
    }
    localStorage.setItem('getUser', '1');

    this.newSearchForm = this.formBuilder.group({
      title: [''],
    });
    this.id = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe((params) => {
      this.categoryName = params['catName'];
    });

    this.getMessageTypes();
    this.getMessages();
    this.getUserId();

    setInterval(() => {
      this.getMessages();
    }, 600000);
    this.getUnreadMessages();
  }
  getAppliedRoleIds() {
    this.appliedData = [];
    const artistToken = Number(this.artistToken);
    this.myMessagesService.getAppliedRoleIds(artistToken).subscribe((data: any) => {
      this.appliedRolesId = data['data'];
      this.appliedRolesId.filter((applieddata: any) => {
        this.roledDatas.filter((roleddata: any) => {
          if (applieddata.PartId == roleddata.id) {
            this.appliedData.push(applieddata.PartId);
          }
        });
      });
    });
  }

  searchFilter() {
    this.getMessages(this.newSearchForm.value.title);
  }

  getCastingCallDetailsById() {
    let encoded: string = btoa(this.auditionId);
    this.encoded = btoa(this.auditionId);
    this.castingCallDetailsService.getCastingCallDetailsById(encoded).subscribe((data) => {
      this.castingDetails = data['data'][0];
      this.closingDate = this.castingDetails?.auditionClosingDate;
      this.imageFile = this.castingDetails?.auditionFileName;
      this.messageBody = this.castingDetails.message_body;
      this.roledDatas = this.castingDetails?.['rolesData'];
      this.getAppliedRoleIds();
      let datass = this.roledDatas?.filter((data: any) => {
        this.data = data;
        return this.data;
      });
      this.data = datass;
    });
  }
  // onTableDataChange(event: any) {
  //   this.page = event;
  //   this.getMessages();
  // }
  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getMessages();
  // }

  onTableDataChange(event: any) {
    this.page = event;
    this.currentPage = event;
    this.getMessages();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.currentPage = 0;
    this.getMessages();
  }

  getUserId() {
    const userID = localStorage.getItem('userId');
    const artistID = localStorage.getItem('artistID');
    console.log('artistID....', artistID);

    this.userId = userID;

    this.artistToken = artistID;
    console.log('this.artistToken', this.artistToken);

    let imgs: any = [];

    if (userID) {
      let encoded: string = btoa(this.artistToken);
      this.encodedToken = encoded;
      this.actorDetailsService.getActorDetials(encoded).subscribe((data) => {
        this.actiorDetails = data['data'];
        console.log('this.actiorDetails', this.actiorDetails);
        const membershipExpiryDate = this.actiorDetails['membershipExpiryDate'];
        const currentDate = new Date();
        if (membershipExpiryDate) {
          const expirationDate = new Date(membershipExpiryDate);
          if (currentDate > expirationDate) {
            // this.Membership =  document.getElementById("expiredNot")
            this.elementMembership = true;
            console.log('The date has expired.');
          } else {
            this.elementMembership = false;
            console.log('The date is still valid.');
          }
        }

        this.gender = this.actiorDetails['Gender'];
        this.expiryDate = this.actiorDetails.membershipExpiryDate;
        let today = new Date();
        let expiring = new Date(this.expiryDate);
        let currentYear = Math.abs(today.getUTCFullYear());
        let expireYear = Math.abs(expiring.getUTCFullYear());

        if (expireYear >= currentYear) {
          this.dateValidation = true;
        }
        this.birthDate = this.actiorDetails.BirthDay;
      });
    }
  }

  getMessageTypes() {
    this.myMessagesService.getMessageTypes().subscribe((data) => {
      this.messagesTypeList = data['data'];
    });
  }

  getMessages(params = null) {
    this.myMessagesService.getMessageList(this.id, params, this.currentPage).subscribe((data) => {
      this.messageList = data['data'].textmsg;
      this.totalCount = data['data'].totalCount;
      this.firstMsg = this.messageList[0];
      this.messageList[0]['firstMessage'] = 1;

      this.messageList.filter((data: any) => {
        this.readByActorr = data['readByActor'];
        if (this.readByActorr == 0) {
          this.setStyle = false;
        } else if (this.readByActorr == 1) {
          this.setStyle = true;
        }

        this.loadedMessaage = true;
      });

      if (data['data'][0]) {
        // this.messageId = data['data'][0]['msgId'];
      } else {
        this.messageId = 0;
        this.getMessageDetailsById(this.messageId);
      }
      // this.translateText();
      // this.translateTextHe();
    });
    this.getUnreadMessages();
  }

  getMessageDetailsById(msgId: any) {
    this.myMessagesService.getMessageDetailsById(msgId).subscribe((data) => {
      if (data['data'].length) {
        this.messageDetails = data['data'][0];
        let htmlBody = this.messageDetails.Body;

        if (this.messageDetails.Type == 1) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(htmlBody, 'text/html');
          const contentEditableElems = htmlDoc.querySelectorAll('[contenteditable]');
          contentEditableElems.forEach((elem) => elem.removeAttribute('contenteditable'));
          htmlBody = htmlDoc.documentElement.innerHTML;
        }

        if (this.messageDetails.Type == 3) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(htmlBody, 'text/html');
          const contentEditableElems = htmlDoc.querySelectorAll('[contenteditable]');
          contentEditableElems.forEach((elem) => elem.removeAttribute('contenteditable'));
          htmlBody = htmlDoc.documentElement.innerHTML;
        }
        if (this.messageDetails.Type == 4) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(htmlBody, 'text/html');
          const contentEditableElems = htmlDoc.querySelectorAll('[contenteditable]');
          contentEditableElems.forEach((elem) => elem.removeAttribute('contenteditable'));
          htmlBody = htmlDoc.documentElement.innerHTML;
        }
        if (this.messageDetails.Type == 5) {
          // const copyApplies = data['data']
          // copyApplies.filter((data:any)=>{
          //   this.appliesArtistId= data['ArtistId']
          // })
          // console.log('appliesArtistId',this.appliesArtistId);
          // let encoded: string = btoa(this.appliesArtistId);
          // this.actorDetailsService.getActorDetials(encoded).subscribe((data:any) => {
          //   console.log('data............',data);

          // })
          // this.actiorDetails = data['data'];
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(htmlBody, 'text/html');
          const contentEditableElems = htmlDoc.querySelectorAll('[contenteditable]');
          contentEditableElems.forEach((elem) => elem.removeAttribute('contenteditable'));
          htmlBody = htmlDoc.documentElement.innerHTML;
        }

        this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(htmlBody);
        // this.translateText();
        // this.translateTextHe();
        this.readOncee = this.messageDetails['ReadOnce'];
        if (this.readOncee == 0) {
          this.setRead = true;
        } else {
          this.setRead = false;
        }
        if (Number.isInteger(parseInt(this.messageDetails.Body))) {
          this.auditionId = this.messageDetails.Body;
          this.getCastingCallDetailsById();
        } else {
          this.body = this.messageDetails.Body;
          let string = this.body.split('/');
          let stringSplit = string[2];
          let auditionId = stringSplit;
          this.auditionId = auditionId.toString().split('').slice(0, -1).join('');
          this.getCastingCallDetailsById();
        }
      }
    });
  }

  openMessage(id = null, msg: any) {
    if (window.matchMedia('(max-width: 567px)').matches) {
      this.sidebarOpen = true;
      const sidebarElement = this.messageSidebar.nativeElement;
      const showSide = this.showSidee.nativeElement;
      const messageSection = this.messageSection.nativeElement;
      if (this.sidebarOpen == true) {
        sidebarElement.style.display = 'none';
        showSide.style.transform = 'rotate(180deg)';
        messageSection.classList.add('sectionwidth');
      } else {
        sidebarElement.style.display = 'block';
        showSide.style.transform = 'rotate(180deg)';
        messageSection.classList.remove('sectionwidth');
      }
    }

    this.page = 1;
    this.messageList[0]['firstMessage'] = 0;
    this.msggId = id;
    this.messageId = id;
    this.getMessageDetailsById(id);
    this.readMessage(this.messageId);
    this.getUnreadMessages();
  }
  openMessageByType(typeId = null) {
    this.page = 1;
    this.selectedtn = typeId;
    this.id = typeId;
    this.selectedMessageTypeId = typeId;
    this.getMessages();
  }

  confirmedDelete(deleteId: any) {
    if (confirm('Are you sure to delete this message?')) {
      this.myMessagesService.deleteMessageById(deleteId).subscribe((data) => {
        if (data['status'] == 200) {
          const successMessage = this.translate.instant('Message has been deleted.');
          this.toastr.success(successMessage);
          this.msggId = '';
          this.getMessages();
        } else {
          const successMessage = this.translate.instant('Error occurred. Please try again!');
          this.toastr.error(successMessage);
        }
      });
    }
  }

  readMessage(readId: any) {
    this.idRead = readId;
    this.myMessagesService.readMessageById(readId).subscribe((data) => {
      this.readMsgList.push(readId);
    });
  }
  applyCasting(id: any) {
    this.castingId = id;
    let auditionid = Number(this.auditionId);
    const artistToken = Number(this.artistToken);

    this.myMessagesService.applyCastingById(artistToken, auditionid, id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.successMsg = true;
        // this.getAppliedRoleIds()
        this.getCastingCallDetailsById();
        data['setCasting'] = true;
        const successMessage = this.translate.instant('Successfully applied.');
        this.toastr.success(successMessage);
        setTimeout(() => {
          this.successMsg = false;
        }, 2000);
      } else if (data['status'] != 200) {
        this.getCastingCallDetailsById();
        this.errorMsg = true;
        const successMessage = this.translate.instant(data['message']);
        this.toastr.error(successMessage);
        this.errorMessages = data['message'];
        setTimeout(() => {
          this.errorMsg = false;
        }, 2000);
      } else {
        data['setCasting'] = true;
        this.eror = true;
        const successMessage = this.translate.instant('Error occurred. Please try again!');
        this.toastr.error(successMessage);
        setTimeout(() => {
          this.eror = false;
        }, 2000);
      }
    });
  }
  expandToggle(data: any, index: any) {
    console.log('index', index);
    this.roleIndex = index;
    this.roleId = data;
    this.expandingToggle = !this.expandingToggle;
  }
  arrowToggle(data: any) {
    this.slctRole = data;
  }
  renew() {
    this.saveBtn = true;
    localStorage.setItem('saveBtn', JSON.stringify(true));
    localStorage.setItem('renew', JSON.stringify(true));
    this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
  }
  public showSide(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.clickedDetails = false;
    const sidebarElement = this.messageSidebar.nativeElement;
    const showSide = this.showSidee.nativeElement;
    const messageSection = this.messageSection.nativeElement;
    if (this.sidebarOpen === true) {
      sidebarElement.style.display = 'none';
      showSide.style.transform = 'rotate(180deg)';
      messageSection.classList.add('sectionwidth');
    } else {
      sidebarElement.style.display = 'block';
      showSide.style.transform = 'rotate(0deg)';
      messageSection.classList.remove('sectionwidth');
    }
  }
  async translateText() {
    this.messageList.map(async (data: any) => {
      const names = `${data.Title}`.toLowerCase();
      const parts = names.split('|');
      const originalPart = parts;
      var translatedText = await this.searchService.translateText(
        environment.hebrewLanguage,
        environment.englishLanguage,
        originalPart
      );
      translatedText = translatedText.replace(/,/g, ' | ').replace(/<[^>]+>/g, '');
      data['transNameEn'] = translatedText;
    });
  }

  async translateTextHe() {
    this.messageList.map(async (data: any) => {
      const names = `${data.Title}`.toLowerCase();
      var parts = names.split('|');
      var originalPart = parts;

      if (originalPart[0].includes('null')) {
        originalPart[0] = parts[0].replace('null', 'ריק');
      }
      var translatedText = await this.searchService.translateText(
        environment.englishLanguage,
        environment.hebrewLanguage,
        originalPart
      );
      translatedText = translatedText.replace(/,/g, ' | ').replace(/<[^>]+>/g, '');
      data['transNameHe'] = translatedText;
    });

    // let htmlBody = this.messageDetails.Body;
    // const textToTranslate = htmlBody
    // .replace(/<[^>]+>/g, ' ')
    // .replace(/\s+/g, ' ')
    // .replace(/&nbsp;/g, ' ')
    // .replace(/\|/g, ' ')
    //     const translatedText = await this.searchService.translateText(
    //       environment.englishLanguage,
    //       environment.hebrewLanguage,
    //       textToTranslate
    //     );
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(htmlBody, 'text/html');
    //     const elements = doc.body.querySelectorAll('*');
    //     elements.forEach((element) => {
    //       element.textContent = translatedText;
    //     });
    //     const translatedHTML = doc.body.innerHTML;
    //     this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(translatedHTML);
  }
  getUnreadMessages() {
    this.myMessagesService.getUnreadMessages(this.userId).subscribe((data) => {
      this.unreadMsg = data['data'];
      let sum = 0;
      for (let key in this.unreadMsg) {
        sum += this.unreadMsg[key];
      }
      this.countUnread = sum;
    });
  }
}
