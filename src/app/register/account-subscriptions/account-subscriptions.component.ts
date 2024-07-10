import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorDetailsService } from '../../actor-details/actor-details.service';

@Component({
  selector: 'app-account-subscriptions',
  templateUrl: './account-subscriptions.component.html',
  styleUrls: ['./account-subscriptions.component.scss'],
})
export class AccountSubscriptionsComponent implements OnInit {
  getId: any;
  active: Boolean;
  idActor: number | string | null;
  planTypeResponse: any = [];

  constructor(private router: Router, private actorDetailsService: ActorDetailsService) {}

  ngOnInit(): void {
    this.idActor = localStorage.getItem('idActor');
    this.getPaymentOptions();
  }

  getPaymentOptions() {
    this.actorDetailsService.getAllPaymentOptions().subscribe((data) => {
      this.planTypeResponse = data['data'];
      if (this.planTypeResponse[0].id) {
        // this.getId = this.planTypeResponse[0].id;
      }
    });
  }

  select(idParam: any) {
    this.getId = idParam;
  }

  selectPlan() {
    localStorage.setItem('planId', this.getId);
    this.router.navigate(['/account-payment']);
  }
}
