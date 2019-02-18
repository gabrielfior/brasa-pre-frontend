import { Component, OnInit, OnDestroy } from '@angular/core';
import {Exam} from './exams/exam.model';
import { Subscription } from 'rxjs';
import {ExamsApiService} from './exams/exams-api.service';

import * as Auth0 from 'auth0-web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated = false;

  signIn = Auth0.signIn;
  signOut = Auth0.signOut;

  ngOnInit() {
    const self = this;
    Auth0.subscribe((authenticated) => (self.authenticated = authenticated));
  }

}