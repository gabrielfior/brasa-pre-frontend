import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamsApiService } from './exams/exams-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ExamFormComponent } from './exams/exam-form.component';
import { ExamsComponent } from './exams/exams.component';
import { RouterModule, Routes } from '@angular/router';
import * as Auth0 from 'auth0-web';
import {CallbackComponent} from './callback.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { MenteeCollegeComponent } from './mentee/mentee-college/mentee-college.component';
import { MenteeTestComponent } from './mentee/mentee-test/mentee-test.component';
import { MenteeEssayComponent } from './mentee/mentee-essay/mentee-essay.component';
import { MenteeInformationComponent } from './mentee/mentee-information/mentee-information.component';
import { MenteeListingComponent } from './mentee/mentee-listing/mentee-listing.component';

import { MenteeDetailComponent } from './mentee/mentee-detail/mentee-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenteePageModule } from './mentee/mentee.module';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common'

import { MentorListingComponent } from './mentor/mentor-listing/mentor-listing.component';
import { MentorInformationComponent } from './mentor/mentor-information/mentor-information.component';
import { MentorDetailComponent } from './mentor/mentor-detail/mentor-detail.component';



const appRoutes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'new-exam', component: ExamFormComponent },
  { path: 'exams', component: ExamsComponent , canActivate: [AuthGuard]},
  { path: 'mentee/listing', component: MenteeListingComponent },
  { path: 'mentee/test/:id', component: MenteeTestComponent },
  { path: 'mentee/essay/:id', component: MenteeEssayComponent },
  { path: 'mentee/college/:id', component: MenteeCollegeComponent },
  { path: 'mentee/detail/:id', component: MenteeDetailComponent },
  { path: 'mentee/listing/:id', component: MenteeInformationComponent },
  { path: 'mentor/listing', component: MentorListingComponent },
  { path: 'mentor/listing/:id', component: MentorInformationComponent },
  { path: 'mentor/detail/:id', component: MentorDetailComponent},


  { path: '', component: HomeComponent },
  //{ path: '**', redirectTo: '' }

];

export const MY_NATIVE_FORMATS = {
    fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
    datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
    timePickerInput: {hour: 'numeric', minute: 'numeric'},
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

@NgModule({
  declarations: [
    AppComponent,
    ExamFormComponent,
    ExamsComponent,
    CallbackComponent,
    HomeComponent,
    //MentorComponent,
    MenteeListingComponent,
    MentorInformationComponent,
    MentorListingComponent,
    MentorDetailComponent,
    MenteeInformationComponent,
    MenteeEssayComponent,
    MenteeTestComponent,
    MenteeEssayComponent,
    MenteeCollegeComponent,
    MenteeDetailComponent
  ],
  imports: [
    AngularMultiSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MenteePageModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  providers: [ExamsApiService, {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS}, DatePipe],
  entryComponents: [MenteeTestComponent, MenteeCollegeComponent],
  bootstrap: [AppComponent, MenteeTestComponent, MenteeCollegeComponent]
})
export class AppModule {
  constructor() {
    Auth0.configure({
      domain: 'brasa-pre-app.eu.auth0.com',
      audience: 'https://online-exam.digituz.com',
      clientID: 'Qw4p5JyU5yO2dZ0DWPL27g9tq6P4c5kk',
      redirectUri: 'http://localhost:4200/callback',
      scope: 'openid profile manage:exams'
    });
  }
}
