import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'cl-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent implements OnInit {
  public gpsForm: FormGroup;
  public villesSupp: string[] = [];
  public inputValidators: ValidatorFn[];

  constructor() {
    this.inputValidators = [Validators.required, Validators.minLength(1)];
    this.gpsForm = new FormGroup({
      villeDepart: new FormControl(undefined, this.inputValidators),
      villeArrivee: new FormControl(undefined, this.inputValidators)
    });
  }

  ngOnInit() {
  }

  public onSubmit() {

  }

  addCity() {
    const formControlName = `city-${this.villesSupp.length}`;
    this.villesSupp.push(formControlName);
    this.gpsForm.addControl(formControlName, new FormControl(undefined, this.inputValidators));
  }

  removeCitySupp(event) {
    event.preventDefault();
    const cityControlName = this.villesSupp[this.villesSupp.length - 1];
    this.villesSupp = this.villesSupp.filter(v => v !== cityControlName);
    this.gpsForm.removeControl(cityControlName);
  }
}
