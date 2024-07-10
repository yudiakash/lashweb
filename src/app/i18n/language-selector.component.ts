import { Component, OnInit, Input, Inject, Renderer2 } from '@angular/core';

import { I18nService } from './i18n.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  showHebrew: boolean = false;
  showEng: boolean = false;
  @Input() inNavbar = false;
  @Input() menuClass = '';

  constructor(
    private i18nService: I18nService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (!this.i18nService.language) {
      this.getCountryValue();
    }
    if (this.i18nService.language == 'he-IL' || localStorage.getItem('language') == 'he-IL') {
      let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
      htmlTag.dir = 'rtl';
      this.renderer.addClass(this.document.body, 'rtl');
      this.i18nService.language = 'he-IL';
    } else {
      this.renderer.removeClass(this.document.body, 'rtl');
    }
  }

  setLanguage(language: string) {
    let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
    if (language == 'he-IL') {
      this.showEng = false;
      htmlTag.dir = 'rtl';
      this.renderer.addClass(this.document.body, 'rtl');
    } else {
      this.showHebrew = false;
      this.renderer.removeClass(this.document.body, 'rtl');
      htmlTag.dir = 'ltr';
    }

    if (this.i18nService.language == language) {
      this.showHebreww(language);
    }
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
  showHebreww(lang: any) {
    if (lang === 'en-US') {
      this.showHebrew = !this.showHebrew;
    } else if (lang === 'he-IL') {
      this.showEng = !this.showEng;
    }
  }

  async getCountryValue() {
    await this.i18nService.getIPGetCountry().subscribe((res: any) => {
      let ipdata = res['data'].country.country ?? '';

      const browserLanguage = ipdata;
      //if (browserLanguage === 'he') {
      if (browserLanguage === 'IL') {
        let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
        htmlTag.dir = 'rtl';
        this.renderer.addClass(this.document.body, 'rtl');
        this.i18nService.language = 'he-IL';
        localStorage.setItem('language', 'he-IL');
      } else {
        this.i18nService.language = 'en-US';
        localStorage.setItem('language', 'en-US');
        this.renderer.removeClass(this.document.body, 'rtl');
      }
    });
  }
}
