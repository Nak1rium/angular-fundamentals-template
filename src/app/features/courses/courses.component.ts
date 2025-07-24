import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ICourseWithAuthors} from "@app/interfaces/courses/course-item.interfase";
import {CoursesService} from "@features/courses/services/courses.service";
import {Router} from "@angular/router";
import {ROUTE_NAMES} from "@app/app-routing.module";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    coursesWithAuthors$!: Observable<ICourseWithAuthors[]>;
    coursesService = inject(CoursesService);
    searchTerm?: string;

    constructor(private router: Router) {

    }

    ngOnInit() {
        this.getCourses();
    }

    getCourses(searchTerm?: string): void {
        this.coursesWithAuthors$ = this.coursesService.getCoursesWithAuthors(searchTerm);
    }

    handleSearch(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.getCourses(searchTerm);
    }

    deleteCourse(courseId: string): void {
        this.coursesService.deleteCourse(courseId);
        this.getCourses()
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
