import {ICourseApi} from "@app/interfaces/courses/api/course-item.api.interface";
import {ICourse, ICourseWithAuthors} from "@app/interfaces/courses/course-item.interfase";
import {IAuthor} from "@app/interfaces/courses/author-item.interface";

export function transformCourse(course: ICourseApi): ICourse {
    return {
        title: course.title,
        description: course.description,
        creationDate: new Date (course.creationDate),
        duration: course.duration,
        authors: course.authors
    }
}

export function populateCoursesWithAuthors(courses: ICourse[], authors: IAuthor[]): ICourseWithAuthors[] {
    return courses.map(course => {
        const authorItems = course.authors.map(authorId => authors.find(author => author.id === authorId)!).filter(Boolean);
        return {
            ...course,
            authors: authorItems
        }
    })
}