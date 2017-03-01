import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { NotificationService } from '../../services/notification.service';
import { CourseSession } from '../../../model/course-session';
import { Student } from '../../../model/student';
import { Attendance } from '../../../model/attendance';
import { StudentSession } from '../../../model/studentSession';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
@Component({
    moduleId: module.id,
    selector: 'session-setting',
    templateUrl: 'session-setting.component.html',
    providers: [CourseService, StudentService, NotificationService]
})
export class SessionSettingComponent implements OnInit {
    students: Student[];
    courseSession: CourseSession;
    attendances: Attendance[];
    studentSessions: StudentSession[];
    studentSessionsRepo: StudentSession[];
    filter: string;
    loaded: boolean;
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private studentService: StudentService,
        private location: Location,
        private notiService: NotificationService) {
        this.attendances = [];
    }
    ngOnInit(): void {
        this.route.parent.params
            .switchMap((params: Params) =>
                Observable.forkJoin(
                    this.courseService.getCourseSession(params['id']),
                    this.studentService.getStudents(),
                    this.studentService.getStudentSessions(params['id'])
                ))
            .subscribe(
            data => {
                this.courseSession = data[0];
                this.students = data[1];
                this.studentSessionsRepo = data[2];
                this.studentSessions = [];
                this.loaded = true;

            });
    }
    emptyAttendance(): void {

    }

    generateAttence(): void {
        this.emptyAttendance();
    }
}