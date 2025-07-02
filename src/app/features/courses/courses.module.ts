import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesComponent} from "@features/courses/courses.component";
import {CoursesListComponent} from "@features/courses/courses-list/courses-list.component";
import {SharedModule} from "@shared/shared.module";


@NgModule({
    declarations: [CoursesComponent,CoursesListComponent],
    imports: [CommonModule, SharedModule],
    exports: [CoursesComponent, CoursesListComponent]
})

export class CoursesModule { }