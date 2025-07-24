import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationFormComponent {
  submitted = false;
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  //Todo remove from this component
  getErrorMessage(controlName: string): string | null {
    const control = this.registrationForm.get(controlName);

    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required.';
      }

      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Minimum ${requiredLength} characters required.`;
      }

      if (control.errors['invalidEmail']) {
        return 'Email format is invalid.';
      }
    }
    return null;
  }

  //Todo remove from this component
  shouldShowError(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }
}
