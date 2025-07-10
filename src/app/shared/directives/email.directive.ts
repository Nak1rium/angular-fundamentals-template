import { Directive } from "@angular/core";
import {NG_VALIDATORS} from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true
        }
    ]
})
export class EmailValidatorDirective {
    // Add your code here
}
