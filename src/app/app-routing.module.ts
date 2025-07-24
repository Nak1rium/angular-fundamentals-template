import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";

export namespace ROUTE_NAMES {
    export const COURSES = 'courses';
}

export const routes: Routes = [
    /* Add your code here */
    {
        path: ROUTE_NAMES.COURSES,
        loadChildren: () => import('@features/courses/courses.module').then((m) => m.CoursesModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_NAMES.COURSES,
    },
    {
        path: '**',
        redirectTo: ROUTE_NAMES.COURSES,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}