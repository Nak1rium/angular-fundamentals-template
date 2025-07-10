import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ICourseWithAuthors} from "@app/interfaces/courses/course-item.interfase";
import {CoursesService} from "@features/courses/services/courses.service";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
    coursesWithAuthors$!: Observable<ICourseWithAuthors[]>
    coursesService = inject(CoursesService)

    ngOnInit() {
        this.getCourses();
    }

    getCourses() {
        this.coursesWithAuthors$ = this.coursesService.getCoursesWithAuthors();
    }
}
