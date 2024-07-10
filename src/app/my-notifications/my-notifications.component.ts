import { Component, NgZone, OnInit } from '@angular/core';
import { MyNotifiactionsService } from './my-notifications.service';
import { ToastrService } from 'ngx-toastr';
import { MyaccountService } from '@app/myaccount/myaccount.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { ActorDetailsService } from '@app/actor-details/actor-details.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.scss'],
})
export class MyNotificationsComponent implements OnInit {
  accountDetailsList: any = [];
  userId: any;
  NotificationForm!: FormGroup;
  saveBtn: boolean = false;
  artistToken: any;
  actiorDetails: any = [];
  elementMembership: boolean = false;
  language: any;

  constructor(
    private myNotifiactionsService: MyNotifiactionsService,
    private toastr: ToastrService,
    private myaccountService: MyaccountService,
    private formBuilder: FormBuilder,
    public auth: AuthenticationService,
    private router: Router,
    private actorDetailsService: ActorDetailsService,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {
    this.getUserId();
  }
  ngDoCheck() {
    this.language = localStorage.getItem('language');
  }

  ngOnInit(): void {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    this.NotificationForm = this.formBuilder.group({
      summons_for_audition: [null, Validators.required],
      message_from_desk: [null, Validators.required],
      copies_of_applies: [null, Validators.required],
      workshops_events: [null, Validators.required],
      newsletter_articles: [null, Validators.required],
      user_id: [null, Validators.required],
    });

    this.myaccountService.getMyAccountDetailsById().subscribe((data) => {
      let response = data;
      if (response['data'][0]) {
        this.accountDetailsList = response['data'][0];
        this.showFormData();
      }
    });

    this.getUser();
  }

  onSubmit() {
    this.updateMyNotification();
  }

  updateMyNotification() {
    this.NotificationForm.patchValue({ user_id: this.userId });
    this.myNotifiactionsService.updateNotifications(this.NotificationForm.value).subscribe((res) => {
      if (res['status'] == 400) {
        this.showTosterMessage(res['message']);
      } else {
        const successMessage = this.translate.instant('Details has been saved successfully.');
        this.toastr.success(successMessage);
      }
    });
  }

  showTosterMessage(response: any) {
    if (typeof response['summons_for_audition'] !== 'undefined') {
      this.toastr.error('', response['summons_for_audition'][0]);
    }

    if (typeof response['message_from_desk'] !== 'undefined') {
      this.toastr.error('', response['message_from_desk'][0]);
    }

    if (typeof response['copies_of_applies'] !== 'undefined') {
      this.toastr.error('', response['copies_of_applies'][0]);
    }

    if (typeof response['workshops_events'] !== 'undefined') {
      this.toastr.error('', response['workshops_events'][0]);
    }

    if (typeof response['newsletter_articles'] !== 'undefined') {
      this.toastr.error('', response['newsletter_articles'][0]);
    }
  }

  showFormData() {
    this.NotificationForm.patchValue({
      summons_for_audition: this.accountDetailsList.summons_for_audition,
      message_from_desk: this.accountDetailsList.message_from_desk,
      copies_of_applies: this.accountDetailsList.copies_of_applies,
      workshops_events: this.accountDetailsList.workshops_events,
      newsletter_articles: this.accountDetailsList.newsletter_articles,
    });
  }

  getUserId() {
    const userID = localStorage.getItem('userId');
    this.userId = userID;
  }
  getUser() {
    const artistID = localStorage.getItem('artistID');
    this.artistToken = artistID;
    let encoded: string = btoa(this.artistToken);
    this.actorDetailsService.getActorDetials(encoded).subscribe((data) => {
      this.actiorDetails = data['data'];
      const membershipExpiryDate = this.actiorDetails['membershipExpiryDate'];
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
    });
  }
  renew() {
    this.saveBtn = true;
    localStorage.setItem('saveBtn', JSON.stringify(true));
    this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
  }
}
