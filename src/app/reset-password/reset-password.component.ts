import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorDetailsService } from '../actor-details/actor-details.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  id: string;
  language: any;
  msgAlert: string;
  confirmPswd: any;
  pswd: any;
  autocompleteValue: string;
  passwordFormControl: FormControl;
  nameFormControl: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private actorDetailsService: ActorDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.language = localStorage.getItem('language');
    console.log('localstorage........', localStorage);
    this.id = this.route.snapshot.params['id'];
    this.passwordFormControl = new FormControl(null, [Validators.required]);
    this.nameFormControl = new FormControl(null, [Validators.required]);

    this.resetForm = this.formBuilder.group({
      password: this.passwordFormControl,
      confirmpassword: this.nameFormControl,
      userID: [this.id, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }
  paswd(event: any) {
    this.pswd = event.target.value;
  }

  confirmPaswd(event: any) {
    this.confirmPswd = event.target.value;
    this.paswdConfirm();
  }
  paswdConfirm() {
    if (this.pswd != this.confirmPswd) {
      this.msgAlert = `Password did not match`;
    } else if (this.pswd == this.confirmPswd) {
      this.msgAlert = '';
    }
  }

  resetPassword() {
    if (this.resetForm.valid && this.pswd == this.confirmPswd) {
      // if (this.resetForm.value.password != this.resetForm.value.confirmpassword) {
      //   this.msgAlert = `Password did not match`;
      //   this.toastr.error('Password and Confirm Password are not matching');
      //   return;
      // }
      this.actorDetailsService.resetPasswordEmail(this.resetForm.value).subscribe((res) => {
        this.passwordFormControl.disable();
        this.nameFormControl.disable();
        if (res['status'] == 400) {
          if (this.language != 'he-IL') {
            if (typeof res['message']['password'] !== 'undefined') {
              this.toastr.error(res['message']['password'][0]);
            } else {
              this.toastr.error(res['message']);
            }
          } else {
            this.toastr.error('אימייל לא קיים');
          }
        } else {
          if (this.language != 'he-IL') {
            this.toastr.success(res['message']);
          } else if (this.language != 'en-US') {
            this.toastr.success('', 'קישור לאיפוס נשלח לאימייל שלך');
          }
          setTimeout(() => {
            this.ngZone.run(() => this.router.navigateByUrl('/login'));
            localStorage.clear();
          }, 2000);
        }
        this.passwordFormControl.enable();
        this.nameFormControl.enable();
      });
    } else {
      this.toastr.error('Form is not valid!');
    }
  }
}
