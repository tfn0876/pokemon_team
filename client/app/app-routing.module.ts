import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './components/student/student.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseSessionComponent } from './components/course-sessions/course-sessions.component';
import { SessionDetailComponent } from './components/session-detail/session.component';
import { RegisterStudentComponent } from './components/session-detail/register-student.component';
import { CurrentStudentsComponent } from './components/session-detail/current-students.component';
import { SessionSettingComponent } from './components/session-detail/session-setting.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course-detail/:id', component: CourseSessionComponent },
  {
    path: 'session-detail/:id', component: SessionDetailComponent, children: [
      { path: '', redirectTo: 'currentStudents', pathMatch: 'full' },
      { path: 'register', component: RegisterStudentComponent },
      { path: 'currentStudents', component: CurrentStudentsComponent },
      { path: 'setting', component: SessionSettingComponent },
    ]
  },
  { path: 'students', component: StudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

