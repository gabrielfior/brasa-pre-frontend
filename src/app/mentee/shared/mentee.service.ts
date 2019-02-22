import { Injectable } from '@angular/core';
import { of as ObservableOf, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mentee } from './mentee.model';
import * as Auth0 from 'auth0-web';

import { catchError } from 'rxjs/operators';
import { map, filter, scan } from 'rxjs/operators';
import {Exam} from './exam.model'
import { ExamsApiService } from '../../exams/exams-api.service';

@Injectable()
export class MenteeService {


  private readonly HS_API_URL = 'https://brasa-pre.herokuapp.com';
  //private readonly HS_API_URL = 'http://localhost:5000';
  private readonly API_KEY = 'WZmY7utpbDmshO1LYNtsweImq68Rp1h8e1Zjsnz63RbxE029tN';
  private headers: HttpHeaders;


  constructor(private http: HttpClient) {}


  public getAllmenteeDecks(): Observable<any>{
    return this.http.get<any>(`${this.HS_API_URL}/mentees/`);
  }

  public getCollegeList(id): Observable<any>{
    return this.http.get<any>(`${this.HS_API_URL}/mentees/` + id);
  }

  public getAllExams(): Observable<Exam[]>{
    
    const httpOptions = ExamsApiService.buildHeadersForAuth();
    console.log(httpOptions);
    return this.http.get<Exam[]>(`${this.HS_API_URL}/exams`);
  }

  public getAllUniversities(): Observable<any>{
    return this.http.get<any>(`${this.HS_API_URL}/universities/`);
  }






  // public getMenteeById(id: number): Observable<any>{

  // }
}
