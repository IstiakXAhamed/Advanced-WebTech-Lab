import { CreateCourseDto } from './create-course.dto';

describe('CreateCourseDtoTs', () => {
  it('should be defined', () => {
    expect(new CreateCourseDto()).toBeDefined();
  });
});
