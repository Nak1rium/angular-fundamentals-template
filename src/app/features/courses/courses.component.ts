import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ROUTE_NAMES} from "@app/app-routing.module";
import {UserStoreService} from "@app/user/services/user-store.service";
import {CoursesStoreService} from "@features/courses/services/courses-store.service";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    private userService = inject(UserStoreService);
    private router = inject(Router);
    private coursesStoreService = inject(CoursesStoreService);

    coursesWithAuthors$ = this.coursesStoreService.courses$;
    searchTerm?: string;
    enabled$ = this.userService.isAdmin$;
    isLoading$ = this.coursesStoreService.isLoading$;

    ngOnInit() {
        this.handleDataInitialization();
    }

    handleDataInitialization(): void {
        if (!this.coursesStoreService.authors.length) {
            this.coursesStoreService.getAllAuthors();
        }

        if (!this.coursesStoreService.courses.length) {
            this.getCourses();
        }
    }

    getCourses(searchTerm?: string): void {
        this.coursesStoreService.getCourses(searchTerm);
    }

    handleSearch(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.getCourses(searchTerm);
    }

    deleteCourse(courseId: string): void {
        this.coursesStoreService.deleteCourse(courseId);
    }

    editCourse(courseId: string): void {
        this.navigateToCourseForm(courseId);
    }

    showCourse(courseId: string): void {
        this.router.navigate([ROUTE_NAMES.COURSES, courseId]);
    }

    navigateToCourseForm(courseId?: string): void {
        courseId ? this.router.navigate([ROUTE_NAMES.COURSES, 'edit', courseId]) : this.router.navigate([ROUTE_NAMES.COURSES, 'add']);
    }
}
