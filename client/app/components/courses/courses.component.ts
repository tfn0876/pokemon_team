import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';
import { Course } from '../../../model/course';
import { TruncatePipe } from '../../Pipe/truncate';
@Component({
    moduleId: module.id,
    selector: 'courses',
    templateUrl: 'courses.component.html',
    providers: [CourseService, NotificationService]
})
export class CoursesComponent {
    courses: Course[];
    courseRepo: Course[];
    filter: string;
    table: any;
    newCourse: Course;
    constructor(private courseService: CourseService,
        private notiService: NotificationService) {
        this.courseService.getCourses()
            .subscribe(courses => {
                this.courses = courses;
                this.courseRepo = [];
                for (let c of this.courses) {
                    this.courseRepo.push(c);
                }
            });
    }
    refreshNewCourse() {
        this.newCourse = {
            editState: true,
            title: "",
            _id: "",
            code: "",
            description: ""
        };
    }
    addNewCourse() {
        this.emptyCourse();
        this.refreshNewCourse();
        this.courses.push(this.newCourse);
        this.notiService.info("Add Mode");
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
    deleteCourse(id) {
        var courses = this.courseRepo;
        this.courseService.deleteCourse(id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < courses.length; i++) {
                    if (courses[i]._id == id) {
                        courses.splice(i, 1);
                        this.notiService.success(`Deleted Course ${courses[i].title}`);
                        this.applyfilter();
                    }
                }
            }
        });
    }
    editCourse(course) {
        course.editState = !course.editState;
        this.applyfilter();
    }
    updateCourse(course) {
        var _course = {
            title: course.title,
            code: course.code,
            description: course.description
        };
        if (course._id) {
            this.courseService.updateCourse(course).subscribe(data => {
                // update course sucessfully
                if (data && typeof data.errmsg !== 'undefined') {
                    // console.log(data.errmsg);
                    this.notiService.alert(`Saved Course ${data.errmsg}`);
                }
                course.editState = !course.editState;
                this.notiService.success(`Saved Course ${course.title}`);
            });
        } else {
            this.courseService.addCourse(course)
                .subscribe(course => {
                    this.courseRepo.push(course);
                    this.applyfilter();
                    this.notiService.success(`Added Course ${course.title}`);
                });
        }
    }
}