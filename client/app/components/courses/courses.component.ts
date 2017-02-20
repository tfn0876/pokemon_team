import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../../model/course';

@Component({
    moduleId: module.id,
    selector: 'courses',
    templateUrl: 'courses.component.html',
    providers: [CourseService]
})
export class CoursesComponent {
    courses: Course[];
    title: string;
    code: string;
    constructor(private courseService: CourseService) {
        this.courseService.getCourses()
            .subscribe(courses => {
                this.courses = courses;
                // this.reloadDataTable();
            });
    }
    // reloadDataTable() {
    //     var i = setInterval(function () {
    //         $(".dataTable").dataTable({
    //             'searching': true
    //         });
    //         clearInterval(i);
    //     }, 1000);
    // }

    addCourse(event) {
        event.preventDefault();
        var newCourse = {
            title: this.title,
            code: this.code
        }

        this.courseService.addCourse(newCourse)
            .subscribe(course => {
                this.courses.push(course);
                this.title = '';
                this.code = '';
            });
    }

    deleteCourse(id) {
        var courses = this.courses;
        this.courseService.deleteCourse(id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < courses.length; i++) {
                    if (courses[i]._id == id) {
                        courses.splice(i, 1);
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
            code: course.code
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