import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesComponent} from "@features/courses/courses.component";
import {CoursesListComponent} from "@features/courses/courses-list/courses-list.component";
import {SharedModule} from "@shared/shared.module";
import {AuthorsToNamesPipe} from "@features/courses/pipes/authors-to-names.pipe";

@NgModule({
    declarations: [CoursesComponent,CoursesListComponent,AuthorsToNamesPipe],
    imports: [CommonModule, SharedModule],
    exports: [CoursesComponent, CoursesListComponent]
})

export class CoursesModule { }