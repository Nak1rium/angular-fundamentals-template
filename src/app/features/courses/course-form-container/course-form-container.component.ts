import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IAuthor} from "@app/interfaces/courses/author-item.interface";
import {Observable} from "rxjs";
import {ICourseWithAuthors, newCourse} from "@app/interfaces/courses/course-item.interface";
import {ROUTE_NAMES} from "@app/app-routing.module";
import {CoursesStoreService} from "@features/courses/services/courses-store.service";

@Component({
    selector: 'app-course-form-container',
    templateUrl: './course-form-container.component.html',
    styleUrls: ['./course-form-container.component.css']
})
export class CourseFormContainerComponent implements OnInit {
    private coursesStoreService = inject(CoursesStoreService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    courseId?: string | null;
    allAuthors$!: Observable<IAuthor[]>;
    course$?: Observable<ICourseWithAuthors | undefined>;

    ngOnInit() {
        this.handleDataInitialization();
    }

     handleDataInitialization(): void {
        this.courseId = this.route.snapshot.paramMap.get('id');
        if (!this.coursesStoreService.authors.length) {
            this.coursesStoreService.getAllAuthors();
        }
        this.allAuthors$ = this.coursesStoreService.authors$;
        if (this.courseId) {
            this.course$ = this.coursesStoreService.getCourse(this.courseId);
        }
    }

    navToCourses(): void {
        this.router.navigate([ROUTE_NAMES.COURSES]);
    }

    createNewAuthor(newAuthor: string) {
        this.coursesStoreService.createAuthor({name: newAuthor});
    }

    deleteAuthor(id: string): void {
        this.coursesStoreService.deleteAuthor(id);
    }

    handleCourse(course: newCourse): void {
        if (this.courseId) {
            this.coursesStoreService.editCourse(this.courseId, course)
            this.navToCourses();
            return;
        }
        this.coursesStoreService.createCourse(course);
        this.navToCourses();
    }
}
