import { Student } from './student';
import { CourseSession } from "./course-session"
export class StudentSession {
    _id?: any;
    student_id: any;
    courseSession_id: any;
    student?: Student;
    courseSession?: CourseSession;
    dropClass?: boolean;
    editState?: boolean;
}