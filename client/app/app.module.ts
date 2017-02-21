import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { RouterModule }   from '@angular/router';

import {AppComponent} from './app.component';
import {CoursesComponent} from './components/courses/courses.component';
import {StudentComponent} from './components/student/student.component';
import {CourseSessionComponent} from './components/course-sessions/course-sessions.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TruncatePipe} from './Pipe/truncate';
import { AppRoutingModule }     from './app-routing.module';
@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule,AppRoutingModule ],
  declarations: [AppComponent, CoursesComponent,StudentComponent,DashboardComponent, CourseSessionComponent,TruncatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }