import { Component, NgZone } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../../model/course';
import { TruncatePipe } from '../../Pipe/truncate';
@Component({
    moduleId: module.id,
    selector: 'courses',
    templateUrl: 'courses.component.html',
    providers: [CourseService]

})
export class CoursesComponent {
    courses: Course[];
    courseRepo: Course[];
    title: string;
    code: string;
    description: string;
    filter: string;
    table: any;
    constructor(private courseService: CourseService,
        private zone: NgZone) {
        this.courseService.getCourses()
            .subscribe(courses => {
                this.courses = courses;
                this.courseRepo = [];
                for (let c of this.courses) {
                    this.courseRepo.push(c);
                }
            });
    }

    emptyCourse() {
        while (this.courses.length > 0) {
            this.courses.pop();
        }
    }

    applyfilter() {
        this.emptyCourse();
        for (let entry of this.courseRepo) {
            if (this.filter) {
                if ((entry.title && entry.title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0)
                    || (entry.code && entry.code.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0)
                ) {
                    this.courses.push(entry);
                }
            } else {
                this.courses.push(entry);
            }
        }
    }

    addCourse(event) {
        event.preventDefault();
        var newCourse = {
            title: this.title,
            code: this.code,
            description: this.description
        }

        this.courseService.addCourse(newCourse)
            .subscribe(course => {
                this.courseRepo.push(course);
                this.title = '';
                this.code = '';
                this.applyfilter();
            });
    }

    deleteCourse(id) {
        var courses = this.courseRepo;
        this.courseService.deleteCourse(id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < courses.length; i++) {
                    if (courses[i]._id == id) {
                        courses.splice(i, 1);
                        this.applyfilter();
                    }
                }
            }
        });
    }
    editCourse(course) {
        course.editState = !course.editState;
    }
    updateCourse(course) {
        var _course = {
            title: course.title,
            code: course.code,
            description: course.description
        };
        this.courseService.updateStatus(course._id, _course).subscribe(data => {
            // update course sucessfully
            if (data && typeof data.errmsg !== 'undefined') {
                console.log(data.errmsg);
            }
            course.editState = !course.editState;
        });
    }
}