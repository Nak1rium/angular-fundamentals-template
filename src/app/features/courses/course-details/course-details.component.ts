import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {ICourseWithAuthors} from "@app/interfaces/courses/course-item.interface";
import {ROUTE_NAMES} from "@app/app-routing.module";
import {CoursesStoreService} from "@features/courses/services/courses-store.service";

@Component({
    selector: 'app-course-details',
    templateUrl: './course-details.component.html',
    styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
    private coursesStoreService = inject(CoursesStoreService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    courseId!: string;
    course$!: Observable<ICourseWithAuthors | undefined>;

    ngOnInit(): void {
        this.initCourse();
    }

    initCourse(): void {
        this.courseId = this.route.snapshot.paramMap.get('id')!;
        this.course$ = this.loadCourse(this.courseId);
    }

    loadCourse(id: string): Observable<ICourseWithAuthors | undefined> {
        return this.coursesStoreService.getCourse(id).pipe(
            catchError((error) => this.handleCourseLoadError(error))
        );
    }

    handleCourseLoadError(_error: any): Observable<undefined> {
        alert('Course not found.');
        this.navToCourses();
        return of(undefined);
    }

    navToCourses(): void {
        this.router.navigate([ROUTE_NAMES.COURSES]);
    }
}

