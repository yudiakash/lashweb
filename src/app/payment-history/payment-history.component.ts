import { Component, OnInit, NgZone } from '@angular/core';
import { CardService } from '../my-payments/card-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent implements OnInit {
  userId: any;
  historyList: any = [];
  dataCheck = true;

  constructor(private cardService: CardService, public auth: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    this.getLoggedInId();
    this.getPaymentHistory();
  }

  getLoggedInId() {
    this.userId = localStorage.getItem('userId');
  }

  getPaymentHistory() {
    this.cardService.getPaymentHistory(this.userId).subscribe((res) => {
      this.historyList = [];
      this.dataCheck = false;
      console.log(res['data']);
      if (res['status'] == 200 && res['data'].length > 0) {
        this.historyList = res['data'];
        this.dataCheck = true;
      }
    });
  }
}
