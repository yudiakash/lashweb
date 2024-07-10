import {env} from './env';
 
export const environment = {
  production: false,
  version: env['npm_package_version'] + '-dev',
  apiUrl: 'https://www.shalash.org.il/public/api/',
  serverUrl: '/api',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR', 'he-IL'],
  imageUrl: 'https://shalash-angular.s3.eu-central-1.amazonaws.com/uploads/actor/',
  imgNewsUrl: 'https://shalash-angular.s3.eu-central-1.amazonaws.com/Texts/',
  imgUrl: 'https://shalash-angular.s3.eu-central-1.amazonaws.com/uploads/',
  auditionUrl: 'https://shalash-angular.s3.eu-central-1.amazonaws.com/auditions/',
  resumeUrl: 'https://shalash-angular.s3.eu-central-1.amazonaws.com/Resumes/',
  defaultImgUrl: 'https://www.shalash.org.il/public/uploads/',
  imgBaseUrl: 'https://www.shalash.org.il/public/timthumb.php?',
  siteUrl: 'https://www.shalash.org.il/',
  iframeUrl: 'https://www.shalash.org.il/',
  eduCationLevelId: 84,
  residenceId: 108,
  org_membershipId: 93,
  send_me_acting_rolesId: 92,
  men_toneId: 38,
  woman_toneId: 30,
  drive_licensesId: 82,
  singerId: 29,
  passportId: 107,
  russianId: 4,
  englishId: 1,
  arabicId: 6,
  academicStudiesId: 106,
  livingForActingId: 105,
  oldUrl: 'https://www.shalash.org.il/timthumb.php?src=/uploads/',
  englishLanguage: 'en',
  hebrewLanguage: 'he',
  translateApiKey: 'AIzaSyAdzdAjcXFRUsyvgipwSYzKcZKpfPAQ3bA',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
