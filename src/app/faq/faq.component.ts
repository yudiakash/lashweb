import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '@ng-select/ng-select/lib/console.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  language: any;
  en: boolean;
  he: boolean;
  enLanguage: any;
  heLanguage: any;
  constructor() {}
  ngOnInit(): void {}
  ngDoCheck() {
    this.language = localStorage.getItem('language');
    if (this.language === 'en-US') {
      this.enLanguage = this.language === 'en-US';
      this.en = true;
    } else if (this.language === 'he-IL') {
      this.heLanguage = this.language === 'he-IL';
      this.he = true;
    } else {
      this.language = 'en-US';
      this.en = true;
      localStorage.setItem('language', this.language);
    }
  }
}
