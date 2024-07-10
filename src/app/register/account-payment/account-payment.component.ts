import { Component, OnInit, NgZone, ViewChild, TemplateRef } from '@angular/core';
import { ActorDetailsService } from '../../actor-details/actor-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MyaccountService } from '@app/myaccount/myaccount.service';
import { RegisterService } from '../../register/register.service';
import { AuthenticationService } from '../../auth/authentication.service';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActorAccountService } from '@app/actoraccount/actoraccount.service';
import { TranzillaService } from '@app/tranzilla-successfull-payment/tranzilla.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-account-payment',
  templateUrl: './account-payment.component.html',
  styleUrls: ['./account-payment.component.scss'],
})
export class AccountPaymentComponent implements OnInit {
  @ViewChild('contentPopSecnd') modalContentt: TemplateRef<any>;

  idActor: number | string | null;
  idPlan: number | string | null;
  newPaymentForm!: FormGroup;
  monthlist: IMonth[] = [];
  month: IMonth = <IMonth>{};
  paymentDetails: string = '';
  paymentSchedule: string = '';
  mthDetails: string = '';
  language: any = '';
  setlang: any = '';
  accountDetailsList: any = [];
  loginForm: FormGroup;
  isRenewal: any;
  iframes: any;
  amount: number;
  artistName: any;
  iframeHeSrc: any;
  iframeEnSrc: any;

  year: IYear = <IYear>{};
  years: IYear[] = [];

  constructor(
    private actorDetailsService: ActorDetailsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private myaccountService: MyaccountService,
    private registerService: RegisterService,
    private auth: AuthenticationService,
    private modalService: NgbModal,
    private actorAccountService: ActorAccountService,
    private service: TranzillaService,
    private sanitizer: DomSanitizer
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
  }
  ngOnInit(): void {
    localStorage.removeItem('idregistration');
    this.service.getData().subscribe((data) => {});

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const formattedToday = today.toISOString().split('T')[0];

    const first10Days = this.generateDateRange(
      firstDay,
      new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 9)
    );
    const middle10Days = this.generateDateRange(new Date(year, month, 11), new Date(year, month, 20));
    const last10Days = this.generateDateRange(new Date(year, month, 21), lastDay);

    const startDate1 = first10Days[1];
    const endDate1 = first10Days[9];
    const startDate2 = middle10Days[0];
    const endDate2 = middle10Days[9];
    const startDate3 = last10Days[0];
    const endDate3 = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastyear = lastDayOfMonth.getFullYear();
    const lastMonth = (lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0'); // Zero-padding
    const lastDayMth = lastDayOfMonth.getDate().toString().padStart(2, '0'); // Zero-padding
    const formattedDate = `${lastyear}-${lastMonth}-${lastDayMth}`;

    if (formattedToday >= startDate1 && formattedToday <= endDate1) {
      this.amount = 24;
    } else if (formattedToday >= startDate2 && formattedToday <= endDate2) {
      this.amount = 65;
    } else if (formattedToday >= startDate3 && formattedToday <= formattedDate) {
      this.amount = 44;
    } else {
      this.amount = 65;
    }

    this.accountDEtails();
    this.isRenewal = localStorage.getItem('renew');
    this.language = localStorage.getItem('language');
    this.idActor = localStorage.getItem('idActor') || localStorage.getItem('userId');
    this.idPlan = localStorage.getItem('planId');
    var iframe = document.getElementById('myIframe') as HTMLIFrameElement;
    var userId = this.idActor;
    //iframe.src = iframe.src + '&user_id=' + userId;
    // iframe.src = iframe.src + '&sum=' + this.amount;

    console.log('iframe.src', iframe.src);

    this.paymentInfoText();

    if (this.language == 'he-IL') {
      this.setlang = 'he';
    } else {
      this.setlang = 'en';
    }

    this.newPaymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [null, [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(11)]],
      email: [null, [Validators.required, Validators.email]],
      id_user: [this.idActor, Validators.required],
      subscription_id: [this.idPlan, [Validators.required]],
      cardNumber: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[0-9]*$')],
      ],
      currency: [1],
      expMonth: [null, [Validators.required]],
      expYear: [null, [Validators.required]],
      cvv: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]*$')],
      ],
      cardId: [null],
      lang: [this.setlang],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      type: ['actor'],
    });

    this.GetMonths();
    this.GetYears();
    this.iframes = document.getElementById('myIframe');
    this.iframes.onload = () => {
      // this.iframes.addEventListener('load', () => {
      //   const iframeContent = this.iframes.contentWindow.document.URL;
      //   if (iframeContent.includes("tranzilla-failed-payment")) {
      //     setTimeout(() => {
      //       window.location.reload();
      //       this.router.navigate(['/account-payment']);
      //     }, 1200);
      //   }
      //   else if(iframeContent.includes("tranzilla-successfull-payment")){
      //     setTimeout(() => {
      //       this.router.navigate(['/tell-us-more']);
      //     }, 2200);
      //   }
      // });
    };
  }

  paymentInfoText() {
    this.actorDetailsService.getPaymentPlanById(this.idPlan).subscribe((res) => {
      if (res['data']) {
        this.paymentDetails = res['data']['paymentDetails'] + ' NIS';
        this.mthDetails = res['data']['monthDetails'] + ' NIS';
        this.paymentSchedule = res['data']['paymentSchedule'];
      }
    });
  }

  GetMonths() {
    for (let i = 1; i <= 12; i++) {
      this.month = <IMonth>{};
      if (i.toString().length == 1) {
        this.month.text = '0' + i.toString();
        this.month.value = '0' + i.toString();
      } else {
        this.month.text = i.toString();
        this.month.value = i.toString();
      }

      this.monthlist.push(this.month);
    }
  }

  GetYears() {
    let year = new Date().getFullYear();
    for (let i = year; i <= year + 20; i++) {
      this.year = <IYear>{};
      this.year.text = i.toString();
      this.year.value = i.toString();
      this.years.push(this.year);
    }
  }

  get f() {
    return this.newPaymentForm.controls;
  }

  onSubmit() {
    this.updatePayment();
  }

  updatePayment() {
    this.actorDetailsService.updatePaymentPlan(this.newPaymentForm.value).subscribe((res) => {
      if (res['status'] == 400) {
        this.toastr.error('', res['message']);
      } else {
        localStorage.removeItem('idPlan');
        let tellusmore = localStorage.getItem('tellusmore');

        if (tellusmore == '1') {
          this.getMemmoryActorDetails(this.idActor);
        } else {
          this.toastr.success('', 'Details has been saved successfully.');
          this.ngZone.run(() => this.router.navigateByUrl('/registration-success'));
        }
      }
    });
  }

  getMemmoryActorDetails(idAct: any) {
    this.registerService.getPartialArtist(idAct).subscribe((res) => {
      if (res['status'] == 200) {
        let userCr = res['data']['userDetails'];
        this.loginForm.patchValue({ email: userCr.email });
        this.loginForm.patchValue({ password: userCr.Pswd });
        this.setLogin();
      } else {
        this.toastr.error('', 'Error occurred. Please login manually');
      }
    });
  }
  accountDEtails() {
    var userId = this.idActor;
    this.myaccountService.getMyAccountDetailsById().subscribe((data) => {
      let response = data;
      if (response['data'][0]) {
        this.accountDetailsList = response['data'][0];
        let accountPhone = this.accountDetailsList.Phone.trim();
        let emailID = this.accountDetailsList.Email.trim();
        accountPhone = accountPhone.replace(/[^\x20-\x7E]/g, '');
        accountPhone = accountPhone.replace(/-/g, '');
        let accContact = this.accountDetailsList?.FirstName + ' ' + this.accountDetailsList?.LastName;

        let baseUrlHe = `https://direct.tranzila.com/shalash1/iframenew.php?currency=1&cred_type=1&template=custom_he&lang=il&tranmode=AK&sum=${this.amount}&phone=${accountPhone}&contact=${accContact}&email=${emailID}`;
        this.iframeHeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(baseUrlHe);

        let baseUrlEn = `https://direct.tranzila.com/shalash1/iframenew.php?currency=1&cred_type=1&template=custom&tranmode=AK&sum=${this.amount}&phone=${accountPhone}&contact=${accContact}&email=${emailID}`;
        this.iframeEnSrc = this.sanitizer.bypassSecurityTrustResourceUrl(baseUrlEn);
        this.artistName = this.accountDetailsList?.FirstName + this.accountDetailsList?.LastName;
        // var iframe = document.getElementById('myIframe') as HTMLIFrameElement;
        // iframe.src = iframe.src + '&sum=' + this.amount;
        // iframe.src = iframe.src + '&phone=' + accountPhone;
        // iframe.src =
        //   iframe.src + '&contact=' + this.accountDetailsList?.FirstName + ' ' + this.accountDetailsList?.LastName;
        this.newPaymentForm.patchValue({
          name: this.accountDetailsList?.FirstName + ' ' + this.accountDetailsList?.LastName,
        });
        this.newPaymentForm.patchValue({ phone: this.accountDetailsList?.Phone });
        this.newPaymentForm.patchValue({ email: this.accountDetailsList?.Email });
      }
    });
  }

  setLogin() {
    if (this.loginForm.valid) {
      this.auth.login(`${environment.apiUrl}login`, this.loginForm.value).subscribe(
        (res) => {
          if (res['status'] === 200) {
            localStorage.setItem('authToken', res['token']);
            localStorage.setItem('userId', res['user']['id']);
            localStorage.setItem('artistID', res['artistID']);
            localStorage.removeItem('idActor');
            localStorage.removeItem('saveBtn');
            this.openModal();
            this.actorAccountService.setData('successfull');
            // this.toastr.success('Success, thank you for registering!');
            setTimeout(() => {
              this.ngZone.run(() => this.router.navigateByUrl('/tell-us-more'));
            }, 3000);
          } else {
            this.toastr.error('', 'Error occurred. Please login manually');
          }
        },
        (err) => {
          this.toastr.error('', 'Error occurred. Please login manually');
        }
      );
    } else {
      this.toastr.error('', 'Error occurred. Please login manually');
    }
  }
  openModal() {
    const modalRef = this.modalService.open(this.modalContentt, { centered: true });
    const closeButton = document.getElementById('modalCloseButton');
    if (closeButton) {
      closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        modalRef.dismiss();
      });
    }
    const intervalTime = 2000;

    setTimeout(() => {
      modalRef.dismiss();
    }, intervalTime);
  }
  generateDateRange(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}

export interface IMonth {
  text: string;
  value: string;
}

export interface IYear {
  text: string;
  value: string;
}
