import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cl-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() disabled = false;
  @Input() removeButton = false;
  @Input() _value: string;
  @Input() formControlName: string;
  @Output() onInputRemove: EventEmitter<string> = new EventEmitter();
  private propagateChange = (_: any) => { };

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.propagateChange(this._value);
  }

  writeValue(val: string) {
    this._value = val;
    this.propagateChange(this._value);
  }

  registerOnChange(fn: (val: string) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  removeInput() {
    this.onInputRemove.emit(this.formControlName);
  }
}
