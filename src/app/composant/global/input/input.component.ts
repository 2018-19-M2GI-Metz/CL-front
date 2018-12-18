import { Component, Input, forwardRef, Output, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { City } from 'model/city';
import { startWith, map } from 'rxjs/operators';
import { HttpService } from 'services/http-service.service';
import { MapDataService } from 'services/map-data.service';
import { Position } from 'model/position';

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
  @Input() removeButton = false;
  @Input() _value: string;
  @Input() formControlName: string;
  @Input() cities: City[];
  @Output() onInputRemove: EventEmitter<string> = new EventEmitter();
  public filtered_cities: Observable<City[]>;
  private valueChanges: Subject<string> = new Subject();
  private propagateChange = (_: any) => { };

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.notifyChange();
  }

  constructor(private http: HttpService, private mapData: MapDataService) { }

  public writeValue(val: string) {
    this._value = val;
    this.notifyChange();
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

  public ngOnInit() {
    this.filtered_cities = this.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCities(value.toLowerCase()))
    );
  }

  private filterCities(value: string): City[] {
    if (this.cities) {
      return this.cities.filter(city => city.name.toLowerCase().indexOf(value) === 0);
    }
  }

  public async getUserLocation() {
    const nearestPoint: Position = await this.http.getNearestPosition(this.mapData.userPosition);
    this.value = this.cities.find((city: City) => city.position.lat === nearestPoint.lat && city.position.lon === nearestPoint.lon).name;
  }
}
