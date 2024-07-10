import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterEvent } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { I18nService } from '@app/i18n';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component

const log = new Logger('App');

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  rootSlug: any;
  showFooter = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private translateService: TranslateService,
    private i18nService: I18nService,
    private bnIdle: BnNgIdleService
  ) {
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

  ngOnInit() {
    this.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
      console.log('Session Expired');
    });

    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this)
      )
      .subscribe((event) => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
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
  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
