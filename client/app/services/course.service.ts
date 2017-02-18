import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CourseService {
    constructor(private http: Http) {
        console.log('Course Service Initialized...');
    }

    getCourses() {
        return this.http.get('/api/courses')
            .map(res => res.json());
    }

    getCourse(id) {
        return this.http.get('/api/course/' + id)
            .map(res => res.json());
    }

    addCourse(newCourse) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/course', JSON.stringify(newCourse), { headers: headers })
            .map(res => res.json());
    }

    deleteCourse(id) {
        return this.http.delete('/api/course/' + id)
            .map(res => res.json());
    }

    updateStatus(course) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/course/', JSON.stringify(course), { headers: headers })
            .map(res => res.json());
    }
}