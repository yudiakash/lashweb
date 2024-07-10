import { Component, OnInit, NgZone } from '@angular/core';
import { CardService } from '../my-payments/card-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../auth/authentication.service';
import { MyaccountService } from '@app/myaccount/myaccount.service';
import { ActorDetailsService } from '@app/actor-details/actor-details.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.scss'],
})
export class MyPaymentsComponent implements OnInit {
  newPaymentForm!: FormGroup;
  monthlist: IMonth[] = [];
  month: IMonth = <IMonth>{};
  paymentDetails: string = '';
  paymentSchedule: string = '';
  userId: any;
  cardList: any = [];
  cardDetail: any = [];
  isData = true;
  cardNo: any;
  year: IYear = <IYear>{};
  years: IYear[] = [];
  accountDetailsList: any = [];
  saveBtn: boolean = false;
  artistToken: any;
  actiorDetails: any = [];
  elementMembership: boolean = false;
  paymentDate: any;
  paymentPlan: any = [];

  constructor(
    private cardService: CardService,
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public auth: AuthenticationService,
    private myaccountService: MyaccountService,
    private actorDetailsService: ActorDetailsService,
    private datePipe: DatePipe,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.accountDEtails();
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    this.getUser();
    this.getLoggedInId();
    this.getCardList();
    this.newPaymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [null, [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(11)]],
      email: [null, [Validators.required, Validators.email]],
      id_user: [this.userId, Validators.required],
      cardNumber: [
        null,
        [Validators.required, Validators.minLength(12), Validators.maxLength(16), Validators.pattern('^[0-9]*$')],
      ],
      expMonth: [null, [Validators.required]],
      expYear: [null, [Validators.required]],
      cvv: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]*$')],
      ],
      cardId: [null],
      is_default: [null],
      id: [null],
    });

    this.GetMonths();
    this.GetYears();
  }

  getLoggedInId() {
    this.userId = localStorage.getItem('userId');
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
    this.addCardDetails();
  }

  getCardList() {
    this.cardService.getcardList(this.userId).subscribe((res) => {
      this.isData = false;
      this.cardList = [];

      if (res['status'] == 200 && res['data'] != '') {
        this.cardList = res['data'];
        this.isData = true;
      }
    });
  }

  deleteCard(id: number) {
    this.cardService.deleteCard(id).subscribe((res) => {
      if (res['status'] == 400) {
        this.toastr.error('', res['message']);
      } else {
        const successMessage = this.translate.instant('card has been deleted successfully.');
        this.toastr.success(successMessage);
        this.getCardList();

        this.newPaymentForm.patchValue({
          id_user: '',
          cardNumber: '',
          expMonth: '',
          expYear: '',
          cvv: '',
          cardId: '',
          is_default: '',
          id: '',
        });
      }
    });
  }

  addCardDetails() {
    this.cardService.addCardDetails(this.newPaymentForm.value).subscribe((res) => {
      if (res['status'] == 400) {
        this.toastr.error('', res['message']);
      } else {
        this.toastr.success('', 'Details has been saved successfully.');
        this.getCardList();
        this.newPaymentForm.reset();
      }
    });
  }

  getCardDetail(id: number) {
    this.cardService.getCardDetail(id).subscribe((res) => {
      if (res['status'] == 200) {
        let response = res['data'];
        this.cardDetail = response;
        var cardNo = this.cardDetail.card_no;
        // const fistDigits = cardNo.slice(0, 4).replace(/\d/g, '*');
        // const LastDigits = cardNo.slice(-4);
        // this.cardNo = `${fistDigits}${LastDigits}`;
        this.cardNo = this.convertToAsterisks(cardNo);
        this.newPaymentForm.patchValue({
          id_user: response.user_id,
          cardNumber: this.cardNo,
          expMonth: response.exp_month,
          expYear: response.exp_year,
          cvv: response.cvv,
          cardId: response.card_id,
          is_default: response.is_default,
          id: response.id,
        });
      }
    });
  }
  convertToAsterisks(number: any) {
    let numberString = number.toString();
    let length = numberString.length;
    if (length > 4) {
      let asterisks = '*'.repeat(length - 4);
      numberString = asterisks + numberString.slice(-4);
    } else {
      return numberString;
    }
    return numberString;
  }
  accountDEtails() {
    this.myaccountService.getMyAccountDetailsById().subscribe((data) => {
      let response = data;
      if (response['data'][0]) {
        this.accountDetailsList = response['data'][0];
        this.newPaymentForm.patchValue({
          name: this.accountDetailsList?.FirstName + ' ' + this.accountDetailsList?.FirstName,
        });
        this.newPaymentForm.patchValue({ phone: this.accountDetailsList?.Phone });
        this.newPaymentForm.patchValue({ email: this.accountDetailsList?.Email });
      }
    });
  }
  getUser() {
    const artistID = localStorage.getItem('artistID');
    this.artistToken = artistID;
    let encoded: string = btoa(this.artistToken);
    this.actorDetailsService.getActorDetials(encoded).subscribe((data) => {
      this.actiorDetails = data['data'];
    });
  }
  renew() {
    this.saveBtn = true;
    localStorage.setItem('saveBtn', JSON.stringify(true));
    this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
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
