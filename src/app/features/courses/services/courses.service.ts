import {inject, Injectable} from '@angular/core';
import {combineLatest, map, Observable, of} from "rxjs";
import {mockedCoursesList} from "@shared/mocks/mocks";
import {ICourseApi} from "@app/interfaces/courses/api/course-item.api.interface";
import {
    populateCoursesWithAuthors,
    transformCourse
} from "@features/courses/services/transformers/course.transformer";
import {AuthorsService} from "@features/courses/services/authors.service";
import {ICourse, ICourseWithAuthors} from "@app/interfaces/courses/course-item.interfase";

@Injectable()
export class CoursesService {
    authorsService = inject(AuthorsService)

    getCourses() {
        return of(mockedCoursesList)
            .pipe(
                map((courses: ICourseApi[]) => {
                    return courses.map(course => transformCourse(course));
                })
            );
    }

    getCoursesWithAuthors(courses: Observable<ICourse[]> = this.getCourses()): Observable<ICourseWithAuthors[]> {
        return combineLatest([courses, this.authorsService.getAuthors()])
            .pipe(
                map(([courses, authors]): ICourseWithAuthors[] =>
                    populateCoursesWithAuthors(courses, authors)
                )
            );
    }
}