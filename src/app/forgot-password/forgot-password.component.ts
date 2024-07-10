import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorDetailsService } from '../actor-details/actor-details.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  language: any;
  submitted = false;
  isRTL: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private actorDetailsService: ActorDetailsService,
    private translate: TranslateService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
    this.resetForm.controls['lang'].setValue(this.isRTL ? 'he' : 'en');
  }

  ngOnInit(): void {
    this.language = localStorage.getItem('language');
    this.resetForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      lang: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  resetPassword() {
    let data = this.resetForm.value;

    this.actorDetailsService.varifyResetPasswordEmail(this.resetForm.value).subscribe((res) => {
      if (res['status'] == 400) {
        const successMessage = this.translate.instant(res['message']);
        this.toastr.error(successMessage);
      } else {
        const successMessage = this.translate.instant(res['message']);
        this.toastr.success(successMessage);
      }
    });
  }
}
