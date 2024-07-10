import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorDetailsService } from '../actor-details/actor-details.service';
@Component({
  selector: 'app-reset-username',
  templateUrl: './reset-username.component.html',
  styleUrls: ['./reset-username.component.scss'],
})
export class ResetUsernameComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  id: string;
  language: any;
  msgAlert: string;
  confirmPswd: any;
  pswd: any;
  autocompleteValue: string;
  usernameFormControl: FormControl;
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
    this.id = this.route.snapshot.params['id'];
    this.usernameFormControl = new FormControl(null, [Validators.required]);

    this.resetForm = this.formBuilder.group({
      name: this.usernameFormControl,
      userID: [this.id, [Validators.required]],
    });
  }
  get f() {
    return this.resetForm.controls;
  }

  resetUsername() {
    if (this.resetForm.valid) {
      // if (this.resetForm.value.password != this.resetForm.value.confirmpassword) {
      //   this.msgAlert = `Password did not match`;
      //   this.toastr.error('Password and Confirm Password are not matching');
      //   return;
      // }
      this.actorDetailsService.resetUsernameEmail(this.resetForm.value).subscribe((res) => {
        this.usernameFormControl.disable();
        if (res['status'] == 400) {
          if (this.language != 'he-IL') {
            if (typeof res['message']['name'] !== 'undefined') {
              this.toastr.error(res['message']['name'][0]);
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
        this.usernameFormControl.enable();
      });
    } else {
      this.toastr.error('Please add username');
    }
  }
}
