import { Attendance } from './attendance';
import { GradeItem } from './grade-item';
export class CourseSession {
    _id: any;
    course_id: any;
    name: string;
    professor: string;
    startDate: Date;
    endDate: Date;
    daysOftheWeek: number;
    attendanceTemplate?: Attendance[];
    gradeItems?: GradeItem[];
    editState: boolean;
}