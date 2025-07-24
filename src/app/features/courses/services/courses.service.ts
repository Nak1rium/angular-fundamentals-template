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
import {filterByTitle} from "@features/courses/services/helpers/filter-by-title.helper";
import {generateId} from "@features/courses/services/helpers/generate-id.helper";
import {getCurrentDate} from "@features/courses/services/helpers/date.helper";
import {IAuthor} from "@app/interfaces/courses/author-item.interface";

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

    getCoursesWithAuthors(searchTerm?: string, courses: Observable<ICourse[]> = this.getCourses()): Observable<ICourseWithAuthors[]> {
        return combineLatest([courses, this.authorsService.getAuthors()])
            .pipe(
                map(([courses, authors]): ICourseWithAuthors[] => {
                        const populatedCourses = populateCoursesWithAuthors(courses, authors);
                        return searchTerm ? filterByTitle(populatedCourses, searchTerm) : populatedCourses;
                    }
                )
            );
    }

    deleteCourse(id: string) {
        const index = mockedCoursesList.findIndex(course => course.id === id);
        mockedCoursesList.splice(index, 1);
    }

    getCourseById(id: string): Observable<ICourseWithAuthors | undefined> {
        const coursesWithAuthors = this.getCoursesWithAuthors();
        return coursesWithAuthors.pipe(
            map(courses => {
                const course = courses.find(course => course.id === id)
                if (!course) {
                    throw new Error('not found')
                }
                return course;
            })
        );
    }

    createNewCourse(
        title: string,
        description: string,
        duration: number,
        authors: IAuthor[]
    ): void {
        const newCourse = {
            id: generateId(),
            title,
            description,
            creationDate: getCurrentDate(),
            duration,
            authors:  authors.map(author => author.id)
        };
        mockedCoursesList.push(newCourse);
    }

    editCourse(id: string, title: string, description: string, duration: number, authors: IAuthor[]): void {
        const index = mockedCoursesList.findIndex(course => course.id === id);

        const updatedFields = {
            title,
            description,
            duration,
            authors:  authors.map(author => author.id)
        }

        mockedCoursesList[index] = {
            ...mockedCoursesList[index],
            ...updatedFields,
        };
    }
}