import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { ProfileComponent} from './components/profile/profile.component';


import { StudentComponent } from './components/student/student.component';
import { CourseSessionComponent } from './components/course-sessions/course-sessions.component';
import { SessionDetailComponent } from './components/session-detail/session.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterStudentComponent } from './components/session-detail/register-student.component';

import { CurrentStudentsComponent } from './components/session-detail/current-students.component';
import { TruncatePipe } from './pipe/truncate';
import { DayOfWeekPipe } from './pipe/dayofweek'
import { AppRoutingModule } from './app-routing.module';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule, AppRoutingModule],
  declarations: [AppComponent,
   CoursesComponent, StudentComponent,LoginComponent,RegisterComponent,ProfileComponent,NavbarComponent,SidebarComponent,
    DashboardComponent, CourseSessionComponent, RegisterStudentComponent, CurrentStudentsComponent,
    SessionDetailComponent, TruncatePipe, DayOfWeekPipe],
    providers:[ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }