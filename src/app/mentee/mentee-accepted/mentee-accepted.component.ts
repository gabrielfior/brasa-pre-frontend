import { Component, OnInit, OnChanges,  EventEmitter, Input, Output, ChangeDetectorRef, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'
import { MenteeService } from '../shared/mentee.service';
import { Exam } from '../shared/exam.model';
import { Category } from '../shared/category.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
import { University } from '../shared/university';
import * as Auth0 from 'auth0-web';
import {Location} from '@angular/common';

@Component({
  selector: 'app-mentee-accepted',
  templateUrl: './mentee-accepted.component.html',
  styleUrls: ['./mentee-accepted.component.css']
})



export class MenteeAcceptedComponent{
  private readonly API_URL = 'https://brasa-pre.herokuapp.com/api';
  //public collegeArray:any=[];
  private headers: HttpHeaders;
  public universities: University[] = [];
  public universitiesIso: University[] = [];
  public category : Exam;
  public isoCode: University[] = [];
  public isoControl: University;
  //form: FormGroup;
  //port8Control: FormControl;
  //ports10Page = 2;
  //public category : University;
  menteeId: any;
  @Input() public selectedUnis: University[] = new Array();
  @Input() public selectedUnisIso: University[] = new Array();
  //public selectedIsoCodes: University[]=[];
  // public selectedUnis1: University[]=[];
  public helper: University[]=[];
  public categoria = new FormControl();
  public categories: string[] = ['teste', 'teste2'];
  itemList = [];
  selectedItems = [];
  settingsUnis = {};
  settingsIso = {};
  public helper2 = 0;
  public helper3 = -1;
  userForm: FormGroup;
  loading = false;
  public role:any;
  public userNickname:any;
  @Output() uniSelectedChange = new EventEmitter<any>();



  constructor( private formBuilder: FormBuilder,
               private http: HttpClient,
               private getMentee: HttpClient,
               private menteeService: MenteeService,
             private route: ActivatedRoute,
           private cd: ChangeDetectorRef,
           private zone:NgZone, private _location: Location  ) {

    this.headers = new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    this.userForm = this.formBuilder.group({
            uniList: [],
            isoList: ''
        });

    this.getUniList(); // pegando todas universities
    this.userNickname = Auth0.getProfile().nickname;
    this.getUsername(this.userNickname);
    this.menteeId = this.route.snapshot.paramMap.get('id');
    this.selectColleges(this.menteeId) //pegando college list do 'menteeId' para pré selecionar
    //this.selectedUnis1 = this.selectedUnis
    //let timer = of(this.selectColleges(this.menteeId)).delay(5000);
    //timer.subscribe(() => this.selectColleges(this.menteeId));


    /*
    this.selectedUnis1.push({id: 693, name: "Seattle University"})
    this.selectedUnis1.push({id: 695, name: "Sewanee, University of the South"})
    this.selectedUnis1.push({id: 698, name: "Shippensburg University of Pennsylvania"})
    this.selectedUnis1.push({id: 696,name: "Shawnee State University"});*/

    this.settingsIso = {
      singleSelection: true,
    text: "País",
    labelKey: 'country_iso_code',
    primaryKey: 'country_iso_code',
    classes: "myclass custom-class"
    };

    this.settingsUnis = {
      singleSelection: false,
      text: "Selecione niversidades",
      enableFilterSelectAll: false,
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: "name",
      limitSelection: 20,
      classes: "myclass custom-class",
      disabled: true
    };

  }

  getUsername(username) {
    this.menteeService.getUser(username).subscribe(usuario=>{
      this.role = usuario.role_name
    });
  }

  public onIsoSelect(item: any) {
    this.universitiesIso = []
    this.selectedUnisIso = []
    this.universities.forEach((university)=>{
      if (university.country_iso_code == item.country_iso_code){
        this.universitiesIso.push(university)
      }
    })

    this.selectedUnisIso.forEach((university)=>{
      if (university.country_iso_code == item.country_iso_code){
      this.selectedUnisIso.push(university)
      }
    })

    this.settingsUnis = {
      singleSelection: false,
      text: "Select College List",
      enableFilterSelectAll: false,
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: "name",
      limitSelection: 20,
      classes: "myclass custom-class",
      disabled: false
    };


  }
  public onIsoDeSelect(item: any) {
    this.settingsUnis = {
      singleSelection: false,
      text: "Select College List",
      enableFilterSelectAll: false,
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: "name",
      limitSelection: 20,
      classes: "myclass custom-class",
      disabled: true
    };
  }

  onItemSelect(item: any) {
    this.helper3 = this.helper3+1
    this.selectedUnis.push({id: 0, name: item.name})
  }

  public goBack() {
   this._location.back();
 }

  OnItemDeSelect(item: any) {
    this.helper3= this.helper3-1
    this.selectedUnis.pop()
  }

  public excludeUniversity(id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };
    this.http.delete<any>(`${this.API_URL}/university_acceptances/`+id, httpOptions).subscribe(data => {

     }, error => {
      console.log(error);
    });;

    this.selectedUnis.forEach((uni, index)=>{
      if (uni.upload_id == id){
        this.selectedUnis.splice(index,1)
      }
    })
  }


  public postCollegeList(){
    console.log()
    // pegando ids
    const universitiesId = [];
    this.userForm.value.uniList.forEach(test=>{
      universitiesId.push(test.id)
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Authorization': `Bearer ${Auth0.getAccessToken()}`
      })
    };

    //http://brasa-pre.herokuapp.com/api/university_application_for_mentee
    universitiesId.forEach(ids => {

      this.http.post(`${this.API_URL}/university_acceptances`,
        { mentee_id: this.menteeId,
          university_id: ids}, httpOptions).subscribe(data => {

          this._location.back();
         }, error => {
          //console.log(error);
          this._location.back();
        });
    })
  };

  public async selectColleges(id){

    this.menteeService.getMentee(id).subscribe(tests=>{
      this.helper3 = tests.university_acceptances.length
      tests.university_acceptances.forEach(unis => {
        this.menteeService.getCollegeNameById(unis.university_id).subscribe(collegeName=>{
          this.selectedUnis.push({id: unis.university_id, name: collegeName.name, upload_id: unis.id});
          //this.selectedIsoCodes.push({isoCode: collegeName.country_iso_code});
        })
      })
      /*
      for (this.helper2; this.helper2< tests.university_applications.length;this.helper2++){
        this.menteeService.getCollegeNameById(tests.university_applications[this.helper2].university_id).subscribe(collegeName=>{
          if (this.helper2 < this.helper3){
          this.selectedUnis.push({id: tests.university_applications[this.helper2].university_id, name: collegeName.name});
          }
        })

      }*/
      // this.selectedUnis = this.helper
      return this.selectedUnis



    })
  };


  private getUniList() {

   this.menteeService.getAllUniversities().subscribe(tests => {
     this.universities = tests['objects']
     const result = [];
     const codes = [];
     const mapUniversities = new Map();
     for (const item of tests['objects']) {
         if(!mapUniversities.has(item.name)){
             mapUniversities.set(item.name, item.name);    // set any value to Map
             result.push({
                  id: item.id,
                 name: item.name,
                 country_iso_code: item.country_iso_code
             });
         };
         if(!mapUniversities.has(item.country_iso_code)){
             mapUniversities.set(item.country_iso_code, item.country_iso_code);    // set any value to Map
             codes.push({
                  country_iso_code: item.country_iso_code
             });
         };

       };
       this.isoCode = codes;
       this.universities = result;

   });
 }


}
