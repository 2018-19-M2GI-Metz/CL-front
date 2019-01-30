import { Component, Input, forwardRef, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpService } from 'services/http-service.service';
import { MapDataService } from 'services/map-data.service';
import { Place } from 'model/place';
import { UserLocationService } from 'services/user-location.service';

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
  @Input() cities: Place[];
  @Output() onInputRemove: EventEmitter<string> = new EventEmitter();
  public filtered_cities: Promise<Place[]>;
  private valueChanges: Subject<string> = new Subject();
  private propagateChange = (_: any) => { };

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onInputChange(val);
    this.notifyChange();
  }

  constructor(private http: HttpService, private userLocationService: UserLocationService) { }

  public writeValue(val: string) {
    this.value = val;
  }

  public registerOnChange(fn: (val: string) => void) {
    this.propagateChange = fn;
  }

  public registerOnTouched() { }

  public removeInput() {
    this.onInputRemove.emit(this.formControlName);
  }

  private notifyChange() {
    this.valueChanges.next(this._value);
    this.propagateChange(this._value);
  }

  public onInputChange(value: string) {
    if (value) {
      this.filtered_cities = this.filterCities(value.toLowerCase());
    } else {
      this.filtered_cities = Promise.resolve([]);
    }
  }

  private filterCities(value: string): Promise<Place[]> {
    return this.http.search(value);
  }

  public async getUserLocation() {
    const nearestPoint: Place = await this.http.getNearestPosition(await this.userLocationService.getUserLocation());
    this.value = (await this.http.search(nearestPoint.name))[0].name;
  }
}
