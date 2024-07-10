import { Component, Inject, OnInit } from '@angular/core';
import { SearchService } from '../search/search.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Options } from '@angular-slider/ngx-slider';
import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { AuthenticationService } from '../auth/authentication.service';

// import { google } from 'google';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  bodyTypeList: any = [];
  hairColorList: any = [];
  hairTypeList: any = [];
  eyeTypeList: any = [];
  skinToneList: any = [];
  agencyParms: any = [];
  searchData: any = [];
  newSearchForm!: FormGroup;
  isShowDivIf = true;
  searchResultCnt: number = 0;
  newProp5: any[];
  newProp5Data: any = [];
  propsData: any = [];
  selectedProps: any = [];
  height: any = 0;
  age: any = 0;
  expandingToggle: boolean = false;
  expanddToggle: boolean = false;
  additionalLang: any = [];
  formValue: any;
  eventName: any;
  genderselect: boolean = false;
  bodySelect: boolean = false;
  hairSelect: boolean = false;
  hairTypeSelect: boolean = false;
  eyesSelect: boolean = false;
  skintoneSelect: boolean = false;
  agencySelect: boolean = false;
  membershipSelect: boolean = false;
  licenseSelect: boolean = false;
  studiesSelect: boolean = false;
  passportSelect: boolean = false;
  russianSelect: boolean = false;
  englishSelect: boolean = false;
  arabicSelect: boolean = false;
  residenceSelect: boolean = false;
  heightValue: boolean = false;
  imageReSizeUrl: any | null;
  imgNewsUrl: any | null;
  imgOldUrl: any | null;
  orgMembershipId: any;
  orgOptions: any;
  driveLicensId: any;
  driveLicenseOptions: any = [];
  edulevel: any;
  educationId: number;
  educationLevel: any;
  passport: any;
  passportId: number;
  passportData: any;
  engLan: any;
  engId: number;
  engLanData: any = [];
  russianLan: any;
  russianId: number;
  russianLanData: any = [];
  arabicLan: any;
  arabicId: number;
  arabicLanData: any = [];
  residence: any;
  residenceId: number;
  residenceData: any = [];

  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  tableSizes: any = [3, 6, 9, 12];
  Age: any;
  imagebaseUrl: any | null;
  language: any;
  isRTL: boolean = false;
  translatedtext: any = [];

  pageSize = 10;
  currentPage = 1;

  value: number = 0;
  lowValue: number = 0;
  highValue: number = 100;
  optionss: Options = {
    floor: 0,
    ceil: 100,
    rightToLeft: false,
  };

  optionssHeb: Options = {
    floor: 0,
    ceil: 100,
    rightToLeft: true,
  };

  values: number = 1;
  lowValues: number = 1;
  highValues: number = 220;
  options1: Options = {
    floor: 0,
    ceil: 220,
    rightToLeft: false,
  };

  options1Heb: Options = {
    floor: 0,
    ceil: 220,
    rightToLeft: true,
  };
  authSearchCheck: boolean = true;
  authUseCheck: boolean = true;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    public auth: AuthenticationService
  ) {}

  ngDoCheck() {
    this.language = localStorage.getItem('language');
    this.isRTL = this.language === 'he-IL';
  }

  ngOnInit(): void {
    this.imageReSizeUrl = `${environment.imgBaseUrl}`;
    // this.imgNewsUrl = `${environment.imgUrl}`;
    this.imgNewsUrl = `${environment.defaultImgUrl}`;

    this.imagebaseUrl = `${environment.imageUrl}`;
    this.imgOldUrl = `${environment.oldUrl}`;
    this.newSearchForm = this.formBuilder.group({
      s_name: [''],
      keyword: [''],
      gender: [''],
      minAge: [''],
      maxAge: [''],
      minHeight: [''],
      maxHeight: [''],
      body: [''],
      hair_color: [''],
      hair_type: [''],
      eyes: [''],
      skin_tone: [''],
      agencyIds: [''],
      propIds: [''],
      orgMembership: [''],
      licenseKey: [''],
      actingStudies: [''],
      passportKey: [''],
      englishLng: [''],
      russianLng: [''],
      arabicLng: [''],
      residenceKey: [''],
      actingStudiesParent: [],
      licenseKeyParent: [],
      orgMembershipParent: [],
      passportKeyParent: [],
      russianLngParent: [],
      englishLngParent: [],
      arabicLngParent: [],
      residenceKeyparent: [],
      has_pic: [true],
      sliderControl: new FormControl([10, 800]),
    });

    this.actorBodyType();
    this.actorHairColor();
    this.actorHairType();
    this.actorEyesType();
    this.actorSkinTone();
    this.actorAgencyParms();
    // this.getSearchItemList();
    this.getAllPropsData();

    this.language = localStorage.getItem('language');
    if (this.language === 'he-IL') {
      this.options1.rightToLeft = true;
      this.optionss.rightToLeft = true;
    } else {
      this.options1.rightToLeft = false;
      this.optionss.rightToLeft = false;
    }

    const storedSearchState = sessionStorage.getItem('searchState');
    if (storedSearchState) {
      const searchState = JSON.parse(storedSearchState);
      this.newSearchForm.patchValue(searchState);
      this.age = searchState.minAge;
      this.highValue = searchState.maxAge;
      this.height = searchState.minHeight;
      this.highValues = searchState.maxHeight;
      this.getSearchItemList(searchState);
    } else {
      this.age = 0;
      this.highValue = 100;
      this.height = 0;
      this.highValues = 220;
      this.getSearchItemList();
    }
    if (!this.auth.isAuthenticated) {
      this.authUseCheck = false;
    }
    this.getSiteSettings();
  }

  // for actor body Type
  actorBodyType() {
    this.searchService.getActorsBodyparams(1).subscribe((data) => {
      this.bodyTypeList = data['data'];
    });
  }

  // for actor hair color
  actorHairColor() {
    this.searchService.getActorsBodyparams(2).subscribe((data) => {
      this.hairColorList = data['data'];
    });
  }

  // for actor hair type
  actorHairType() {
    this.searchService.getActorsBodyparams(4).subscribe((data) => {
      this.hairTypeList = data['data'];
    });
  }

  // for actor eye type
  actorEyesType() {
    this.searchService.getActorsBodyparams(3).subscribe((data) => {
      this.eyeTypeList = data['data'];
    });
  }

  // for actor skin tone
  actorSkinTone() {
    this.searchService.getActorsBodyparams(5).subscribe((data) => {
      this.skinToneList = data['data'];
    });
  }

  // for actor agency parms
  actorAgencyParms() {
    this.searchService.getActorAgencyParms().subscribe((data) => {
      this.agencyParms = data['data'];
    });
  }

  // for search data
  getSearchItemList(params = null) {
    this.searchService.getSearchItemList(params, this.currentPage).subscribe((data) => {
      this.searchData = data['data'].actorlist ?? [];
      this.searchResultCnt = data['data'].totalCount;
      this.translateText();
      this.translateTextHe();
    });
  }

  searchFilter() {
    this.newSearchForm.patchValue({ actingStudiesParent: this.educationId });
    this.newSearchForm.patchValue({ licenseKeyParent: this.driveLicensId });
    this.newSearchForm.patchValue({ orgMembershipParent: this.orgMembershipId });
    this.newSearchForm.patchValue({ passportKeyParent: this.passportId });
    this.newSearchForm.patchValue({ russianLngParent: this.russianId });
    this.newSearchForm.patchValue({ englishLngParent: this.engId });
    this.newSearchForm.patchValue({ arabicLngParent: this.arabicId });
    this.newSearchForm.patchValue({ residenceKeyparent: this.residenceId });
    this.newSearchForm.patchValue({ minAge: this.age });
    this.newSearchForm.patchValue({ maxAge: this.highValue });
    this.newSearchForm.patchValue({ minHeight: this.height });
    this.newSearchForm.patchValue({ maxHeight: this.highValues });

    // this.newSearchForm.value.maxAge = this.highValue;
    this.page = 1;
    this.getCheckedPropValues();
    this.getSelectedProp5values();
    this.newSearchForm.patchValue({ propIds: this.selectedProps });
    this.currentPage = 1;
    this.getSearchItemList(this.newSearchForm.value);
    sessionStorage.setItem('searchState', JSON.stringify(this.newSearchForm.value));
  }

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.currentPage = event;

    this.getSearchItemList(this.newSearchForm.value);
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.currentPage = 0;
    this.getSearchItemList();
  }

  options: Options = {
    floor: 1,
    ceil: 200,
    step: 1,
  };

  async getAllPropsData() {
    let response: any;
    this.propsData = [];
    response = await this.searchService.getAllPropsData().toPromise();
    if (response && (response.status == 'success' || response.status == '200') && response.data) {
      // console.log('response.data.....', response.data);

      // org membership
      const org_membership = response.data.filter((data: any) => {
        if (data.Id == `${environment.org_membershipId}`) {
          return data;
        }
      });
      this.orgMembershipId = org_membership[0]?.id;
      this.orgOptions = org_membership?.filter((data: any) => {
        return data.options;
      });
      this.orgOptions = this.orgOptions[0]?.options.filter((item: any) => {
        return item.value;
      });
      //
      // drive licenses
      const driveLicens = response.data.filter((data: any) => {
        if (data.Id == `${environment.drive_licensesId}`) {
          return data;
        }
      });
      this.driveLicensId = driveLicens[0]?.id;
      this.driveLicenseOptions = driveLicens?.filter((data: any) => {
        return data.options;
      });
      this.driveLicenseOptions = this.driveLicenseOptions[0]?.options.filter((item: any) => {
        return item.value;
      });
      // edu level
      this.edulevel = response.data.filter((data: any) => {
        if (data.Id == `${environment.eduCationLevelId}`) {
          return data;
        }
      });
      this.educationId = this.edulevel[0]?.id;
      this.educationLevel = this.edulevel?.filter((data: any) => {
        return data.options;
      });
      this.educationLevel = this.educationLevel[0]?.options.filter((item: any) => {
        return item.value;
      });

      // passport
      this.passport = response.data.filter((data: any) => {
        if (data.Id == `${environment.passportId}`) {
          return data;
        }
      });
      this.passportId = this.passport[0]?.id;
      this.passportData = this.passport?.filter((data: any) => {
        return data.options;
      });
      this.passportData = this.passportData[0]?.options.filter((item: any) => {
        return item.value;
      });

      // english lan
      this.engLan = response.data.filter((data: any) => {
        if (data.Id == `${environment.englishId}`) {
          return data;
        }
      });
      this.engId = this.engLan[0]?.id;
      this.engLanData = this.engLan?.filter((data: any) => {
        return data.options;
      });
      this.engLanData = this.engLanData[0]?.options.filter((item: any) => {
        return item.value;
      });

      // russian
      this.russianLan = response.data.filter((data: any) => {
        if (data.Id == `${environment.russianId}`) {
          return data;
        }
      });
      this.russianId = this.russianLan[0]?.id;
      this.russianLanData = this.russianLan?.filter((data: any) => {
        return data.options;
      });
      this.russianLanData = this.russianLanData[0]?.options.filter((item: any) => {
        return item.value;
      });

      // arabic
      this.arabicLan = response.data.filter((data: any) => {
        if (data.Id == `${environment.arabicId}`) {
          return data;
        }
      });
      this.arabicId = this.arabicLan[0]?.id;
      this.arabicLanData = this.arabicLan?.filter((data: any) => {
        return data.options;
      });
      this.arabicLanData = this.arabicLanData[0]?.options.filter((item: any) => {
        return item.value;
      });

      // residence
      this.residence = response.data.filter((data: any) => {
        if (data.Id == `${environment.residenceId}`) {
          return data;
        }
      });
      this.residenceId = this.residence[0]?.id;
      this.residenceData = this.residence?.filter((data: any) => {
        return data.options;
      });
      this.residenceData = this.residenceData[0]?.options.filter((item: any) => {
        return item.value;
      });

      this.newProp5 = [];
      response.data.forEach((e: any) => {
        e.isExpanded = false;
        e.values = [];
        if (!e.parentId) {
          if (!e.options.map((e: any) => e.value).some((x: any) => isNaN(+x))) e.allNum = true;
          else {
            e.allNum = false;
            e.options = e.options.filter(
              (ele: any) => ele.value != '' && ele.value != '1' && ele.value != ' ' && ele.value != null
            );
          }
          e.options.forEach((o: any) => (o.isSelected = false));
          let childProps = response.data.filter((f: any) => f.parentId === e.id);
          childProps.forEach((ele: any) => {
            ele.isExpanded = false;
            e.isSelected = false;
            e.values = [];
            if (ele.options.map((e: any) => e.value).some((x: any) => isNaN(+x))) ele.allNum = false;
            else ele.allNum = true;
            ele.options = ele.options.filter(
              (e: any) => e.value != '' && e.value != '1' && e.value != ' ' && e.value != null
            );
            ele.options.forEach((o: any) => (o.isSelected = false));
          });
          this.newProp5?.push({
            ...e,
            child: childProps,
          });
          this.newProp5?.filter((data: any) => {
            const LanguageID = 110;
            if (data['id'] == LanguageID) {
              this.additionalLang = data['child'];
            }
          });
          this.additionalLang = this.additionalLang.filter((data: any) => {
            const englishId = 1;
            const arabicId = 6;
            const russianId = 4;
            return data.Id !== englishId && data.Id !== arabicId && data.Id !== russianId;
          });
          this.newProp5Data = this.newProp5?.filter((data: any) => {
            //return data.prop5Name != 'Specialization';
            const LanguageID = 110;
            if (data['id'] == LanguageID) {
              data.child = data.child.filter((childData: any) => {
                const englishId = 1;
                const arabicId = 6;
                const russianId = 4;
                return childData.Id !== englishId && childData.Id !== arabicId && childData.Id !== russianId;
              });
            }

            return (
              data.Id != `${environment.eduCationLevelId}` &&
              data.Id != `${environment.arabicId}` &&
              data.Id != `${environment.org_membershipId}` &&
              data.Id != `${environment.englishId}` &&
              data.Id != `${environment.russianId}` &&
              data.Id != `${environment.drive_licensesId}` &&
              data.Id != `${environment.passportId}` &&
              data.Id != `${environment.academicStudiesId}` &&
              data.Id != `${environment.livingForActingId}` &&
              data.Id != `${environment.residenceId}` &&
              data.Id != `${LanguageID}`
            );
          });
        }
      });
    }
  }

  pushPopValue(prop: any, opt: any) {
    const ind = prop.values.findIndex((e: any) => e === opt.id);
    if (ind >= 0) {
      opt.isSelected = false;
      prop.values.splice(ind, 1);
    } else if (ind < 0) {
      opt.isSelected = true;
      prop.values.push(opt.id);
    }
  }

  getSelectedProp5values() {
    let finalData: any = [];
    this.newProp5?.forEach((parent) => {
      if (parent.values.length > 0) {
        finalData.push({ id: parent.id, values: parent.values });
      }
      if (parent.child.length > 0) {
        let childEntries = parent.child.filter((e: any) => e.values.length > 0);
        if (childEntries.length > 0)
          childEntries.forEach((c: any) => {
            if (c.values.length > 0) {
              finalData.push({ id: c.id, values: c.values });
            }
          });
      }
    });
    if (finalData.length > 0) this.selectedProps = finalData;
    else this.selectedProps = [];
  }

  getCheckedPropValues() {
    this.selectedProps = [];
    let object: { id: number; values: number[] } = { id: 0, values: [] };
    this.propsData.forEach((e: any) => {
      e.options.forEach((o: any) => {
        if (o['isSelected']) {
          object.id = e.id;
          object.values.push(o.id);
        }
      });
      if (object.id != 0) {
        this.selectedProps.push(object);
        object = { id: 0, values: [] };
      }
    });
  }

  clearSelectedVal(prop: any) {
    prop.values.length = 0;
    prop.options.forEach((e: any) => (e.isSelected = false));
  }

  toggleExpand(prop: any) {
    prop.isExpanded = !prop.isExpanded;
  }
  expandToggle() {
    this.expandingToggle = !this.expandingToggle;
  }
  expandinggToggle() {
    this.expanddToggle = !this.expanddToggle;
  }
  reloadPage(): void {
    location.reload();
  }
  formChange(event: any) {
    this.eventName = event.target.name;
    this.formValue = event.target.value;
    switch (this.eventName) {
      case 'gender':
        this.genderselect = !!this.formValue;
        break;
      case 'body':
        this.bodySelect = !!this.formValue;
        break;
      case 'hair_color':
        this.hairSelect = !!this.formValue;
        break;
      case 'hair_type':
        this.hairTypeSelect = !!this.formValue;
        break;
      case 'eyes':
        this.eyesSelect = !!this.formValue;
        break;
      case 'skin_tone':
        this.skintoneSelect = !!this.formValue;
        break;
      case 'agencyIds':
        this.agencySelect = !!this.formValue;
        break;
      case 'orgMembership':
        this.membershipSelect = !!this.formValue;
        break;
      case 'licenseKey':
        this.licenseSelect = !!this.formValue;
        break;
      case 'actingStudies':
        this.studiesSelect = !!this.formValue;
        break;
      case 'passportKey':
        this.passportSelect = !!this.formValue;
        break;
      case 'russianLng':
        this.russianSelect = !!this.formValue;
        break;
      case 'englishLng':
        this.englishSelect = !!this.formValue;
        break;
      case 'arabicLng':
        this.arabicSelect = !!this.formValue;
        break;
      case 'residenceKey':
        this.residenceSelect = !!this.formValue;
        break;

      default:
        break;
    }
  }
  async translateText() {
    await Promise.all(
      this.searchData.map(async (data: any) => {
        const names = `${data.FirstName} ${data.LastName}`;
        const encodedName = `The person's name is:${names}`;
        const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${environment.hebrewLanguage}&tl=${environment.englishLanguage}&dt=t&q=${encodedName}&key=${environment.translateApiKey}`;

        try {
          const response = await fetch(apiUrl);
          const translationData = await response.json();
          const translatedText = translationData[0][0][0];
          this.translatedtext = translatedText.toLowerCase();
          const translatedValue = translatedText.split(':')[1].trim();
          data['transNameEn'] = translatedValue;
        } catch (error) {
          console.error('Error:', error);
        }
      })
    );
  }
  async translateTextHe() {
    await Promise.all(
      this.searchData.map(async (data: any) => {
        const names = `${data.FirstName} ${data.LastName}`.toLowerCase();
        const translatedText = await this.searchService.translateHebrewNameText(
          environment.englishLanguage,
          environment.hebrewLanguage,
          names
        );
        data['translatedNameHe'] = translatedText;
      })
    );
  }

  onEnter() {
    // Trigger the form submission when Enter key is pressed
    this.searchFilter();
  }

  async getSiteSettings() {
    await this.searchService.getSiteSettings().subscribe((data: any) => {
      let response = data['data'];

      if (response.show_actors == 1) {
        this.authSearchCheck = true;
      } else {
        if (this.authUseCheck == false) {
          this.authSearchCheck = false;
        }
      }
    });
  }
}
