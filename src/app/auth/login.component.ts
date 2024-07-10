import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActorDetailsService } from '@app/actor-details/actor-details.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  artistToken: any;
  actiorDetails: any = [];
  elementMembership: boolean = false;
  currentDate: any;
  expirationDate: any;
  membershipExpiryDate: any;
  messageCount: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private actorDetailsService: ActorDetailsService,
    private translate: TranslateService
  ) {
    this.checkToken();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      type: ['actor'],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.auth.login(`${environment.apiUrl}login`, this.loginForm.value).subscribe(
        (res) => {
          if (res['status'] === 200) {
            localStorage.setItem('authToken', res['token']);
            localStorage.setItem('userId', res['user']['id']);
            localStorage.setItem('artistID', res['artistID']);
            this.artistToken = res['artistID'];
            this.messageCount = res['messageCount'];

            let encoded: string = btoa(this.artistToken);
            this.actorDetailsService.getActorDetials(encoded).subscribe((data) => {
              this.actiorDetails = data['data'];
              this.membershipExpiryDate = this.actiorDetails['membershipExpiryDate'];
              this.currentDate = new Date();
              this.expirationDate = new Date(this.membershipExpiryDate);
              if (this.membershipExpiryDate || !this.membershipExpiryDate) {
                const expirationDate = new Date(this.membershipExpiryDate);
                if (this.currentDate > expirationDate || this.membershipExpiryDate == null) {
                  this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                } else {
                  if (this.messageCount > 0) {
                    this.ngZone.run(() => this.router.navigateByUrl('/my-messages'));
                  } else {
                    this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
                  }
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }
              }
            });
          } else {
            const errorMessage = this.translate.instant('username or password is incorrect!');
            this.toastr.error(errorMessage);
          }
        },
        (err) => {
          this.toastr.error('', err);
        }
      );
    } else {
      console.log('Form is not valid!');
    }
  }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  checkToken() {
    if (localStorage.getItem('idActor')) {
      localStorage.removeItem('idActor');
    }
    if (this.route.snapshot.queryParamMap.has('q')) {
      localStorage.clear();
    }

    if (localStorage.getItem('authToken')) {
      this.ngZone.run(() => this.router.navigateByUrl('/my-messages'));
    }
  }
}
