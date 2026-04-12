import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {

    getAllCourses() {
        return {
            message: "All courses are fetched ",
            data : []  ,  
        }
    }

    getCourseById(id:string) {
        return {
            message: "Course Fetched ",
            id,
        }
    }

    createCourse(name: string, code: string) {
     
     return   {
            message: "Course Created",
            data : { name, code },
    }    
    }

}
