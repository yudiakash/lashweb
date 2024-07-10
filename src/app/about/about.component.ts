import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  closeResult: string;
  version: string | null = environment.version;
  language: any;
  en: boolean;
  he: boolean;
  enLanguage: any;
  heLanguage: any;

  constructor(private modalService: NgbModal, private translateService: TranslateService) {}

  ngOnInit() {}

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }

  ngDoCheck() {
    this.enLanguage = this.translateService.currentLang;
  }
}
