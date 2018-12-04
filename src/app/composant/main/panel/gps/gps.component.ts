import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormPanelUtils } from '../form-utils/form-utils';

@Component({
  selector: 'cl-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent extends FormPanelUtils {

  constructor() {
    super();
    this.panelForm = new FormGroup({
      villeDepart: new FormControl(undefined, this.inputValidators),
      villeArrivee: new FormControl(undefined, this.inputValidators)
    });
  }

  public onSubmit() {

  }
}
