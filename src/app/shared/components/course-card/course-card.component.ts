import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
 @Input({required: true}) title!: string;
 @Input({required: true}) description!: string;
 @Input({required: true}) creationDate!: Date;
 @Input({required: true}) duration!: number;
 @Input({required: true}) authors!: string[];
 @Input({required: true}) editable?: boolean;

 @Output() clickOnShow = new EventEmitter();
}
