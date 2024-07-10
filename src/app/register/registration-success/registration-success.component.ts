import { Component, OnInit, NgZone } from '@angular/core';
import { RegisterService } from '../../register/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../../auth/authentication.service';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.scss'],
})
export class RegistrationSuccessComponent implements OnInit {
  idActor: number | string | null;
  loginForm: FormGroup;
  storedValue: any;
  language: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private registerService: RegisterService,
    private auth: AuthenticationService
  ) {}
  ngDoCheck() {
    this.language = localStorage.getItem('language');
  }

  ngOnInit(): void {
    this.storedValue = localStorage.getItem('renew');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      type: ['actor'],
    });

    this.idActor = localStorage.getItem('idActor') || localStorage.getItem('userId');
    setTimeout(() => {
      this.getMemmoryActorDetails(this.idActor);
    }, 3000); // 3 second delay
  }

  getMemmoryActorDetails(idAct: any) {
    this.registerService.getPartialArtist(idAct).subscribe((res) => {
      if (res['status'] == 200) {
        let userCr = res['data']['userDetails'];
        this.loginForm.patchValue({ email: userCr.email });
        this.loginForm.patchValue({ password: userCr.Pswd });
        this.setLogin();
      } else {
        if (this.language == 'he-IL') {
          this.toastr.error('', 'אירעה שגיאה. אנא התחבר באופן ידני');
        } else {
          this.toastr.error('', 'Error occurred. Please login manually');
        }
      }
    });
  }

  setLogin() {
    if (this.loginForm.valid) {
      this.auth.login(`${environment.apiUrl}login`, this.loginForm.value).subscribe(
        (res) => {
          if (res['status'] === 200) {
            localStorage.setItem('authToken', res['token']);
            localStorage.setItem('userId', res['user']['id']);
            localStorage.setItem('artistID', res['artistID']);
            localStorage.removeItem('idActor');
            if (this.storedValue) {
              localStorage.removeItem('saveBtn');
              setTimeout(() => {
                this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
              }, 1000);
            } else if (!this.storedValue) {
              localStorage.removeItem('saveBtn');
              setTimeout(() => {
                this.ngZone.run(() => this.router.navigateByUrl('/login'));
              }, 1000);
            }

            setTimeout(() => {
              localStorage.removeItem('renew');
              // localStorage.clear()
              // this.ngZone.run(() => this.router.navigateByUrl('/login'));
            }, 1000);
          } else {
            this.toastr.error('', 'Error occurred. Please login manually');
          }
        },
        (err) => {
          this.toastr.error('', 'Error occurred. Please login manually');
        }
      );
    } else {
      this.toastr.error('', 'Error occurred. Please login manually');
    }
    localStorage.clear();
    setTimeout(() => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    }, 1000);

    // if (this.loginForm.valid) {
    //   this.auth.login(`${environment.apiUrl}login`, this.loginForm.value).subscribe(
    //     (res) => {
    //       if (res['status'] === 200) {
    //         // localStorage.setItem('authToken', res['token']);
    //         // localStorage.setItem('userId', res['user']['id']);
    //         // localStorage.setItem('artistID', res['artistID']);
    //         // localStorage.removeItem('idActor');
    //         // this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
    //         localStorage.clear();
    //         setTimeout(() => {
    //           this.ngZone.run(() => this.router.navigateByUrl('/login'));
    //         }, 1000);
    //       } else {
    //         this.toastr.error('', 'Error occurred. Please login manually');
    //       }
    //     },
    //     (err) => {
    //       this.toastr.error('', 'Error occurred. Please login manually');
    //     }
    //   );
    // } else {
    //   this.toastr.error('', 'Error occurred. Please login manually');
    // }
  }
}
