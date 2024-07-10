import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SamDragAndDropGridModule } from '@sam-1994/ngx-drag-and-drop-grid';
import { ImageCropperModule } from 'ngx-image-cropper';

import { environment } from '@env/environment';
import { RouteReusableStrategy, ApiPrefixInterceptor, ErrorHandlerInterceptor, SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewsModule } from './news/news.module';
import { SearchModule } from './search/search.module';
import { PhotographersModule } from './photographers/photographers.module';
import { RehearsalsStudiosModule } from './rehearsals-studios/rehearsals-studios.module';
import { FaqModule } from './faq/faq.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ActorDetailsModule } from './actor-details/actor-details.module';
import { CastingCallsModule } from './casting-calls/casting-calls.module';
import { CastedSuccessfullyModule } from './casted-successfully/casted-successfully.module';

//import { LoginModule } from './login/login.module';
// import { DateagoPipe } from './pipes/dateago.pipe';
import { ViewAllActorDetailsModule } from './view-all-actor-details/view-all-actor-details.module';
import { ActorAccountModule } from './actoraccount/actoraccount.module';
import { MyaccountModule } from './myaccount/myaccount.module';
import { CastingCallDetailsModule } from './casting-call-details/casting-call-details.module';
import { JoinAsActorModule } from './register/join-as-actor/join-as-actor.module';
import { AddYourDetailsModule } from './register/add-your-details/add-your-details.module';
import { AccountSubscriptionsModule } from './register/account-subscriptions/account-subscriptions.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MyMessagesModule } from './my-messages/my-messages.module';
import { MySubscriptionModule } from './my-subscription/my-subscription.module';
import { MyPaymentsModule } from './my-payments/my-payments.module';
import { MyNotificationsModule } from './my-notifications/my-notifications.module';
import { TellUsMoreModule } from './tell-us-more/tell-us-more.module';
import { AccountPaymentModule } from './register/account-payment/account-payment.module';
import { RegistrationSuccessModule } from './register/registration-success/registration-success.module';
import { NewsDetailsModule } from './news-details/news-details.module';
import { TermsOfUseModule } from './terms-of-use/terms-of-use.module';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { PaymentHistoryModule } from './payment-history/payment-history.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgxMasonryModule } from 'ngx-masonry';
import { ForgotUsernameModule } from './forgot-username/forgot-username.module';
import { ResetUsernameModule } from './reset-username/reset-username.module';
import { TranzillaFailedPaymentModule } from './tranzilla-failed-payment/tranzilla-failed-payment.module';
import { TranzillaSuccessfullPaymentModule } from './tranzilla-successfull-payment/tranzilla-successfull-payment.module';
// import { NgImageSliderModule } from 'ng-image-slider';
import { WorkshopRegistrationModule } from './workshop-registration/workshop-registration.module';
import { WorkshopRegistration2Module } from './workshop-registration2/workshop-registration2.module';
import { WorkshopRegistration3Module } from './workshop-registration3/workshop-registration3.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { WorkshopModule } from './workshop/workshop.module';
import { TranzillaSuccessModule } from './tranzila-payment/tranzila-success/tranzilla-success.module';
import { TranzillaFailedModule } from './tranzila-payment/tranzila-failed/tranzilla-failed.module';
import { CastingDirectorRegistrationModule } from './register/casting-director-registration/casting-director-registration.module';
import { DirectorRegistrationSuccessModule } from './register/director-registration-success/director-registration-success.module';
@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    NgbModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    CastedSuccessfullyModule,
    NewsModule,
    AuthModule,
    SearchModule,
    PhotographersModule,
    ActorAccountModule,
    MyaccountModule,
    RehearsalsStudiosModule,
    FaqModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSliderModule,
    ActorDetailsModule,
    ViewAllActorDetailsModule,
    WorkshopRegistrationModule,
    WorkshopRegistration2Module,
    WorkshopRegistration3Module,
    WorkshopsModule,
    WorkshopModule,
    TranzillaSuccessModule,
    TranzillaFailedModule,
    //LoginModule,
    CastingCallsModule,
    CastingCallDetailsModule,
    JoinAsActorModule,
    AddYourDetailsModule,
    AccountSubscriptionsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    MyMessagesModule,
    MySubscriptionModule,
    MyPaymentsModule,
    MyNotificationsModule,
    TellUsMoreModule,
    NgSelectModule,
    AccountPaymentModule,
    RegistrationSuccessModule,
    NewsDetailsModule,
    TermsOfUseModule,
    TranzillaSuccessfullPaymentModule,
    TranzillaFailedPaymentModule,
    PaymentHistoryModule,
    ForgotUsernameModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    ResetUsernameModule,
    CastingDirectorRegistrationModule,
    DirectorRegistrationSuccessModule,
    ImageCropperModule,
    AppRoutingModule,
    SamDragAndDropGridModule,
    DragDropModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgxMasonryModule,

    // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, SidebarComponent],
  providers: [
    BnNgIdleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
