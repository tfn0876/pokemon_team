import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../../model/course';
import { CourseSession } from '../../../model/course-session';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'course-sessions',
    templateUrl: 'course-sessions.component.html',
    providers: [CourseService]
})
export class CourseSessionComponent implements OnInit {
    course: Course;
    courseSessions: CourseService[];
    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private location: Location) {
    }
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.courseService.getCourse(params['id']))
            .subscribe(course => this.course = course);
    }
    goBack(): void {
        this.location.back();
    }
}