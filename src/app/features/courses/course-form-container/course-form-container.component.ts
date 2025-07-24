import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorsService} from "@features/courses/services/authors.service";
import {IAuthor} from "@app/interfaces/courses/author-item.interface";
import {Observable} from "rxjs";
import {ICourseToCreate, ICourseWithAuthors} from "@app/interfaces/courses/course-item.interfase";
import {CoursesService} from "@features/courses/services/courses.service";
import {ROUTE_NAMES} from "@app/app-routing.module";


@Component({
    selector: 'app-course-form-container',
    templateUrl: './course-form-container.component.html',
    styleUrls: ['./course-form-container.component.css']
})
export class CourseFormContainerComponent implements OnInit {
    authorsService = inject(AuthorsService);
    coursesService = inject(CoursesService);
    courseId?: string | null;
    $allAuthors!: Observable<IAuthor[]>;
    $course?: Observable<ICourseWithAuthors | undefined>;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.courseId = this.route.snapshot.paramMap.get('id');
        this.$allAuthors = this.authorsService.getAuthors();
        if (this.courseId) {
            this.$course = this.coursesService.getCourseById(this.courseId);
        }
    }

    navToCourses(): void {
        this.router.navigate([ROUTE_NAMES.COURSES]);
    }

    createNewAuthor(newAuthor: string) {
        this.authorsService.createNewAuthor(newAuthor);
        this.$allAuthors = this.authorsService.getAuthors();
    }

    deleteAuthor(id: string): void {
        this.authorsService.deleteAuthor(id);
        this.$allAuthors = this.authorsService.getAuthors();
    }

    handleCourse(course: ICourseToCreate): void {
        if (this.courseId) {
            this.coursesService.editCourse(this.courseId,course.title, course.description, course.duration, course.authors)
            this.navToCourses();
            return;
        }
        this.coursesService.createNewCourse(course.title, course.description, course.duration, course.authors)
        this.navToCourses();
    }
}
