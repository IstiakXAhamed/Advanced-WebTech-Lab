import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { retry } from 'rxjs';
import { CourseService } from 'src/course/course.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class EnrollmentService {
    constructor(private courseService: CourseService,
        @Inject(forwardRef(()=>NotificationService)) private notificationService: NotificationService
    ) { }

    getEnrollments() {
        return {
            message: "All enrollments Fetched ",
            data: []
        }
    }
    
    enrollStudent(studentName: string, courseId: string) {
        const courseDetails = this.courseService.getCourseById(courseId)

        const notification = this.notificationService.sendNotification(studentName, "Welcome to The course !")
        
        return {
            message: "Student enrolled successfully ",
            student: studentName,
            course: courseDetails
            ,alert: notification,
        }
    }


}
