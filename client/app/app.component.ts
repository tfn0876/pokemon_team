import { Component } from '@angular/core';
import {CourseService} from './services/course.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers:[CourseService]
})
export class AppComponent { }