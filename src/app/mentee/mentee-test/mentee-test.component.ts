import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common'
import { ExamsApiService } from '../../exams/exams-api.service';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-mentee-test',
  templateUrl: './mentee-test.component.html',
  styleUrls: ['./mentee-test.component.css']
})
export class MenteeTestComponent {
  public dateTime:any= Date();
  // Min moment: April 12 2000
  public min = new Date(2000, 3, 12);
  // Max moment: April 25 2025
  public max = new Date(2025, 3, 25);

  private todo : FormGroup;
  private readonly API_URL = 'http://brasa-pre.herokuapp.com/api';
  //private readonly API_URL = 'http://localhost:5000';
  public scoresArray:any=[];
  private headers: HttpHeaders;
  //public categories: Exam[];
  public categoria = new FormControl();
  //public categories: string[] = ['teste', 'teste2'];
  public categories: Exam[] =[];
  public subCategories: Exam[]=[];
  form: FormGroup;
  settingsCategory = {};
  settingsSubCategory = {};
  public category : Exam;
  public subCategory: Exam;
  @Input() score: any;
  public myDate:any = Date();
  public menteeId:any;
  private scheduledExams: any;

  examsListSubs: Subscription;
  examsList: Exam[];

 AddScore(){
   this.scoresArray.push({'category':'','subCategory':'', 'score': ''});
 };
 RemoveScore(idx){
   this.scoresArray.splice(idx, 1);
 };


  constructor( private fb: FormBuilder,
               private http: HttpClient,
               private getMentee: HttpClient,
               private menteeService: MenteeService,
             private route: ActivatedRoute,
           public datepipe: DatePipe,
           private _location: Location
           ) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    this.todo = this.fb.group({
      categoryName: '',
      subCategoryName: '',
      score: '',
      dateInput:''
    });
    this.getExams();
    this.menteeId = this.route.snapshot.paramMap.get('id');
    this.getScheduledExams();

    this.settingsSubCategory = {
      singleSelection: true,
      text: "Categoria",
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: 'subcategory',
      primaryKey: 'subcategory',
      classes: "myclass custom-class",
      disabled: true
    };

    this.settingsCategory = {
      singleSelection: true,
      text: "Prova",
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: 'category',
      primaryKey: 'category',
      classes: "myclass custom-class"
    };
  }

  onCategorySelect(item: any) {
    console.log(item.category)
    this.getSubcategories(item.category)
    this.settingsSubCategory = {
      singleSelection: true,
      text: "Categoria",
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: 'subcategory',
      primaryKey: 'subcategory',
      classes: "myclass custom-class",
      disabled: false
    };
  }
  OnItemDeSelect(item: any) {
    this.settingsSubCategory = {
      singleSelection: true,
      text: "Categoria",
      enableSearchFilter: true,
      lazyLoading: true,
      labelKey: 'subcategory',
      primaryKey: 'subcategory',
      classes: "myclass custom-class",
      disabled: true
    };
  }

  public goBack() {
   this._location.back();
 }

  public logForm(){
    // this.datepipe.transform(this.dateTime, 'dd-MM-yyyy') -> mudando formato da data
    this.menteeService.getAllExams().subscribe(tests => {
      tests['objects'].forEach(prova=>{

        //console.log(prova.category,this.category.category)
        //console.log(prova.subcategory, this.subCategory.subcategory)
        if (prova.category == this.todo.value.categoryName[0].category && prova.subcategory == this.todo.value.subCategoryName[0].subcategory) {
          var provaId = prova.id

          this.http.post(`${this.API_URL}/scheduled_exams`,
            {
              "realization_date": this.datepipe.transform(this.dateTime, 'dd-MM-yyyy'),
                "mentee_id": this.menteeId,
                "exam_id": provaId,
                "score": this.score
            },
            {headers: this.headers}).subscribe(data => {
              console.log(data['_body']);
              this.getScheduledExams();
             }, error => {
              console.log(error);
            });

            this.getExams();
            //delete this.todo.value.categoryName[0].category
            //delete this.todo.value.subCategoryName[0].subcategory
          this.score = ''
          this.todo.reset();
          this.dateTime = ''
          this.settingsSubCategory = {
            singleSelection: true,
            text: "Categoria",
            enableSearchFilter: true,
            lazyLoading: true,
            labelKey: 'subcategory',
            primaryKey: 'subcategory',
            classes: "myclass custom-class",
            disabled: true
          };
        }
      })
    });
/*
    for (let i =0; i< this.scoresArray.length; i++){
      this.http.post(`${this.API_URL}/exams`, this.scoresArray[i], {headers: this.headers}).subscribe(data => {
          console.log(data['_body']);
         }, error => {
          console.log(error);
        });
    };*/


  };


  private getExams() {
   this.menteeService.getAllExams().subscribe(tests => {

     this.categories = tests['objects']
     this.subCategories = tests['objects']
     const resultCategory = [];
     const resultSubCategory = [];
     const mapCategory = new Map();
     const mapSubCategory = new Map();
     for (const item of tests['objects']) {
         if(!mapCategory.has(item.category)){
             mapCategory.set(item.category, item.category);    // set any value to Map
             resultCategory.push({
                 category: item.category
             });
         };
         if(!mapSubCategory.has(item.subcategory)){
             mapSubCategory.set(item.subcategory, item.subcategory);    // set any value to Map
             resultSubCategory.push({
                 subcategory: item.subcategory
             });
         }
       };
       this.categories = resultCategory
       this.subCategories = resultSubCategory
       /*
     tests.forEach((element)=>{
       console.log(element)
       console.log(element.category)

       this.categories.push({categoryValue: element.category})
       console.log(this.categories, '11')
     })*/
   });
 }

 private getScheduledExams() {
  this.menteeService.getAllScheduledExams().subscribe(tests => {
    tests['objects']
    this.scheduledExams = tests['objects']
  });
}

public excludeExam(id){
  this.http.delete<any>(`${this.API_URL}/scheduled_exams/`+id,{headers: this.headers}).subscribe(data => {
    console.log(data['_body']);
   }, error => {
    console.log(error);
  });;
  this.scheduledExams.forEach((exam, index)=>{
    console.log(exam.id)
    if (exam.id == id){
      this.scheduledExams.splice(index,1)
    }
  })
}

 public getSubcategories(categorySent) {
   this.menteeService.getAllExams().subscribe(tests => {
     this.subCategories = tests['objects']
     const resultSubCategory = [];
     const mapSubCategory = new Map();
     for (const item of tests['objects']) {
       if (item.category == categorySent){
         if(!mapSubCategory.has(item.subcategory)){
             mapSubCategory.set(item.subcategory, item.subcategory);    // set any value to Map
             resultSubCategory.push({
                 subcategory: item.subcategory
             });
         }
       }

       };
       this.subCategories = resultSubCategory
     /*
     tests.forEach((element)=>{
       console.log(element)
       console.log(element.category)

       this.categories.push({categoryValue: element.category})
       console.log(this.categories, '11')
     })*/
   });
 };

 /*portChange(event: { component: SelectSearchableComponent, value: any }) {
    console.log('port:', event.value);
  }*/


}
