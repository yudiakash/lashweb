import { Component, OnInit, NgZone, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MyaccountService } from './myaccount.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../auth/authentication.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { RegisterService } from '../register/register.service';
import { SearchService } from '@app/search/search.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss'],
})
export class MyaccountComponent implements OnInit {
  userSource = [
    { id: 1, name: 'Through a friend' },
    { id: 2, name: 'Social media' },
    { id: 3, name: 'My acting course' },
  ];
  @ViewChild('myDateInput') myDateInput: ElementRef;
  accountDetailsList: any = [];
  http: any;
  newRegisterForm!: FormGroup;
  userId: any;
  fieldTextType: boolean = true;
  currentDate: any;
  shwMsg: boolean = true;
  pendingChanges: any = [];
  pendingCity: any;
  pendingCountry: any;
  pendingAddress: any;
  pendingZipCode: any;
  pendingFirstName: any;
  pendingLastName: any;
  pendingMale: any;
  pendingBirthday: any;
  pendingUsername: any;
  pendingEmail: any;
  pendingPhone: any;
  pendingFemale: any;
  minBirthDate: string;
  elementMembership: boolean = false;
  saveBtn: boolean = false;
  language: any;
  passwordFormControl: FormControl;
  nameFormControl: FormControl;
  countryList: any = [];
  isRTL: boolean = false;

  constructor(
    private myaccountService: MyaccountService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public auth: AuthenticationService,
    private datepipe: DatePipe,
    private renderer: Renderer2,
    private translate: TranslateService,
    private registerService: RegisterService,
    private searchService: SearchService
  ) {
    this.getUserId();
  }
  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.passwordFormControl = new FormControl(null, [Validators.required]);
    this.nameFormControl = new FormControl(null, [Validators.required]);
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }

    this.newRegisterForm = this.formBuilder.group({
      FirstName: [null, Validators.required],
      name: this.nameFormControl,
      LastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: this.passwordFormControl,
      Gender: [null, [Validators.required]],
      Height: [null, [Validators.required]],
      BirthDay: [null, [Validators.required]],
      Phone: [null, [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(11)]],
      Country: [null],
      City: [null],
      Address: [null],
      ZipCode: [null],
      ActCountry: [null, [Validators.required]],
      ActCity: [null, [Validators.required]],
      ActAddress: [null, [Validators.required]],
      ActZipCode: [null, [Validators.required]],
      user_id: [null, Validators.required],
      user_source: ['', Validators.required],
      shoe_size: [null],
      shirt_size: [null],
      pant_size: [null],
    });

    this.myaccountService.getMyAccountDetailsById().subscribe((data) => {
      let response = data;
      if (response['data'][0]) {
        this.accountDetailsList = response['data'][0];
        const membershipExpiryDate = this.accountDetailsList['membershipExpiryDate'];
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

        this.showFormData();
      }
    });

    let date: Date = new Date();
    this.currentDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.getPendingChanges();
    this.getCountryList();
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  get f() {
    return this.newRegisterForm.controls;
  }

  onSubmit() {
    const currentDate = new Date();
    const userDate = new Date(this.newRegisterForm.value.BirthDay);

    if (userDate > currentDate) {
      const successMessage = this.translate.instant('Please select a valid date');
      this.toastr.error(successMessage);
    } else {
      this.updateArtist();
    }
  }

  showMsg(event: any) {
    const data = event.target.value;
    if (data.length == 11) this.shwMsg = false;
  }

  updateArtist() {
    this.newRegisterForm.patchValue({ user_id: this.userId });
    this.newRegisterForm.patchValue({ City: this.newRegisterForm.value.ActCity });
    this.newRegisterForm.patchValue({ Address: this.newRegisterForm.value.ActAddress });
    this.newRegisterForm.patchValue({ Country: this.newRegisterForm.value.ActCountry });
    this.newRegisterForm.patchValue({ ZipCode: this.newRegisterForm.value.ActZipCode });

    this.myaccountService.updateArtist(this.newRegisterForm.value).subscribe((res) => {
      this.passwordFormControl.disable();
      this.nameFormControl.disable();
      if (res['status'] == 400) {
        this.showTosterMessage(res['message']);
      } else {
        const successMessage = this.translate.instant('Details has been saved successfully.');
        this.toastr.success(successMessage);
      }
      this.passwordFormControl.enable();
      this.nameFormControl.enable();
    });
  }

  showTosterMessage(response: any) {
    if (typeof response['FirstName'] !== 'undefined') {
      const successMessage = this.translate.instant(response['FirstName'][0]);
      this.toastr.error(successMessage);
      console.log('successMessage', successMessage);
    }

    if (typeof response['LastName'] !== 'undefined') {
      const successMessage = this.translate.instant(response['LastName'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['name'] !== 'undefined') {
      const successMessage = this.translate.instant('The username field is required.');
      this.toastr.error(successMessage);
    }

    if (typeof response['email'] !== 'undefined') {
      const successMessage = this.translate.instant(response['email'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['Phone'] !== 'undefined') {
      const successMessage = this.translate.instant(response['Phone'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['BirthDay'] !== 'undefined') {
      const successMessage = this.translate.instant(response['BirthDay'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['password'] !== 'undefined') {
      const successMessage = this.translate.instant(response['password'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['Gender'] !== 'undefined') {
      const successMessage = this.translate.instant(response['Gender'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['Country'] !== 'undefined') {
      const successMessage = this.translate.instant(response['Country'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['City'] !== 'undefined') {
      const successMessage = this.translate.instant(response['City'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['Address'] !== 'undefined') {
      const successMessage = this.translate.instant(response['Address'][0]);
      this.toastr.error(successMessage);
    }
    if (typeof response['ZipCode'] !== 'undefined') {
      const successMessage = this.translate.instant(response['ZipCode'][0]);
      this.toastr.error(successMessage);
    }
    if (typeof response['user_source'] !== 'undefined') {
      const successMessage = this.translate.instant(response['user_source'][0]);
      this.toastr.error(successMessage);
    }
  }
  showFormData() {
    this.newRegisterForm.patchValue({
      FirstName: this.accountDetailsList.FirstName,
      LastName: this.accountDetailsList.LastName,
      name: this.accountDetailsList.UserName,
      email: this.accountDetailsList.Email,
      Phone: this.accountDetailsList.Phone,
      BirthDay: this.accountDetailsList.BirthDay,
      Gender: this.accountDetailsList.Gender,
      Country: this.accountDetailsList.Country,
      City: this.accountDetailsList.City,
      Address: this.accountDetailsList.Address,
      ZipCode: this.accountDetailsList.ZipCode,
      password: this.accountDetailsList.Pswd,
      ActCountry: this.accountDetailsList.Country,
      ActCity: this.accountDetailsList.City,
      ActAddress: this.accountDetailsList.Address,
      ActZipCode: this.accountDetailsList.ZipCode,
      user_source: this.accountDetailsList.user_source,
      shoe_size: this.accountDetailsList.shoe_size,
      shirt_size: this.accountDetailsList.shirt_size,
      pant_size: this.accountDetailsList.pant_size,
    });

    this.fieldTextType = !this.fieldTextType;
  }

  getUserId() {
    const userID = localStorage.getItem('userId');
    this.userId = userID;
  }
  getPendingChanges() {
    const completed = 0;
    const artistID = localStorage.getItem('artistID');

    this.myaccountService.getPendingChanges(completed, artistID).subscribe((res: any) => {
      this.pendingChanges = res['data'];
      this.pendingChanges.map((data: any) => {
        if (data.Label == 'City') {
          this.pendingCity = data.NewValue;
          this.newRegisterForm.patchValue({ City: this.pendingCity });
        }
        if (data.Label == 'Country') {
          this.pendingCountry = data.NewValue;
          this.newRegisterForm.patchValue({ Country: this.pendingCountry });
        }
        if (data.Label == 'Address') {
          this.pendingAddress = data.NewValue;
          this.newRegisterForm.patchValue({ Address: this.pendingAddress });
        }
        if (data.Label == 'ZipCode') {
          this.pendingZipCode = data.NewValue;
          this.newRegisterForm.patchValue({ ZipCode: this.pendingZipCode });
        }
        if (data.Label == 'FirstName') {
          this.pendingFirstName = data.NewValue;
          this.newRegisterForm.patchValue({ FirstName: this.pendingFirstName });
        }
        if (data.Label == 'LastName') {
          this.pendingLastName = data.NewValue;
          this.newRegisterForm.patchValue({ LastName: this.pendingLastName });
        }
        if (data.Label == 'Gender') {
          if (data.NewValue == 1) {
            this.pendingFemale = data.NewValue;
            this.newRegisterForm.patchValue({ Gender: this.pendingFemale });
          }
          if (data.NewValue == 0) {
            this.pendingMale = data.NewValue;
            this.newRegisterForm.patchValue({ Gender: this.pendingMale });
          }
        }
        if (data.Label == 'BirthDay') {
          this.pendingBirthday = data.NewValue;
          this.newRegisterForm.patchValue({ BirthDay: this.pendingBirthday });
        }
        if (data.Label == 'UserName') {
          this.pendingUsername = data.NewValue;
          this.newRegisterForm.patchValue({ name: this.pendingUsername });
        }
        if (data.Label == 'email') {
          this.pendingEmail = data.NewValue;
          this.newRegisterForm.patchValue({ email: this.pendingEmail });
        }
        if (data.Label == 'Phone') {
          this.pendingPhone = data.NewValue;
          this.newRegisterForm.patchValue({ Phone: this.pendingPhone });
        }
      });
    });
  }

  getShowpassword() {
    this.fieldTextType = true;
  }
  renew() {
    this.saveBtn = true;
    localStorage.setItem('saveBtn', JSON.stringify(true));
    this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
  }

  getCountryList() {
    this.registerService.getCountryList().subscribe((data) => {
      this.countryList = data['data'];
      // this.translateTextHe();
    });
  }
  // async translateTextHe() {
  //   await Promise.all(
  //     this.countryList.map(async (data: any) => {
  //       const names = `${data.country_name}`.toLowerCase();
  //       const translatedText = await this.searchService.translateText(
  //         environment.englishLanguage,
  //         environment.hebrewLanguage,
  //         names
  //       );
  //       data['CountryHe'] = translatedText;
  //     })
  //   );
  // }
}
