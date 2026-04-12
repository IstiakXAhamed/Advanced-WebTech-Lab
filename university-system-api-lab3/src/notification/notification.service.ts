import { forwardRef, Inject, Injectable } from '@nestjs/common';
import strict from 'assert/strict';
import { stringify } from 'querystring';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Injectable()
export class NotificationService {
    constructor(@Inject(forwardRef(()=> EnrollmentService)) private enrollmentService:EnrollmentService,){}

    sendNotification(studentName: string, message: string) {
        return {
            status: "Notification Sent",
            student: studentName,
            message: message,
        }
    }

    checkEnrollmentAndNotify(studentName: string, courseId: string) {
        const enrollmentStatus = this.enrollmentService.getEnrollments()

        return { 
            status: "Checked And Notified ",
            student: studentName,
            courseId: courseId,
            enrollmentDetails : enrollmentStatus,
        }
    }




}
