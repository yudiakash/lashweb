import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranzillaService } from './tranzilla.service';
import './tranzilla-successfull-payment.component.scss';
import { WindowRef } from '@app/window-ref.service';
import { environment } from '@env/environment';
import { WorkshopsService } from '@app/workshops/workshops.service';

@Component({
  selector: 'app-tranzilla-successfull-payment',
  templateUrl: './tranzilla-successfull-payment.component.html',
  styleUrls: ['./tranzilla-successfull-payment.component.scss'],
})
export class TranzillaSuccessfullPaymentComponent implements OnInit {
  tranzillaForm!: FormGroup;
  tranzillaResponse: any;
  tranzilaIndex: any;
  tranzillaSum: any;
  idActor: number | string | null;
  idPlan: number | string | null;
  language: any = '';
  id: any;
  setlang: any;
  showFooter = false;
  iframes: any;
  tranzilaExpmonth: any;
  tranzilaExpyear: any;
  tranzilaTranzilaTK: any;
  iframeUrl: any;
  tranzilaContact: any;
  tranzilaPhone: any;
  idregistrationWorkshop: any = null;
  json_purchase_data: any = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private service: TranzillaService,
    private windowRef: WindowRef,
    private worshopservice: WorkshopsService
  ) {}

  ngOnInit(): void {
    this.iframeUrl = `${environment.iframeUrl}`;
    this.iframes = document.getElementById('myIframe');
    const payment = localStorage.setItem('paymentCompleted', JSON.stringify(true));
    this.service.setData(payment);

    this.idActor = localStorage.getItem('idActor') || localStorage.getItem('userId');
    this.idPlan = localStorage.getItem('planId');
    this.language = localStorage.getItem('language');
    this.idregistrationWorkshop = localStorage.getItem('idregistration');

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

    console.log('------paramsString------', paramsString);
    console.log('------searchParams------', searchParams);
    console.log('------idActor------', this.idActor);
    console.log('------userId------', localStorage.getItem('userId'));
    console.log('------idActor1------', localStorage.getItem('idActor'));

    this.tranzillaResponse = searchParams.get('Response');
    this.tranzillaSum = searchParams.get('sum');
    this.tranzilaIndex = searchParams.get('index');
    this.tranzilaExpmonth = searchParams.get('expmonth');
    this.tranzilaExpyear = searchParams.get('expyear');
    this.tranzilaTranzilaTK = searchParams.get('TranzilaTK') ? searchParams.get('TranzilaTK') : '';
    this.tranzilaContact = searchParams.get('contact');
    this.tranzilaPhone = searchParams.get('phone');
    this.json_purchase_data = searchParams.get('json_purchase_data');

    if (this.json_purchase_data === null || this.json_purchase_data === '' || this.json_purchase_data === '[]') {
      if (this.idregistrationWorkshop) {
        this.tranzillaForm = this.formBuilder.group({
          tranzilaResponse: [this.tranzillaResponse],
          registrationId: [this.idregistrationWorkshop],
          index: [this.tranzilaIndex],
          sum: [this.tranzillaSum],
          lang: [this.setlang],
          expmonth: [this.tranzilaExpmonth],
          expyear: [this.tranzilaExpyear],
          TranzilaTK: [this.tranzilaTranzilaTK],
          contact: [this.tranzilaContact],
          phone: [this.tranzilaPhone],
        });
        this.tranzilaWorkShopPayment();
      } else {
        this.tranzillaForm = this.formBuilder.group({
          tranzilaResponse: [this.tranzillaResponse],
          idUser: [this.idActor],
          index: [this.tranzilaIndex],
          sum: [this.tranzillaSum],
          subscription_id: [this.idPlan],
          lang: [this.setlang],
          expmonth: [this.tranzilaExpmonth],
          expyear: [this.tranzilaExpyear],
          TranzilaTK: [this.tranzilaTranzilaTK],
          contact: [this.tranzilaContact],
          phone: [this.tranzilaPhone],
        });
        this.tranzilaPayment();
      }
    }
  }

  tranzilaWorkShopPayment() {
    this.worshopservice.workshopPaymentConfirmation(this.tranzillaForm.value).subscribe((data: any) => {
      if (data['status'] == 200) {
        setTimeout(() => {
          this.windowRef.nativeWindow.parent.location.href = this.iframeUrl + '/workshop-registration3';
        }, 1000);
      }
    });
  }

  tranzilaPayment() {
    this.service.tranzilaPayment(this.tranzillaForm.value).subscribe((data: any) => {
      if (data['status'] == 200) {
        setTimeout(() => {
          this.windowRef.nativeWindow.parent.location.href = this.iframeUrl + '/tell-us-more';
        }, 1000);
      }
    });
  }
}
