import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '@shared/shared.module';
import {AppComponent} from '@app/app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "@app/app-routing.module";
import {CoreModule} from "@app/core/core-module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthModule} from "@auth/auth.module";
import {TokenInterceptor} from "@auth/interceptors/token.interceptor";


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        FontAwesomeModule,
        RouterOutlet,
        AppRoutingModule,
        CoreModule,
        HttpClientModule,
        AuthModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
