import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { GoogleSheetsService } from './google-sheets.service';


@Component({
  selector: 'app-casted-successfully',
  templateUrl: './casted-successfully.component.html',
  styleUrls: ['./casted-successfully.component.scss'],
})
export class CastedSuccessfullyComponent implements OnInit {
  closeResult: string;
  version: string | null = environment.version;
  castingList: any = [];
  sheetData: any[];

    constructor(private sheetsService: GoogleSheetsService) { } 
  
  ngOnInit() {
    
    this.sheetsService.getData().subscribe(
      
      data => {
        this.sheetData = data;
      },
      error => {
        console.error('Error fetching data from Google Sheets:', error);
      }
      
    );
  }
  
  // open(content: any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
  //     (result) => {},
  //     (reason) => {}
  //   );
  // }
}
