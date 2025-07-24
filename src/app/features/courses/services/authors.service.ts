import {Injectable} from '@angular/core';
import {map, of} from "rxjs";
import {mockedAuthorsList} from "@shared/mocks/mocks";
import {transformAuthor} from "@features/courses/services/transformers/author.transformer";
import {generateId} from "@features/courses/services/helpers/generate-id.helper";

@Injectable()
export class AuthorsService {

    getAuthors() {
       return of (mockedAuthorsList)
            .pipe(
                map(authors => authors.map(author => transformAuthor(author)))
            )
    }

    createNewAuthor(name: string): void {
        const newAuthor = {
            id: generateId(),
            name,
        };
        mockedAuthorsList.push(newAuthor);
    }

    deleteAuthor(id: string) {
        const index = mockedAuthorsList.findIndex(author => author.id === id);
        mockedAuthorsList.splice(index, 1);
    }
}