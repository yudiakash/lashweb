import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorDetailsService } from '../actor-details/actor-details.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.scss'],
})
export class ForgotUsernameComponent implements OnInit {
  resetForm: FormGroup;
  language: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private actorDetailsService: ActorDetailsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.language = localStorage.getItem('language');
    this.resetForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
  get f() {
    return this.resetForm.controls;
  }

  resetUsername() {
    let data = this.resetForm.value;

    this.actorDetailsService.verifyResetusernameEmail(this.resetForm.value).subscribe((res) => {
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
