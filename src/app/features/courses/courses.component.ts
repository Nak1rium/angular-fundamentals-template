import {Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable, of} from "rxjs";
import {ICourse, ICourseWithAuthors} from "@app/interfaces/courses/course-item.interfase";
import {mockedCoursesList, mockedAuthorsList} from "@shared/mocks/mocks";
import {ICourseApi} from "@app/interfaces/courses/api/course-item.api.interface";
import {IAuthor} from "@app/interfaces/courses/author-item.interface";
import {IAuthorApi} from "@app/interfaces/courses/api/author-item.api.interface";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  coursesWithAuthors$!: Observable<ICourseWithAuthors[]>
  authors$!: Observable<IAuthor[]>

  ngOnInit() {
    this.getAuthors()
    this.getCourses()
  }

  getCourses() {
    const courses = of(mockedCoursesList)
        .pipe(
            map((courses: ICourseApi[]) => {
              return courses.map(course => this.transformCourse(course));
            })
        );
    this.coursesWithAuthors$ = combineLatest([courses,this.authors$])
    .pipe(
        map(([courses,authors])=>{
          return courses.map(course => {
            const authorItems = course.authors.map(authorId => authors.find(author => author.id === authorId)!).filter(Boolean);
            return {
              ...course,
              authors: authorItems
            }
          })
        })
    );
  }

  transformCourse(course: ICourseApi): ICourse {
    return {
      title: course.title,
      description: course.description,
      creationDate: new Date (course.creationDate),
      duration: course.duration,
      authors: course.authors
    }
  }

  getAuthors() {
    this.authors$ = of(mockedAuthorsList)
        .pipe(
          map(authors => authors.map(author => this.transformAuthor(author)))
        )
  }

  transformAuthor(author: IAuthorApi): IAuthor {
    return {
      id: author.id,
      name: author.name
    }
  }

}
