import { Component, OnInit } from '@angular/core';
import { CastingCallsService } from '../casting-calls/casting-calls.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '@app/search/search.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-casting-calls',
  templateUrl: './casting-calls.component.html',
  styleUrls: ['./casting-calls.component.scss'],
})
export class CastingCallsComponent implements OnInit {
  castingCalls: any = [];
  castingCallsCat: any = [];
  newSearchForm!: FormGroup;
  isShowDivIf = true;
  searchResultCnt: number = 0;
  categoryName: string = '';
  age: any = 14;
  rolesCount: number;
  dataType: any;

  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [3, 6, 9, 12];
  pageSize = 20;
  currentPage = 1;
  totalAudCount: number = 0;

  value: number = 14;
  lowValue: number = 14;
  highValue: number = 80;
  optionss: Options = {
    floor: 14,
    ceil: 100,
  };
  formValue: any;
  eventName: any;
  genderselect: boolean = false;
  language: any;
  isRTL: boolean = false;

  constructor(
    private castingCallsService: CastingCallsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.newSearchForm = this.formBuilder.group({
      Keyword: [''],
      catName: [''],
      gender: [''],
      minAge: [''],
      maxAge: [''],
      sliderControl: new FormControl([10, 800]),
    });

    this.route.queryParams.subscribe((params) => {
      this.categoryName = params['catName'];
    });
    if (this.categoryName) {
      this.newSearchForm.value.catName = this.categoryName;
      this.getCastingCalls(this.newSearchForm.value);
    }
    if (!this.categoryName) {
      this.getCastingCalls();
    }

    this.getCastingCallCategories();
    // this.translateTextEn()
  }

  // to list all casting calls
  getCastingCalls(params = null) {
    this.castingCallsService.getCastingCallsList(params, this.currentPage).subscribe((data) => {
      this.castingCalls = data['data'].audition_list ?? [];

      if (data['data'].totalCount > 0) {
        this.rolesCount = this.castingCalls[0]['rolesCount'];
        this.totalAudCount = data['data'].totalCount;
      } else {
        this.rolesCount = 0;
        this.totalAudCount = 0;
      }
    });
  }

  // to casting call categories
  getCastingCallCategories() {
    this.castingCallsService.getCastingCallCategories().subscribe((data) => {
      this.castingCallsCat = data['data'];
    });
  }

  searchFilter() {
    this.page = 1;
    this.newSearchForm.value.minAge = this.age;
    this.newSearchForm.value.maxAge = this.highValue;
    this.newSearchForm.value.catName = this.categoryName || '';
    this.currentPage = 1;
    this.getCastingCalls(this.newSearchForm.value);
  }

  options: Options = {
    floor: 1,
    ceil: 200,
    step: 1,
  };

  options1Heb: Options = {
    floor: 0,
    ceil: 220,
    rightToLeft: true,
  };

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.currentPage = event;
    this.getCastingCalls();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.currentPage = 0;
    this.getCastingCalls();
  }
  typeChange(data: any) {
    this.dataType = data;
    this.newSearchForm.value.catName = this.dataType;
    this.getCastingCalls(this.newSearchForm.value);
  }
  formChange(event: any) {
    this.eventName = event.target.name;
    this.formValue = event.target.value;
    switch (this.eventName) {
      case 'gender':
        this.genderselect = !!this.formValue;
        break;
      default:
        break;
    }
  }

  async translateTextEn() {
    console.log('this.castingCalls', this.castingCalls);

    await Promise.all(
      this.castingCalls.map(async (data: any) => {
        const names = `${data.auditionTypeName}`.toLowerCase();
        const translatedText = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          names
        );
        data['transAuditnEn'] = translatedText;

        const title = `${data.inviteMsgTitle}`.toLowerCase();
        const translatedText1 = await this.searchService.translateText(
          environment.hebrewLanguage,
          environment.englishLanguage,
          title
        );
        data['transTitleEn'] = translatedText1;
      })
    );
  }
}
