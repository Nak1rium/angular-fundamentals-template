import {IAuthor} from "@app/interfaces/courses/author-item.interface";

export interface ICourse extends ICourseBase {
    authors: string[];
}

interface ICourseBase {
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
}

export interface ICourseWithAuthors extends ICourseBase {
    authors: IAuthor[];
}