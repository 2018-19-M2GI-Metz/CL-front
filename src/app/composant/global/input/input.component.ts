import { Component, OnInit, Input, forwardRef } from '@angular/core';
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
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() disabled = false;
  @Input() _value: string;
  private propagateChange = (_: any) => { };

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.propagateChange(this._value);
  }

  constructor() { }

  ngOnInit() {
  }

  writeValue(val: string) {
    this._value = val;
    this.propagateChange(this._value);
  }

  registerOnChange(fn: (val: string) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

}
