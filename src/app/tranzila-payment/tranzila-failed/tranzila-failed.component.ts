import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranzillaService } from '@app/tranzilla-successfull-payment/tranzilla.service';
import { WindowRef } from '@app/window-ref.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-tranzila-failed',
  templateUrl: './tranzila-failed.component.html',
  styleUrls: ['./tranzila-failed.component.scss'],
})
export class TranzilaFailedComponent implements OnInit {
  tranzillaForm!: FormGroup;
  tranzillaResponse: any;
  tranzilaIndex: any;
  tranzillaSum: any;
  idActor: number | string | null;
  idPlan: number | string | null;
  language: any = '';
  id: any;
  setlang: any;
  iframes: any;
  tranzilaExpmonth: any;
  tranzilaExpyear: any;
  tranzilaTranzilaTK: any;
  failedMsg: any;
  iframeUrl: any;
  tranzilaContact: any;
  tranzilaPhone: any;
  registrationId: any;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private service: TranzillaService,
    private windowRef: WindowRef
  ) {}

  ngOnInit(): void {
    this.iframeUrl = `${environment.iframeUrl}`;
    this.iframes = document.getElementById('myIframe');
    this.idActor = localStorage.getItem('idActor') || localStorage.getItem('userId');
    this.idPlan = localStorage.getItem('planId');
    this.language = localStorage.getItem('language');
    this.registrationId = localStorage.getItem('idregistration');
    if (this.language == 'he-IL') {
      this.setlang = 'he';
    } else {
      this.setlang = 'en';
    }
    this.id = this.route.snapshot.params;
    console.log(this.id);
    const response = this.id;
    const paramsString = response.params.substring(1);
    const searchParams = new URLSearchParams(paramsString);
    this.tranzillaResponse = searchParams.get('Response');
    this.tranzillaSum = searchParams.get('sum');
    this.tranzilaIndex = searchParams.get('index');
    this.tranzilaExpmonth = searchParams.get('expmonth');
    this.tranzilaExpyear = searchParams.get('expyear');
    this.tranzilaTranzilaTK = searchParams.get('TranzilaTK') ? searchParams.get('TranzilaTK') : '';
    this.tranzilaContact = searchParams.get('contact');
    this.tranzilaPhone = searchParams.get('phone');

    this.tranzillaForm = this.formBuilder.group({
      tranzilaResponse: [this.tranzillaResponse],
      // idUser: [this.idActor],
      index: [this.tranzilaIndex],
      sum: [this.tranzillaSum],
      subscription_id: [this.idPlan],
      lang: [this.setlang],
      expmonth: [this.tranzilaExpmonth],
      expyear: [this.tranzilaExpyear],
      TranzilaTK: [this.tranzilaTranzilaTK],
      // contact: [this.tranzilaContact],
      phone: [this.tranzilaPhone],
      registrationId: [this.registrationId],
    });
    console.log('form', this.tranzillaForm.value);
    this.tranzilaPayment();
  }
  tranzilaPayment() {
    this.service.tranzilaPayment(this.tranzillaForm.value).subscribe((data: any) => {
      if (data['status'] == 400) {
        this.failedMsg = data['message'];
        setTimeout(() => {
          this.windowRef.nativeWindow.parent.location.href = this.iframeUrl + '/workshop-registration2';
        }, 1500);
      }
    });
  }
}
