import {Component, EventEmitter, Input, Output} from '@angular/core';

interface course {
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
  editable: boolean;
}

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses!: course[];
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();
}
