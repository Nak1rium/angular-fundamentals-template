import {ICourseWithAuthors} from "@app/interfaces/courses/course-item.interfase";

export function filterByTitle(populatedCourses: ICourseWithAuthors[], searchTerm: string): ICourseWithAuthors[] {
    return populatedCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}