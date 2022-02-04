import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {

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
