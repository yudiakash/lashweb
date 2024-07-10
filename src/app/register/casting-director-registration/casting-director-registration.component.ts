import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-casting-director-registration',
  templateUrl: './casting-director-registration.component.html',
  styleUrls: ['./casting-director-registration.component.scss'],
})
export class CastingDirectorRegistrationComponent implements OnInit {
  newRegisterForm!: FormGroup;
  shwMsg: any = true;
  workDate: boolean = true;
  currentLang: any = 'en';
  selectedFile: File | null = null;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toast: ToastrService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngDoCheck() {
    this.currentLang = localStorage.getItem('language');
  }
  ngOnInit(): void {
    this.currentLang = localStorage.getItem('language');

    this.newRegisterForm = this.formBuilder.group({
      FirstName: [null, Validators.required],
      LastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      projectName: [null],
      projectType: [null],
      generalDesc: [null],
      workDate: [null],
      budgetRange: [null],
      lang: [this.currentLang],
      FileName: [null],
      Phone: [
        null,
        [Validators.required, Validators.pattern('^[0-9-]*$'), Validators.minLength(10), Validators.maxLength(11)],
      ],
    });
  }

  get f() {
    return this.newRegisterForm.controls;
  }
  showMsg(event: any) {
    const data = event.target.value;
    if (data.length == 11) this.shwMsg = false;
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('FirstName', this.newRegisterForm.get('FirstName')?.value);
    formData.append('LastName', this.newRegisterForm.get('LastName')?.value);
    formData.append('email', this.newRegisterForm.get('email')?.value);
    formData.append('Phone', this.newRegisterForm.get('Phone')?.value);
    formData.append('files', this.newRegisterForm.get('FileName')?.value);
    formData.append('projectName', this.newRegisterForm.get('projectName')?.value);
    formData.append('projectType', this.newRegisterForm.get('projectType')?.value);
    formData.append('generalDesc', this.newRegisterForm.get('generalDesc')?.value);
    formData.append('workDate', this.newRegisterForm.get('workDate')?.value);
    formData.append('lang', this.currentLang);
    formData.append('budgetRange', this.newRegisterForm.get('budgetRange')?.value);

    this.registerService.createDirectors(formData).subscribe((res: any) => {
      if (res['status'] == 400) {
        const errorMsg = this.translate.instant(res['message']['FirstName'][0]);
        this.toast.error(errorMsg);
        const errorMsgLastname = this.translate.instant(res['message']['LastName'][0]);
        this.toast.error(errorMsgLastname);
        const errorMsgphone = this.translate.instant(res['message']['Phone'][0]);
        this.toast.error(errorMsgphone);
        const errorMsgemail = this.translate.instant(res['message']['email'][0]);
        this.toast.error(errorMsgemail);
      } else {
        const successMessage = this.translate.instant(
          'Your inquiry has been registered and you will be addressed as soon as one of our representatives becomes available'
        );
        this.toast.success(successMessage);
        this.router.navigateByUrl('/director-registration-success');
      }
    });
  }

  verifyDates(event: any) {
    const currentDate = new Date();
    if (new Date(event.target.value)) {
      if (new Date(event.target.value) < currentDate) {
        this.workDate = false;
        this.toast.error('work  date must be greater than current date');
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.newRegisterForm.get('FileName')?.setValue(file);
    this.selectedFile = file;
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
}
