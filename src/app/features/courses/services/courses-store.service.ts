import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, finalize, map, Observable, tap} from "rxjs";
import {ICourseWithAuthors, newCourse} from "@app/interfaces/courses/course-item.interface";
import {IAuthor, INewAuthor} from "@app/interfaces/courses/author-item.interface";
import {CoursesApiService} from "./api/courses.api.service";
import {AuthorsApiService} from "./api/authors.api.service";
import {mapCoursesWithAuthors, mapCourseWithAuthors} from "@features/courses/services/transformers/course.transformer";
import {transformAuthor, transformAuthors} from "@features/courses/services/transformers/author.transformer";

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<ICourseWithAuthors[]>([]);
    private authors$$ = new BehaviorSubject<IAuthor[]>([]);

    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
    public courses$: Observable<ICourseWithAuthors[]> = this.courses$$.asObservable();
    public authors$: Observable<IAuthor[]> = this.authors$$.asObservable();

    get courses(): ICourseWithAuthors[] {
        return this.courses$$.getValue();
    }

    get authors(): IAuthor[] {
        return this.authors$$.getValue();
    }

    coursesApiService = inject(CoursesApiService);
    authorsApiService = inject(AuthorsApiService);

    getCourses(title?: string): void {
        this.isLoading$$.next(true);

        const request = title ? this.coursesApiService.getFilteredCourses(title) : this.coursesApiService.getAllCourses();

        request.pipe(
            map((coursesApi) => mapCoursesWithAuthors(coursesApi, this.authors)),
            tap(courses => this.courses$$.next(courses)),
            finalize(() => this.isLoading$$.next(false))
        ).subscribe();
    }

    createCourse(course: newCourse): void {
        this.isLoading$$.next(true);

        this.coursesApiService.addCourse(course)
            .pipe(
                map(courseApi => mapCourseWithAuthors(courseApi, this.authors)),
                tap(courseWithAuthors => this.addCourse(this.courses$$, courseWithAuthors)),
                finalize(() => this.isLoading$$.next(false))
            ).subscribe();
    }

    editCourse(id: string, course: newCourse): void {
        this.isLoading$$.next(true);

        this.coursesApiService.editCourse(id, course)
            .pipe(
                map(courseApi => mapCourseWithAuthors(courseApi, this.authors)),
                tap(courseWithAuthors => this.updateCourse(this.courses$$, courseWithAuthors)),
                finalize(() => this.isLoading$$.next(false))
            ).subscribe();
    }

    getCourse(id: string): Observable<ICourseWithAuthors> {
        this.isLoading$$.next(true);

        return this.coursesApiService.getCourseById(id)
            .pipe(
                map(courseApi => mapCourseWithAuthors(courseApi, this.authors)),
                finalize(() => this.isLoading$$.next(false))
            );
    }

    deleteCourse(id: string): void {
        this.isLoading$$.next(true);

        this.coursesApiService.deleteCourse(id)
            .pipe(
                tap(() => this.deleteCourseLocal(this.courses$$, id)),
                finalize(() => this.isLoading$$.next(false))
            ).subscribe();
    }

    getAllAuthors(): void {
        this.authorsApiService.getAllAuthors()
            .pipe(
                map(transformAuthors),
                tap(authors => this.authors$$.next(authors))
            ).subscribe();
    }

    createAuthor(author: INewAuthor): void {
        this.authorsApiService.createAuthor(author)
            .pipe(
                map(response => transformAuthor(response.result)),
                tap(newAuthor => this.addAuthor(this.authors$$, newAuthor))
            )
            .subscribe();
    }

    deleteAuthor(id: string): void {
        this.authorsApiService.deleteAuthor(id)
            .pipe(
                tap(() => this.deleteAuthorLocal(this.authors$$, id))
            )
            .subscribe();
    }

    addAuthor(authorsSubject: BehaviorSubject<IAuthor[]>, newAuthor: IAuthor): void {
        const current = authorsSubject.getValue();
        authorsSubject.next([...current, newAuthor]);
    }

    addCourse(coursesSubject: BehaviorSubject<ICourseWithAuthors[]>, course: ICourseWithAuthors): void {
        const current = coursesSubject.getValue();
        coursesSubject.next([...current, course]);
    }

    deleteAuthorLocal(authorsSubject: BehaviorSubject<IAuthor[]>, id: string): void {
        const updated = authorsSubject.getValue().filter(author => author.id !== id);
        authorsSubject.next(updated);
    }

    deleteCourseLocal(coursesSubject: BehaviorSubject<ICourseWithAuthors[]>, id: string): void {
        const filtered = coursesSubject.getValue().filter(course => course.id !== id);
        coursesSubject.next(filtered);
    }

    updateCourse(coursesSubject: BehaviorSubject<ICourseWithAuthors[]>, updatedCourse: ICourseWithAuthors): void {
        const updatedList = coursesSubject.getValue().map(course =>
            course.id === updatedCourse.id ? updatedCourse : course
        );
        coursesSubject.next(updatedList);
    }
}
