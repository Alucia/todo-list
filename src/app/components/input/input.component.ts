import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export enum ETypeControlInput {
  TEXT = 'text',
  PASSWORD = 'password',
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

  isPassword = false;
  private _typeControl = ETypeControlInput.TEXT;
  @Input('typeControl')
  get typeControl(): ETypeControlInput {
    return this._typeControl;
  }
  set typeControl(typeControl: ETypeControlInput) {
    if (typeControl) {
      this._typeControl = typeControl;

      if (typeControl === ETypeControlInput.PASSWORD) {
        this.iconName = 'visibility_off';
        this.isPassword = true;
      }
    }
  }

  private _error = '';
  @Input('error')
  get error() {
    return this._error;
  }
  set error(error: string) {
    this._error = error;
  }

  @Input() type = '';
  @Input() maxlength = '';
  @Input() label = '';
  @Input() disabled = false;
  @Input() showIcon = false;
  @Input() iconName: string = '';
  @Input() showError = false;
  @Input() requiredInput = false;
  @Input() isCurrency = false;
  @Input() isCopy = false;
  @Output() blur = new EventEmitter<string>();
  @Output() input = new EventEmitter<string>();
  @Output() clickEvent = new EventEmitter<void>();
  @Output() clickCopyEvent = new EventEmitter<string>();
  currentValue = '';
  viewError = false;
  isCopied = false;
  typeControlInput = ETypeControlInput;

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

  blurEvent(value: any) {
    this.blur.emit(value);
  }

  iconEyeClick() {
    if (this.typeControl === ETypeControlInput.TEXT) {
      this.typeControl = ETypeControlInput.PASSWORD;
      this.iconName = 'visibility_off';
    } else {
      this.typeControl = ETypeControlInput.TEXT;
      this.iconName = 'visibility';
    }
  }

  validateOutFocus() {
    if ((this.currentValue === '' || this.currentValue === null) && this.error !== '') {
      this.showError = true;
      this.requiredInput = false;
    }
  }

  inputClicked() {
    this.clickEvent.emit();
  }

}
