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
    attendanceSaveHidden: boolean;
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private studentService: StudentService,
        private location: Location,
        private notiService: NotificationService) {
        this.loaded = false;
        this.attendanceSaveHidden = true;
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
                if (this.courseSession.attendanceTemplate) {
                    this.attendances = this.courseSession.attendanceTemplate;
                } else {
                    this.attendances = [];
                }
                this.students = data[1];
                this.studentSessionsRepo = data[2];
                this.studentSessions = [];
                this.loaded = true;
            });
    }
    emptyAttendance(): void {
        while (this.attendances.length > 0) {
            this.attendances.pop();
        }
    }
    changeAttendance() {
        this.attendanceSaveHidden = false;
    }
    generateAttence(): void {
        this.changeAttendance();
        this.emptyAttendance();
        if (this.courseSession.startDate && this.courseSession.endDate && this.courseSession.daysOftheWeek) {
            this.courseSession.startDate = new Date(this.courseSession.startDate);
            this.courseSession.endDate = new Date(this.courseSession.endDate);
            if (this.courseSession.startDate.getDay() !== this.courseSession.daysOftheWeek) {
                let openingDay =
                    new Date(this.courseSession.startDate.getTime() +
                        24 * 60 * 60 * 1000 * ((7 + this.courseSession.daysOftheWeek - this.courseSession.startDate.getDay()) % 7))
                let timeDiff: number = this.courseSession.endDate.getTime() - openingDay.getTime();
                for (let i = 0; i <= timeDiff; i += 24 * 60 * 60 * 1000 * 7) {
                    let attendacneDay: Date = new Date(openingDay.getTime() + i);
                    let dayAttendance: Attendance = { date: attendacneDay };
                    this.attendances.push(dayAttendance);
                }
            }
        } else {

        }
    }
    saveAttendanceChange(): void {
        this.courseSession.attendanceTemplate = this.attendances;
        this.courseService.updateCourseSession(this.courseSession).subscribe(
            data => {
                if (data && typeof data.errmsg !== 'undefined') {
                    this.notiService.alert(`${data.errmsg}`);
                } else {
                    this.notiService.success(`Save Attendance Template Change `);
                }
            }
        );
        this.attendanceSaveHidden = true;
    }
}