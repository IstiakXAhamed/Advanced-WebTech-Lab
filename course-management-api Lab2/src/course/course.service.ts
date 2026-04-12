import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    getAllCourses(){
        return {
            message: "All Courses fetched Successfully !",
            data : [ ],
        }
    }
        
    getCourseById(id: string) {
        return  {
            message: "Course fetched Successfully ",
            id,
        }
    }

    createCourse(dto : CreateCourseDto){
        return {
            message: "Course Created Successfully ",
            data: dto, //we are returning the whole dto course details here 
        }
    }

    updateCourse(id: string,dto : UpdateCourseDto){
        return {
            message: "Course Updated Successfully ",
            id, 
            data : dto,
        }
    }

    patchCourse(id: string, dto : UpdateCourseDto) {
        return {
            message: "Course patched successfully ",
            id,
            updatedFields: Object.keys(dto),
        }
    }

    deleteCourse(id: string) {
        return {
            message: "Course deleted Successfully ",
            id , 
        } 
    
    }

    uploadCourseMaterial(id: string, file: Express.Multer.File) {
        return {
            
            message: "Material uploaded Successfully ",
            courseId: id,
            filename: file.filename,
            path : file.path,
        }

    }
}
