import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesService} from "@features/courses/services/courses.service";
import {catchError, Observable, of} from "rxjs";
import {ICourseWithAuthors} from "@app/interfaces/courses/course-item.interfase";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId!: string;
  coursesService = inject(CoursesService);
  $course!: Observable<ICourseWithAuthors | undefined>;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.$course = this.coursesService.getCourseById(this.courseId).pipe(
        catchError((err)=> {
          alert(err);
          this.navToCourses();
          return of (undefined)})
    );
  }

  navToCourses(): void {
    this.router.navigate(['/courses']);
  }
}

