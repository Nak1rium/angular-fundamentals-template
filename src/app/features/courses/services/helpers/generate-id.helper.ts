import {mockedAuthorsList, mockedCoursesList} from "@app/shared/mocks/mocks";

const existingIds = new Set([
    ...mockedAuthorsList.map(author => author.id),
    ...mockedCoursesList.map(course => course.id)
]);

export function generateId (): string{
    let id: string;
    do {
        id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            const rand = Math.random() * 16 | 0;
            const value = char === 'x' ? rand : (rand & 0x3 | 0x8);
            return value.toString(16);
        });
    } while (existingIds.has(id));
    return id;
}