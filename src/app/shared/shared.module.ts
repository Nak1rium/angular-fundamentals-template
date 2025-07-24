import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent
} from "./components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import {DurationPipe} from "@shared/pipes/duration.pipe";

const directives = [
  EmailValidatorDirective
];

const pipes = [
  DurationPipe,
  CustomDatePipe
];

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent
];

@NgModule({
  declarations: [components,pipes,directives],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  exports: [components, pipes]
})
export class SharedModule { }
