import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  showFooter = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        const cleanUrl = this.removeQueryString(url);
        const segment = this.extractSegmentFromUrl(cleanUrl);
        if (segment == 'tranzilla-successfull-payment' || segment == 'tranzilla-failed-payment') {
          this.showFooter = false;
        }
      }
    });
  }
  extractSegmentFromUrl(url: string): string {
    const segment = url.split('/').find((segment) => segment !== '');
    return segment ? decodeURIComponent(segment) : '';
  }
  removeQueryString(url: string): string {
    const index = url.indexOf('?');
    return index !== -1 ? url.substring(0, index) : url;
  }
  ngOnInit() {}
}
