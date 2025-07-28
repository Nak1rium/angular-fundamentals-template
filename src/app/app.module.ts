import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '@shared/shared.module';
import {AppComponent} from '@app/app.component';
import {NotAuthorizedGuard} from '@app/auth/guards/not-authorized.guard';
import {AuthorizedGuard} from '@app/auth/guards/authorized.guard';
import {CoursesStoreService} from '@app/services/courses-store.service';
import {CoursesService} from '@app/services/courses.service';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "@app/app-routing.module";

const services = [
    CoursesService,
    CoursesStoreService
]

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        FontAwesomeModule,
        RouterOutlet,
        AppRoutingModule
    ],
  providers: [AuthorizedGuard, NotAuthorizedGuard, services],
  bootstrap: [AppComponent],
})
export class AppModule {}
