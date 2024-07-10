import { Component, OnInit } from '@angular/core';
import { NewsDetailsModule } from '@app/news-details/news-details.module';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FooterService } from './footer.service';
import { I18nService } from '../../i18n/i18n.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  emailValidation!: FormGroup;
  boxChecked: boolean;
  clearField: any;
  language: any;
  currentYear: number;
  chatmesage: any;
  modal: any;
  translatedItem: any;

  constructor(
    private toastr: ToastrService,
    private i18nService: I18nService,

    private formBulider: FormBuilder,
    private footerservice: FooterService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('localstorage', localStorage);
    this.language = localStorage.getItem('language');
    const setLnguage = localStorage.getItem('[I18nService] Language set to en-US');
    this.emailValidation = this.formBulider.group({
      email: [null, [Validators.required]],
    });

    this.chatmesage = this.formBulider.group({
      chatmesagebody: [null, [Validators.required]],
      chatmesageemail: [null, [Validators.required]],
      chatmesagephone: [null, [Validators.required]],
    });

    this.currentYear = new Date().getFullYear();
  }
  get f() {
    return this.emailValidation.controls;
  }
  checkbox(event: any) {
    this.boxChecked = event.target.checked;
  }

  getEmal(event: any) {
    this.emailValidation.patchValue({ email: event.target.value });
    console.log('email form', this.emailValidation.value);
  }

  isValid(email: string) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  storeSubscriptions(data: any) {
    if (this.boxChecked == true) {
      if (data == '') {
        if (this.i18nService.language == 'en-US' || this.language == 'en-US') {
          this.toastr.error('', 'Please enter an email.');
        } else {
          this.toastr.error('', 'נא להזין מייל.');
        }
        this.clearField = '';
        this.boxChecked = false;
        return;
      }
      let isValid = this.isValid(data);
      if (!isValid) {
        if (this.i18nService.language == 'en-US' || this.language == 'en-US') {
          this.toastr.error('', 'Please enter a valid email.');
        } else {
          this.toastr.error('', 'נא להזין אימייל חוקי.');
        }
        this.clearField = '';
        this.boxChecked = false;
        return;
      }
      this.footerservice.storeSubscriptions(this.emailValidation.value).subscribe((data: any) => {
        if (data['status'] == 200) {
          if (this.i18nService.language == 'en-US' || this.language == 'en-US') {
            this.toastr.success(data['message']);
          } else {
            this.toastr.success('', 'מנויים נוספו בהצלחה');
          }
          this.clearField = '';
          this.emailValidation.patchValue({ email: '' });
          this.clearField = this.emailValidation.value.email;
          this.boxChecked = false;
        } else if (data['status'] != 200) {
          if (this.i18nService.language == 'en-US' || this.language == 'en-US') {
            this.toastr.error(data['message'].email);
          } else {
            this.toastr.error('', 'המייל כבר נלקח');
          }
          this.clearField = '';
          this.emailValidation.patchValue({ email: '' });
          this.clearField = this.emailValidation.value.email;
          this.boxChecked = false;
        }
      });
    }
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  async submitChat() {
    let message = this.chatmesage.value.chatmesagebody;
    let email = this.chatmesage.value.chatmesageemail;
    let phone = this.chatmesage.value.chatmesagephone;

    if (message == '' || message == null || email == '' || email == null || phone == null || phone == '') {
      if (this.i18nService.language == 'en-US' || this.language == 'en-US') {
        this.toastr.error('', 'Please enter a valid message/email/phone.');
      } else {
        this.toastr.error('', 'נא להזין הודעה/מייל/טלפון חוקיים');
      }

      return;
    } else {
      let hashebrew = this.hasHebrew(message);

      // if(hashebrew) {
      //   await this.getTranslatedMessage(message)
      //   if(this.translatedItem != null) {
      //     this.chatmesage.patchValue({ chatmesagebody: this.translatedItem });
      //   }

      // }
      this.footerservice.sendSlackMessage(this.chatmesage.value).subscribe((data: any) => {
        if (data['status'] == 200) {
          if (this.i18nService.language == 'en-US' || this.language == 'en-US') {
            this.toastr.success(data['message']);
          } else {
            this.toastr.success('', 'ההודעה נשלחה בהצלחה');
          }
          this.chatmesage.patchValue({ chatmesagebody: '' });
          this.chatmesage.patchValue({ chatmesageemail: '' });
          this.chatmesage.patchValue({ chatmesagephone: '' });
          this.closeModal('videoMsgClose');
        } else if (data['status'] != 200) {
          if (this.i18nService.language == 'en-US' || this.language == 'en-US') {
            this.toastr.error('Error occurred. Please try again');
          } else {
            this.toastr.error('', 'אירעה שגיאה. בבקשה נסה שוב');
          }
        }
      });
    }
  }

  getMessageContent(event: any) {
    this.chatmesage.patchValue({ chatmesagebody: event.target.value });
  }

  getEmailContent(event: any) {
    this.chatmesage.patchValue({ chatmesageemail: event.target.value });
  }

  getPhoneContent(event: any) {
    this.chatmesage.patchValue({ chatmesagephone: event.target.value });
  }

  closeModal(idElm: any) {
    let Membership: HTMLElement = document.getElementById(idElm) as HTMLElement;
    Membership.click();
  }

  hasHebrew(text: string): boolean {
    const hebrewRegex = /[\u0590-\u05FF]/;

    return hebrewRegex.test(text);
  }

  async getTranslatedMessage(message: any) {
    const translationMsg = `${message}`;
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.hebrewLanguage}&tl=${environment.englishLanguage}&dt=t&q=${translationMsg}&key=${environment.translateApiKey}`;

    try {
      const response = await fetch(apiUrl);
      const translationData = await response.json();
      const translatedText = translationData[0][0][0];
      this.translatedItem = translatedText;
    } catch (error) {
      this.translatedItem = null;
    }
  }
}
