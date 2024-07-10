import { Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WorkshopsService } from '@app/workshops/workshops.service';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { SearchService } from '@app/search/search.service';

@Component({
  selector: 'app-workshop-registration2',
  templateUrl: './workshop-registration2.component.html',
  styleUrls: ['./workshop-registration2.component.scss'],
})
export class WorkshopRegistration2Component implements OnInit {
  @ViewChild('myIframe2', { static: false }) myIframe2: ElementRef;
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('modal') modalRef!: ElementRef;
  showModal: boolean = true;
  newRegisterForm!: FormGroup;
  couponCodeForm!: FormGroup;
  language: any;
  id: any;
  email: any;
  registrationId: any;
  today: Date = new Date();
  selectedDateIsFuture: boolean;
  selectedDate: any;
  dateExpired: boolean = false;
  workshopData: any = [];
  imageUrl = `${environment.imgNewsUrl}`;
  url = `${environment.apiUrl}`;
  workshopId: any;
  earlyBirdDate: any;
  earlyBirdFee: any;
  amount: any;
  accruedDate: any;
  currentDate: any;
  iframes: any;
  successUrl: any;
  failureUrl: any;
  title: any;
  discountAmount: any;
  isRTL: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private worshopservice: WorkshopsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private searchService: SearchService
  ) {}
  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }
  ngAfterViewInit() {
    if (this.myIframe2) {
      const iframe: HTMLIFrameElement = this.myIframe2.nativeElement;
      // iframe.src += `&success_url=${this.url}tranzilla-success`;
      // iframe.src += `&fail_url=${this.url}tranzilla-failed`;
    }
  }
  ngOnInit(): void {
    this.discountAmount = localStorage.getItem('discountAmount');
    if (this.discountAmount) {
      this.amount = this.discountAmount;
    }
    this.workshopId = localStorage.getItem('workshopId');
    this.language = localStorage.getItem('language');
    this.registrationId = localStorage.getItem('idregistration');
    this.email = localStorage.getItem('email');
    this.newRegisterForm = this.formBuilder.group({
      cvv: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]*$')],
      ],
      ccno: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[0-9]*$')],
      ],
      email: [this.email, [Validators.required, Validators.email]],
      expYear: [null, [Validators.required]],
      expMonth: [null, [Validators.required]],
      registrationId: [this.registrationId, Validators.required],
      amount: [null, Validators.required],
    });

    this.couponCodeForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      registrationId: [Number(this.registrationId), Validators.required],
      amount: [null, Validators.required],
    });

    this.getWorkshopDetails();
    this.GetLiveCode();
  }
  getWorkshopDetails() {
    this.worshopservice.getWorkshopsDetails(this.workshopId).subscribe((data) => {
      this.workshopData = data['data'];
      this.translateTextHe();
      this.translateText();
      if (this.workshopData.early_bird_date) {
        this.accruedDate = new Date(this.workshopData.early_bird_date);
      } else {
        this.accruedDate = new Date(this.workshopData.date);
      }
      this.currentDate = new Date();
      if (this.workshopData.early_bird_date && this.workshopData.early_bird_fee) {
        if (this.currentDate < this.accruedDate) {
          this.earlyBirdDate = this.workshopData.early_bird_date;
          this.newRegisterForm.patchValue({ amount: this.amount });
          this.couponCodeForm.patchValue({ amount: this.workshopData.early_bird_fee });
        } else {
          this.newRegisterForm.patchValue({ amount: this.workshopData.fee });
          this.couponCodeForm.patchValue({ amount: this.workshopData.fee });
          this.amount = this.workshopData.fee;
        }
      } else {
        this.amount = this.workshopData.fee;
        this.newRegisterForm.patchValue({ amount: this.amount });
        this.couponCodeForm.patchValue({ amount: this.amount });
      }
      const iframe: HTMLIFrameElement = this.myIframe2.nativeElement;
      iframe.src += `&sum=${this.amount}`;
    });
  }

  get f() {
    return this.newRegisterForm.controls;
  }
  get c() {
    return this.couponCodeForm.controls;
  }
  onSubmit() {
    this.worshopservice.workshopPayment(this.newRegisterForm.value).subscribe((res: any) => {
      if (res['status'] == 400) {
        this.toastr.error(res['message']);
      } else {
        const successMessage = this.translate.instant('Details has been saved successfully..');
        this.toastr.success(successMessage);
        setTimeout(() => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/workshop-registration3');
          });
        }, 2000);
      }
    });
  }
  isDateGreaterThanToday(): void {
    const selectedYear = this.newRegisterForm.value.expYear;
    const selectedMonth = this.newRegisterForm.value.expMonth;

    if (selectedYear && selectedMonth) {
      const selectedDate = new Date(selectedYear, selectedMonth - 1, 1);
      this.selectedDate = selectedDate;

      this.dateExpired = false;
      this.selectedDateIsFuture = selectedDate > this.today;
      if (selectedDate < this.today) {
        this.dateExpired = true;
      }
    }
  }
  save() {
    this.worshopservice.AddCouponCode(this.couponCodeForm.value).subscribe((res: any) => {
      if (res['status'] == 400) {
        this.toastr.error(res['message']);
        setTimeout(() => {
          this.closeButton.nativeElement.click();
          this.couponCodeForm.controls['title'].reset();
        }, 2000);
      } else {
        const successMessage = this.translate.instant(res['message']);
        this.toastr.success(successMessage);
        setTimeout(() => {
          this.closeButton.nativeElement.click();
          this.couponCodeForm.controls['title'].reset();
        }, 2000);
      }
      setTimeout(() => {
        this.GetLiveCode();
      }, 1000);
    });
  }

  GetLiveCode() {
    this.worshopservice.GetLiveCode(this.registrationId).subscribe((res: any) => {
      if (res['status'] == 400) {
        // this.toastr.error(res['message']);
      } else {
        if (this.registrationId == res['data'].registration_id) {
          this.title = res['data'].title;
          this.discountAmount = res['data'].amount;
          if (this.discountAmount) {
            this.newRegisterForm.patchValue({ amount: res['data'].amount });
            this.amount = res['data'].amount;
          }
        }
      }
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('title');
    localStorage.removeItem('discountAmount');
  }
  DeleteLiveCode() {
    this.worshopservice.DeleteLiveCode(this.registrationId).subscribe((res: any) => {
      if (res['status'] == 400) {
        this.toastr.error(res['message']);
      } else {
        this.toastr.error(res['message']);
        this.title = '';
        this.getWorkshopDetails();
      }
    });
  }
  showConfirmation() {
    const confirmation = confirm('Are you sure you want to delete this live code?');
    if (confirmation) {
      this.DeleteLiveCode();
    }
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

export interface IMonth {
  text: string;
  value: string;
}
export interface IYear {
  text: string;
  value: string;
}
