import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StudentComponent } from './components/student/student.component';
import { CourseSessionComponent } from './components/course-sessions/course-sessions.component';
import { SessionDetailComponent } from './components/session-detail/session.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterStudentComponent } from './components/session-detail/register-student.component';
import { CurrentStudentsComponent } from './components/session-detail/current-students.component';
import { SessionSettingComponent } from './components/session-detail/session-setting.component';
import { TruncatePipe } from './pipe/truncate';
import { DayOfWeekPipe } from './pipe/dayofweek'
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, AppRoutingModule],
  declarations: [
    AppComponent, CoursesComponent, StudentComponent,
    DashboardComponent, CourseSessionComponent,
    RegisterStudentComponent,
    CurrentStudentsComponent,
    SessionSettingComponent,
    SessionDetailComponent, 
    TruncatePipe, 
    DayOfWeekPipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }