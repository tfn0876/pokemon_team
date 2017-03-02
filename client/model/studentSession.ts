import { Student } from './student';
import { CourseSession } from "./course-session";
import { Attendance } from './attendance';

export class StudentSession {
    _id?: any;
    student_id: any;
    courseSession_id: any;
    student?: Student;
    courseSession?: CourseSession;
    dropClass?: boolean;
    editState?: boolean;
    attendance?: Attendance[];
}