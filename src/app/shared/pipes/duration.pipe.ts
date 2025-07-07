import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'duration'
})

export class DurationPipe implements PipeTransform {
    transform(number: number): string {
        const hours = Math.floor(number / 60);
        const minutes = number % 60;
        return  `${hours}:${minutes}` + ' hours'
    }
}



