import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {

  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Output() clickEvent = new EventEmitter<void>();

  buttonClickEvent() {
    this.clickEvent.emit();
  }
}
