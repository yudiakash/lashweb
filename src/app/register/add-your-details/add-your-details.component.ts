import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../../register/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../auth/authentication.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { SearchService } from '@app/search/search.service';

@Component({
  selector: 'app-add-your-details',
  templateUrl: './add-your-details.component.html',
  styleUrls: ['./add-your-details.component.scss'],
})
export class AddYourDetailsComponent implements OnInit {
  userSource = [
    { id: 1, name: 'Through a friend' },
    { id: 2, name: 'Social media' },
    { id: 3, name: 'My acting course' },
  ];
  newRegisterForm!: FormGroup;
  currentDate: any;
  shwMsg: any = true;
  pswd: any;
  confirmPswd: any;
  msgAlert: string;
  keyArray: any = [];
  memmoryActor: any = '';
  passwordFormControl: FormControl;
  nameFormControl: FormControl;
  loginForm: FormGroup;
  idActor: number | string | null;
  password: string;
  showPassword: boolean = false;
  fieldTextType: boolean = false;
  confirmPswdField: boolean = false;
  language: any;
  isRTL: boolean = false;
  height: any;
  numberRange: any = [];
  countryList: any = [];
  CountriesList: any = [];
  countries: any;
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private datepipe: DatePipe,
    private auth: AuthenticationService,
    private translate: TranslateService,
    private searchService: SearchService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.language = localStorage.getItem('language');
    this.passwordFormControl = new FormControl(null, [Validators.required]);
    this.nameFormControl = new FormControl(null, [Validators.required]);

    this.newRegisterForm = this.formBuilder.group({
      FirstName: [null, Validators.required],
      name: this.nameFormControl,
      LastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: this.passwordFormControl,
      confirmPassword: [null, [Validators.required]],
      Gender: ['', [Validators.required]],
      Height: [0, [Validators.required]],
      //Weight: [null, [Validators.required]],
      BirthDay: [null, [Validators.required]],
      Phone: [
        null,
        //[Validators.required, Validators.pattern('^[0-9-]*$'), Validators.minLength(10), Validators.maxLength(11)],
        [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(11)],
      ],
      Newsletter: [''],
      NewCountry: ['', Validators.required],
      NewCity: [null, Validators.required],
      NewAddress: [null, Validators.required],
      NewZipCode: [null, Validators.required],
      Country: [null],
      City: [null],
      Address: [null],
      ZipCode: [null],
      user_source: [''],
      shoe_size: [''],
      shirt_size: [''],
      pant_size: [''],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      type: ['actor'],
    });

    let date: Date = new Date();
    console.log('Date = ' + date);
    this.currentDate = this.datepipe.transform(date, 'yyyy-MM-dd');

    this.memmoryActor = localStorage.getItem('idActor') || localStorage.getItem('userId');
    if (this.memmoryActor) {
      this.getMemmoryActorDetails(this.memmoryActor);
    }
    this.generateNumberRange();
    this.getCountryList();
  }

  get f() {
    return this.newRegisterForm.controls;
  }

  paswd(event: any) {
    this.pswd = event.target.value;
  }
  confirmPaswd(event: any) {
    this.confirmPswd = event.target.value;
    this.paswdConfirm();
  }
  getkeys(event: any) {
    let keys = event.key;
    this.keyArray.push(keys);
    var newArray = [this.keyArray.join('')];
    let arrray = newArray.toString();
    console.log('keyArray', arrray);
    if (this.pswd != arrray) {
      this.msgAlert = `Password did not match`;
    } else if (this.pswd == arrray) {
      this.msgAlert = '';
    }
  }

  paswdConfirm() {
    if (this.pswd != this.confirmPswd) {
      this.msgAlert = `Password did not match`;
    } else if (this.pswd == this.confirmPswd) {
      this.msgAlert = '';
    }
  }

  onSubmit() {
    const currentDate = new Date();
    const userDate = new Date(this.newRegisterForm.value.BirthDay);

    if (userDate > currentDate) {
      const successMessage = this.translate.instant('Please select a valid date');
      this.toastr.error(successMessage);
    } else {
      if (this.memmoryActor) {
        this.updatePartialArtist();
      } else {
        this.createArtist();
      }
    }
  }

  showMsg(event: any) {
    const data = event.target.value;
    if (data.length == 11) this.shwMsg = false;
  }

  createArtist() {
    this.newRegisterForm.patchValue({ City: this.newRegisterForm.value.NewCity });
    this.newRegisterForm.patchValue({ Address: this.newRegisterForm.value.NewAddress });
    this.newRegisterForm.patchValue({ Country: this.newRegisterForm.value.NewCountry });
    this.newRegisterForm.patchValue({ ZipCode: this.newRegisterForm.value.NewZipCode });

    this.registerService.createArtist(this.newRegisterForm.value).subscribe((res) => {
      this.passwordFormControl.disable();
      this.nameFormControl.disable();

      if (res['status'] == 400) {
        this.showTosterMessage(res['message']);
      } else {
        let idActor = res['data']['idActor'];
        localStorage.setItem('idActor', idActor);
        setTimeout(() => {
          const successMessage = this.translate.instant('Please wait you are redirecting to actor account');
          this.toastr.success(successMessage);
          this.idActor = localStorage.getItem('idActor') || localStorage.getItem('userId');
          this.getMemmoryActorDetails(this.idActor);
        }, 2000);
        localStorage.setItem('nameRegister', this.newRegisterForm.value.name);
        localStorage.setItem('emailRegister', JSON.stringify(this.newRegisterForm.value.email));
        localStorage.setItem('enableSideBar', JSON.stringify(true));
        localStorage.setItem('unshowingFirstpopup', JSON.stringify(true));
        localStorage.setItem('unshowingRenewal', JSON.stringify(true));
        localStorage.setItem('unShowingSecondPopup', JSON.stringify(true));
      }
      this.passwordFormControl.enable();
      this.nameFormControl.enable();
    });
  }

  updatePartialArtist() {
    this.newRegisterForm.patchValue({ City: this.newRegisterForm.value.NewCity });
    this.newRegisterForm.patchValue({ Address: this.newRegisterForm.value.NewAddress });
    this.newRegisterForm.patchValue({ Country: this.newRegisterForm.value.NewCountry });
    this.newRegisterForm.patchValue({ ZipCode: this.newRegisterForm.value.NewZipCode });

    this.registerService.updatePartialArtist(this.newRegisterForm.value, this.memmoryActor).subscribe((res) => {
      this.passwordFormControl.disable();
      this.nameFormControl.disable();

      if (res['status'] == 400) {
        this.showTosterMessage(res['message']);
      } else {
        const successMessage = this.translate.instant('Details has been updated successfully.');
        this.toastr.success(successMessage);
        setTimeout(() => {
          const successMessage = this.translate.instant('Redirecting to actor account');
          this.toastr.success(successMessage);
          this.idActor = localStorage.getItem('idActor') || localStorage.getItem('userId');
          this.getMemmoryActorDetails(this.idActor);
        }, 2000);
        localStorage.setItem('nameRegister', this.newRegisterForm.value.name);
        localStorage.setItem('emailRegister', JSON.stringify(this.newRegisterForm.value.email));
        localStorage.setItem('enableSideBar', JSON.stringify(true));
        localStorage.setItem('unshowingFirstpopup', JSON.stringify(true));
        localStorage.setItem('unshowingRenewal', JSON.stringify(true));
        localStorage.setItem('unShowingSecondPopup', JSON.stringify(true));
      }

      this.passwordFormControl.enable();
      this.nameFormControl.enable();
    });
  }

  showTosterMessage(response: any) {
    if (typeof response['FirstName'] !== 'undefined') {
      const successMessage = this.translate.instant(response['FirstName'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['LastName'] !== 'undefined') {
      const successMessage = this.translate.instant(response['LastName'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['name'] !== 'undefined') {
      const successMessage = this.translate.instant(
        'The username field is required / this user name is already taken.'
      );
      this.toastr.error(successMessage);
    }

    if (typeof response['email'] !== 'undefined') {
      if (response['email'][0] === 'The email field is required.') {
        const successMessage = this.translate.instant(response['email'][0]);
        this.toastr.error(successMessage);
      }
      if (response['email'][0] === 'The email has already been taken.') {
        if (this.isRTL) {
          const successMessage =
            '<div style="background-color: red;">האימייל שלך כבר קיים במערכת, כדי לשחזר את הסיסמה שלך <a style="font-weight:bolder; text-decoration: underline;" href="/forgot-password" class="forgot-password-link">לחץ כאן</a></div>';
          const successMessagee = this.translate.instant(successMessage);
          this.toastr.error(successMessagee, '', {
            enableHtml: true,
            timeOut: 5000,
          });
        } else {
          const successMessage =
            '<div style="background-color: red;">Your email already exists in the system, to recover your password <a style="font-weight:bolder; text-decoration: underline;" href="/forgot-password" class="forgot-password-link">click here</a></div>';
          const successMessagee = this.translate.instant(successMessage);
          this.toastr.error(successMessagee, '', {
            enableHtml: true,
            timeOut: 5000,
          });
        }
      }
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
      console.log('successMessage', successMessage);
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

    if (typeof response['Height'] !== 'undefined') {
      const successMessage = this.translate.instant(response['Height'][0]);
      this.toastr.error(successMessage);
    }

    if (typeof response['user_source'] !== 'undefined') {
      const successMessage = this.translate.instant(response['user_source'][0]);
      this.toastr.error(successMessage);
    }
  }

  /** to restore from memmory */
  getMemmoryActorDetails(idAct: any) {
    this.registerService.getPartialArtist(idAct).subscribe((res) => {
      if (res['status'] == 200) {
        let userCr = res['data']['userDetails'];
        this.newRegisterForm.patchValue({ FirstName: userCr.FirstName });
        this.newRegisterForm.patchValue({ LastName: userCr.LastName });
        this.newRegisterForm.patchValue({ Gender: userCr.Gender });
        // this.newRegisterForm.patchValue({ Height: userCr.Height });
        this.newRegisterForm.patchValue({ name: userCr.name });
        this.newRegisterForm.patchValue({ email: userCr.email });
        this.newRegisterForm.patchValue({ password: userCr.Pswd });
        this.newRegisterForm.patchValue({ confirmPassword: userCr.Pswd });
        this.newRegisterForm.patchValue({ BirthDay: userCr.BirthDay });
        this.newRegisterForm.patchValue({ Phone: userCr.Phone });
        this.newRegisterForm.patchValue({ NewCity: userCr.City });
        this.newRegisterForm.patchValue({ NewAddress: userCr.Address });
        this.newRegisterForm.patchValue({ NewCountry: userCr.Country });
        this.newRegisterForm.patchValue({ NewZipCode: userCr.ZipCode });
        this.loginForm.patchValue({ email: userCr.email });
        this.loginForm.patchValue({ password: userCr.Pswd });
        this.setLogin();
      }
    });
  }

  setLogin() {
    this.loginForm.patchValue({ email: this.newRegisterForm.value.email });
    this.loginForm.patchValue({ password: this.newRegisterForm.value.password });
    this.auth.login(`${environment.apiUrl}login`, this.loginForm.value).subscribe(
      (res) => {
        if (res['status'] == 200) {
          localStorage.setItem('authToken', res['token']);
          localStorage.setItem('userId', res['user']['id']);
          localStorage.setItem('artistID', res['artistID']);
          localStorage.removeItem('idActor');
          localStorage.setItem('renderSidebar', JSON.stringify(true));
          this.ngZone.run(() => {
            this.router.navigateByUrl('/actor-account');
            setTimeout(() => {
              window.location.reload();
            }, 900);
          });
        } else {
          this.toastr.error('', 'Error occurred. Please login manually');
        }
      },
      (err) => {
        this.toastr.error('', 'Error occurred. Please login manually');
      }
    );
  }

  getShowpassword() {
    this.fieldTextType = false;
  }
  toggleFieldTextType() {
    console.log('this.fieldTextType', this.fieldTextType);

    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldConfirmPswd() {
    console.log('this.confirmPswdField', this.confirmPswdField);

    this.confirmPswdField = !this.confirmPswdField;
  }

  private generateNumberRange(): void {
    for (let i = 60; i <= 200; i++) {
      this.numberRange.push(i);
    }
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
  //       this.countries = {[data.country_name]: data.country_name};
  //       this.CountriesList.push(this.countries)
  //       data['CountryHe'] = translatedText;
  //     })
  //   );
  //   console.log(' this.countryList', this.CountriesList);
  // }
}
