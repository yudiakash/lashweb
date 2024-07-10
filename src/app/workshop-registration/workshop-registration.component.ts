import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WorkshopsService } from '@app/workshops/workshops.service';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { SearchService } from '@app/search/search.service';

@Component({
  selector: 'app-workshop-registration',
  templateUrl: './workshop-registration.component.html',
  styleUrls: ['./workshop-registration.component.scss'],
})
export class WorkshopRegistrationComponent implements OnInit {
  newRegisterForm!: FormGroup;
  language: any;
  id: any;
  workshopData: any = [];
  imageUrl = `${environment.imgNewsUrl}`;
  phoneValidtn: boolean = false;
  showInput: boolean = false;
  RequestInformation: any;
  isRTL: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private worshopservice: WorkshopsService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    const userID = localStorage.getItem('userId') ? localStorage.getItem('userId') : '';
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    localStorage.setItem('workshopId', this.id);
    this.language = localStorage.getItem('language');
    this.newRegisterForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      surName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.maxLength(11)]],
      userId: [userID],
      workshopId: [this.id, Validators.required],
    });
    this.getWorkshopDetails();
  }
  get f() {
    return this.newRegisterForm.controls;
  }
  getWorkshopDetails() {
    this.worshopservice.getWorkshopsDetails(this.id).subscribe((data) => {
      this.workshopData = data['data'];
      this.translateTextHe();
      this.translateText();
    });
  }
  onSubmit() {
    const formData = this.newRegisterForm.value;
    if (this.showInput) {
      formData.is_only_request = 1;
    }
    this.worshopservice.createWorkshop(formData).subscribe((res: any) => {
      if (res['status'] == 400) {
        this.toastr.error(res['message']);
      } else {
        localStorage.setItem('email', this.newRegisterForm.value.email);
        localStorage.setItem('idregistration', res['data'].idregistration);
        const successMessage = this.translate.instant('Details has been created successfully.');
        this.toastr.success(successMessage);
        this.RequestInformation = localStorage.getItem('RequestInformation');
        setTimeout(() => {
          if (this.RequestInformation) {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/workshop-registration3');
            });
          } else {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/workshop-registration2');
            });
          }
          // const successMessage = this.translate.instant('Redirecting to actor account');
          // this.toastr.success(successMessage);
          // this.idActor = localStorage.getItem('idActor') || localStorage.getItem('userId');
        }, 2000);
      }
    });
  }
  phoneValidation(event: any) {
    const inputValue = event.target.value;
    const phoneNumber = inputValue.replace(/\s|-/g, '');
    if (inputValue) {
      if (!phoneNumber.startsWith('05')) {
        this.phoneValidtn = true;
      } else {
        this.phoneValidtn = false;
      }
    }
  }
  checkbox() {
    this.showInput = !this.showInput;
    console.log('showInput', this.showInput);
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
  ngOnDestroy() {
    localStorage.removeItem('RequestInformation');
  }
}
