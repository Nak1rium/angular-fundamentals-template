import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CoursesComponent} from "@features/courses/courses.component";
import {CourseDetailsComponent} from "@features/courses/course-details/course-details.component";
import {CourseFormContainerComponent} from "@features/courses/course-form-container/course-form-container.component";

export const routes: Routes = [
    {
        path: '',
        component: CoursesComponent,
    },
    {
        path: 'add',
        component: CourseFormContainerComponent,
    },
    {
        path: ':id',
        component: CourseDetailsComponent,
    },
    {
        path: 'edit/:id',
        component: CourseFormContainerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoursesRoutingModule {}