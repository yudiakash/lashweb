import { Component, OnInit, NgZone } from '@angular/core';
import { ActorDetailsService } from '../actor-details/actor-details.service';
import { CardService } from '../my-payments/card-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-subscription',
  templateUrl: './my-subscription.component.html',
  styleUrls: ['./my-subscription.component.scss'],
})
export class MySubscriptionComponent implements OnInit {
  userId: any;
  paymentPlan: any = [];
  getId: any;
  isDefaultCard: number;
  planTypeResponse: any = [];
  gettId: any;
  element: any;
  saveBtn: boolean = false;
  artistToken: any;
  actiorDetails: any = [];
  elementMembership: boolean = false;
  language: any;

  constructor(
    private actorDetailsService: ActorDetailsService,
    private toastr: ToastrService,
    private cardService: CardService,
    public auth: AuthenticationService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
  }
  ngOnInit(): void {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    this.getUser();
    this.getAllPaymentOptions();
    this.getLoggedInId();
    this.getDefaultCard();
  }

  getAllPaymentOptions() {
    this.actorDetailsService.getAllPaymentOptions().subscribe((data) => {
      this.planTypeResponse = data['data'];
      if (this.planTypeResponse[0].id) {
        this.gettId = this.planTypeResponse[0].id;
      }
      this.getSubscriptionDetails();
    });
  }

  getLoggedInId() {
    this.userId = localStorage.getItem('userId');
  }

  getSubscriptionDetails() {
    this.actorDetailsService.getCurrentPlanDetails(this.userId).subscribe((data) => {
      this.paymentPlan = data['data'];
      const membershipExpiryDate = this.paymentPlan['exp_date'];
      const currentDate = new Date();
      const expirationDate = new Date(membershipExpiryDate);
      if (currentDate > expirationDate) {
        // this.element =  document.getElementById("expiredNot")
        this.element = true;
      } else {
        this.element = false;
      }

      if (this.paymentPlan.current_plan) {
        this.getId = this.paymentPlan.current_plan;
      } else {
        this.getId = this.planTypeResponse[0].id;
      }
    });
  }

  getDefaultCard() {
    this.cardService.getDefaultCard(this.userId).subscribe((data) => {
      this.isDefaultCard = data['data'].data;
    });
  }

  reNewPayment() {
    if (this.isDefaultCard == 0) {
      if (this.language == 'he-IL') {
        this.toastr.error('', 'הוסף תחילה כרטיס אשראי ברירת מחדל בכרטיסיית פרטי תשלום');
      } else {
        this.toastr.error('', 'Please add a default credit card in payment info tab first');
      }
    } else {
      var myFormData = new FormData();
      myFormData.append('id_user', this.userId);
      myFormData.append('subscription_id', this.getId);

      this.actorDetailsService.reNewPlanDetails(myFormData).subscribe((data) => {
        if (data['status'] == 200) {
          this.getSubscriptionDetails();
          this.toastr.success('', data['message']);
        } else {
          this.toastr.error('', data['message']);
        }
      });
    }
  }

  select(idParam: any) {
    this.getId = idParam;
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
