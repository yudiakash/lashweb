// google-sheets.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
    private readonly SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1Pifk6IPLArFz3TJ8oxHL9ZKKQEgG7JT6tzFuwVCW8aM/edit?gid=1354118054'; // Replace with your spreadsheet URL
  
    constructor(private http: HttpClient) { }
  
    getData(): Observable<any[]> {
      return this.http.get(this.SPREADSHEET_URL, { responseType: 'text' }).pipe(
        map((response: any) => {
          const data = this.extractData(response);
          return data;
        })
      );
    }
  

    private extractData(res: any): any[] {
        const parser = new DOMParser();
        const doc = parser.parseFromString(res, 'text/html');
        const tableRows = doc.querySelectorAll('table tr');
        const data = [];
        for (let i = 1; i < tableRows.length; i++) { // Start from index 1 to skip header row
            const cells = tableRows[i].querySelectorAll('td');
            let hasError = false;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent?.includes("not sourced from all markets and may be delayed by up to 20 minutes")) {
                    hasError = true;
                    break;
                }
                if (cells[j].textContent?.includes("div")) {
                    hasError = true;
                    break;
                }
            }
            if (!hasError) {
                const rowData = [];
                for (let j = 0; j < cells.length; j++) {
                    rowData.push(cells[j]);
                }
                data.push(rowData);
                console.log("rowData", rowData);
            }
        }
    
        // Extracting the <a> element with the class "waffle-disclaimer-link" from a specific row
        const specificRow = 2; // Specify the specific row number to extract the <a> element
        if (tableRows.length > specificRow) {
            const specificRowCells = tableRows[specificRow].querySelectorAll('td');
            const disclaimerLink = specificRowCells[0].querySelector('a.waffle-disclaimer-link');
            if (disclaimerLink) {
                console.log("Disclaimer Link:", disclaimerLink);
            }
        }
    
        return data;
    }
  }