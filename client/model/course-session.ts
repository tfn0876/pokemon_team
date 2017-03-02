import { Attendance } from './attendance';
export class CourseSession {
    _id: any;
    course_id: any;
    name: string;
    professor: string;
    startDate: Date;
    endDate: Date;
    daysOftheWeek: number;
    attendanceTemplate?: Attendance[];
    editState: boolean;
}