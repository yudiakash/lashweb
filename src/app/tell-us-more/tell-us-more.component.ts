import { Component, OnInit, ViewChild, TemplateRef, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TellUsMoreService } from './tell-us-more.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-tell-us-more',
  templateUrl: './tell-us-more.component.html',
  styleUrls: ['./tell-us-more.component.scss'],
})
export class TellUsMoreComponent implements OnInit {
  @ViewChild('content') modalContent: TemplateRef<any>;
  TellUsMoreData: any = [];
  DramaisReadonly = true;
  SingingisReadonly = true;
  ComicisReadonly = true;
  HeadlineisReadonly = true;
  actorArtistId: any = [];
  TellUsForm!: FormGroup;
  userId: any;
  artistToken: any;
  actiorDetails: any = [];
  elementMembership: boolean = false;
  saveBtn: boolean = false;
  regTellUsMore: any = null;
  actorGender: any = null;
  actorName: any = null;
  language: any;
  emoji1: SafeHtml;
  emoji2: SafeHtml;
  isRTL: boolean = false;
  comicShe =
    'כתבי על עצמך (בגוף שלישי - היא) שני פרויקטים קומיים שלקחת בהם חלק בגאווה (אפשר גם מבהס למשחק) וטבלי את זה עם תכונת אופי אחת או שתיים.';
  comicHe =
    'פה נעביר עליך המלצה קומית. עזור לנו : כתוב על עצמך (בגוף שלישי - היא) שני פרויקטים קומיים שלקחת בהם חלק בגאווה (אפשר גם מבה״ס למשחק) וטבל את זה עם תכונת אופי אחת או שתיים.';
  dramaShe =
    'פה נעביר עליך המלצה דרמטית. עזרי לנו : כתבי על עצמך (בגוף שלישי - היא) שני פרויקטים קומיים שלקחת בהם חלק בגאווה (אפשר גם מבהס למשחק) וטבלי את זה עם תכונת אופי אחת או שתיים.';
  dramaHe =
    'פה נעביר עליך המלצה דרמטית. עזור לנו : כתוב על עצמך (בגוף שלישי - היא) שני פרויקטים קומיים שלקחת בהם חלק בגאווה (אפשר גם מבה״ס למשחק) וטבל את זה עם תכונת אופי אחת או שתיים.';
  musicalShe =
    'פה נעביר עליך המלצה ביכולות המוזיקלית שלך. עזרי לנו : כתבי על עצמך (בגוף שלישי - היא)  שני פרויקטים קומיים שלקחת בהם חלק בגאווה (אפשר גם מבהס למשחק)  וטבלי את זה עם תכונת אופי אחת או שתיים.';
  musicalHe =
    'פה נעביר עליך המלצה ביכולות המוזיקלית שלך. עזור לנו : כתוב על עצמך (בגוף שלישי - היא) שני פרויקטים קומיים שלקחת בהם חלק בגאווה (אפשר גם מבה״ס למשחק) וטבל את זה עם תכונת אופי אחת או שתיים.';
  headlineShe = 'פה כתבי משפט שנותן לך השראה / האני מאמין שלך המשפט יופיע בפרופיל, מעל הכל.';
  headlineHe = 'פה כתוב בבקשה משפט שנותן לך השראה / האני מאמין שלך המשפט יופיע בפרופיל, מעל הכל.';
  constructor(
    private tellUsMoreService: TellUsMoreService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public auth: AuthenticationService,
    private router: Router,
    private ngZone: NgZone,
    public modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {
    this.getActorDetails();
    this.emoji1 = this.sanitizer.bypassSecurityTrustHtml('&#x1F60C;');
    this.emoji2 = this.sanitizer.bypassSecurityTrustHtml('&#x1F642;');
  }

  ngOnInit(): void {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    this.regTellUsMore = localStorage.getItem('tellusmore');
    this.TellUsForm = this.formBuilder.group({
      Drama: [''],
      Musical: [''],
      Comic: [''],
      headline: [''],
      user_id: [this.userId],
      ArtistId: [this.artistToken, Validators.required],
    });
    this.tellUsMoreService.getTellUsMoreById().subscribe((data) => {
      this.TellUsMoreData = data['data'][0];
      this.showFormData();
    });
  }

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  getActorDetails() {
    const userID = localStorage.getItem('userId');
    const artistID = localStorage.getItem('artistID');
    this.userId = userID;
    this.artistToken = artistID;
    if (userID) {
      let encoded: string = btoa(this.artistToken);
      this.tellUsMoreService.getActorDetials(encoded).subscribe((data) => {
        this.actorArtistId = this.artistToken;
        this.actiorDetails = data['data'];
        const membershipExpiryDate = this.actiorDetails['membershipExpiryDate'];
        const currentDate = new Date();
        if (membershipExpiryDate) {
          const expirationDate = new Date(membershipExpiryDate);
          if (currentDate > expirationDate) {
            this.elementMembership = true;
          } else {
            this.elementMembership = false;
          }
          this.actorGender = data['data']['Gender'];
          this.actorName = data['data']['FirstName'];

          // if (this.regTellUsMore) {
          //   this.openMessageModal();
          // }
        }
      });
    }
  }

  onSubmit() {
    if (this.TellUsForm.invalid) {
      this.toastr.error('Please add only characters');
    }
    this.updateTellUsMoreForm();
  }

  updateTellUsMoreForm() {
    this.TellUsForm.patchValue({ ArtistId: this.actorArtistId });
    Object.keys(this.TellUsForm.controls).forEach((key) => {
      const control: any = this.TellUsForm.get(key);
      if (typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
    this.tellUsMoreService.updateTellUsMore(this.TellUsForm.value).subscribe((res) => {
      if (res['status'] == 400) {
        this.showTosterMessage(res['message']);
      } else {
        if (this.language == 'he-IL') {
          this.toastr.success('', 'הפרטים נשמרו בהצלחה.');
        } else {
          this.toastr.success('', 'Details has been saved successfully.');
        }
      }
    });
  }

  editDramaText() {
    if (this.DramaisReadonly == true) {
      this.DramaisReadonly = !this.DramaisReadonly;
    }
  }

  editSingingText() {
    if (this.SingingisReadonly == true) {
      this.SingingisReadonly = !this.SingingisReadonly;
    }
  }

  editComicText() {
    if (this.ComicisReadonly == true) {
      this.ComicisReadonly = !this.ComicisReadonly;
    }
  }

  editHeadlineText() {
    if (this.HeadlineisReadonly == true) {
      this.HeadlineisReadonly = !this.HeadlineisReadonly;
    }
  }

  showTosterMessage(response: any) {
    if (typeof response['Drama'] !== 'undefined') {
      this.toastr.error('', response['Drama'][0]);
    }

    if (typeof response['Musical'] !== 'undefined') {
      this.toastr.error('', response['Musical'][0]);
    }

    if (typeof response['Comic'] !== 'undefined') {
      this.toastr.error('', response['Comic'][0]);
    }

    if (typeof response['headline'] !== 'undefined') {
      this.toastr.error('', response['headline'][0]);
    }
  }

  showFormData() {
    this.TellUsForm.patchValue({
      Drama: this.TellUsMoreData?.Drama,
      Musical: this.TellUsMoreData?.Musical,
      Comic: this.TellUsMoreData?.Comic,
      headline: this.TellUsMoreData?.headline,
    });
  }
  renew() {
    this.saveBtn = true;
    localStorage.setItem('saveBtn', JSON.stringify(true));
    this.ngZone.run(() => this.router.navigateByUrl('/actor-account'));
  }

  openMessageModal() {
    this.modalService.open(this.modalContent, { centered: true });
    setTimeout(() => {
      localStorage.removeItem('tellusmore');
      this.regTellUsMore = '';
    }, 2500);
  }
}
