import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum ETypeControlInput {
  TEXT = 'text',
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {

  @Input() type = '';
  @Input() typeControl: ETypeControlInput = ETypeControlInput.TEXT;
  @Input() maxlength = '';
  @Input() label = '';
  @Input() disabled = false;
  currentValue = '';

  private onChange = (_value: string) => { };
  private onTouched = () => { };

  writeValue(value: string): void {
    this.currentValue = value;
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: (_value: string) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  valueChange(value: string) {
    if (!this.disabled) {
      this.writeValue(value);
    }
  }

}
