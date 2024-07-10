import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActorDetailsService } from '@app/actor-details/actor-details.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-registration-renewal',
  templateUrl: './registration-renewal.component.html',
  styleUrls: ['./registration-renewal.component.scss'],
})
export class RegistrationRenewalComponent implements OnInit {
  @ViewChild('notMsg') notMsg: ElementRef;
  @Input() artistPictures: any;
  @Input() form: any;
  @Input() setButton: any;
  @Input() routeParent: any;
  saveBtn: boolean = false;
  artistToken: any;
  actiorDetails: any = [];
  elementMembership: boolean = false;
  emailRegister: any;
  planTypeResponse: any = [];
  innerMsg: any;

  constructor(
    private actorDetailsService: ActorDetailsService,
    private ngZone: NgZone,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedValue = localStorage.getItem('saveBtn');
    this.emailRegister = localStorage.getItem('emailRegister');
    JSON.parse(this.emailRegister);
    if (this.emailRegister || storedValue) {
      this.saveBtn = true;
    } else {
      this.saveBtn = false;
    }
    this.getUser();
  }

  getUser() {
    const artistID = localStorage.getItem('artistID');
    this.artistToken = artistID;
    let encoded: string = btoa(this.artistToken);
    this.actorDetailsService.getActorDetials(encoded).subscribe((data) => {
      this.actiorDetails = data['data'];
      const membershipExpiryDate = this.actiorDetails['membershipExpiryDate'];
      const currentDate = new Date();

      // if (!localStorage.getItem('unshowingRenewal'))
      if (membershipExpiryDate || !membershipExpiryDate) {
        const expirationDate = new Date(membershipExpiryDate);
        const startDate = new Date(this.actiorDetails['membershipStartDate']);

        if (currentDate > expirationDate || membershipExpiryDate == null || expirationDate === startDate) {
          this.elementMembership = true;
        } else {
          this.elementMembership = false;
        }
      }
    });
  }

  renew() {
    const formValues = this.form;
    if (this.routeParent == 'Actor Account') {
      const requiredFields = {
        Height: 'Height',
        bodyTypeValue: 'Body Type',
        hairColorValue: 'Hair Color',
        hairTypeValue: 'Hair Type',
        eyeValue: 'Eye',
        skinToneValue: 'Skin Tone',
        Value: 'Value',
        singerValue: 'Singer',
        gender_tone_Value: 'Gender Tone',
        license_Value: 'License',
        roles_Value: 'Roles',
        membershipValue: 'Membership',
        residenceValue: 'Residence',
        motherTongue: 'MotherTongue',
        AgencyId: 'Agency Id',
      };

      let emptyFields = [];
      for (let field in requiredFields) {
        if (!formValues[field]) {
          emptyFields.push(requiredFields[field]);
        }
      }

      if (emptyFields.length === 0 && this.artistPictures.length > 0) {
        if (formValues.AgencyId == 0 && formValues.Name == '') {
          this.innerMsg = this.translate.instant('Please Add Agency Name');
        } else {
          // Save the form and proceed
          this.saveBtn = true;
          localStorage.setItem('saveBtn', JSON.stringify(true));
          localStorage.setItem('renew', JSON.stringify(true));

          if (this.saveBtn) {
            localStorage.removeItem('emailRegister');
            this.actorDetailsService.getAllPaymentOptions().subscribe((data) => {
              this.planTypeResponse = data['data'];
              let plnIds = '';

              if (this.planTypeResponse[0].id) {
                plnIds = this.planTypeResponse[0].id;
              }
              localStorage.setItem('planId', plnIds);
              localStorage.setItem('tellusmore', '1');
              this.router.navigate(['/account-subscriptions']);
            });
          }
        }
      } else {
        let errorMessage = '';
        if (this.artistPictures.length === 0 && emptyFields.length != 0) {
          errorMessage =
            this.translate.instant('Please Add at least one headshot picture') +
            this.translate.instant(' And Please fill the form fields: ') +
            this.translate.instant(emptyFields.join(', '));
        } else if (emptyFields.length === 0 && this.artistPictures.length === 0) {
          errorMessage = this.translate.instant('Please Add at least one headshot picture');
        } else {
          if (this.artistPictures.length != 0) {
            errorMessage =
              this.translate.instant('Please fill the form fields: ') + this.translate.instant(emptyFields.join(', '));
          }
        }

        this.innerMsg = errorMessage;
        setTimeout(() => {
          this.innerMsg = '';
        }, 3000);
      }
    } else {
      const errorMessage = this.translate.instant(
        'Redirecting to actor page...Kindly take the required action to proceed.'
      );
      this.innerMsg = errorMessage;
      console.log();

      setTimeout(() => {
        this.router.navigateByUrl('/actor-account');
      }, 2000);
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('emailRegister');
    localStorage.removeItem('saveBtn');
  }
}
