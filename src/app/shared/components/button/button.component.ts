import {Component, Input} from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {fas, IconName} from '@fortawesome/free-solid-svg-icons';

type iconName = 'trash' | 'edit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText?: string;
  @Input() iconName?: iconName;

  get icon(): IconName {
    switch (this.iconName!) {
        case 'trash':
          return 'trash-can';

        case 'edit':
          return 'pencil-alt';
    }
  }
}
