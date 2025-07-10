import {Injectable} from '@angular/core';
import {map, of} from "rxjs";
import {mockedAuthorsList} from "@shared/mocks/mocks";
import {transformAuthor} from "@features/courses/services/transformers/author.transformer";

@Injectable()
export class AuthorsService {

    getAuthors() {
       return of (mockedAuthorsList)
            .pipe(
                map(authors => authors.map(author => transformAuthor(author)))
            )
    }
}