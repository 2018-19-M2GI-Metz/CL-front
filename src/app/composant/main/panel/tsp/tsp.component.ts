import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormPanelUtils } from '../form-utils/form-utils';

@Component({
  selector: 'cl-tsp',
  templateUrl: './tsp.component.html',
  styleUrls: ['./tsp.component.scss']
})
export class TspComponent extends FormPanelUtils {

  constructor() {
    super();
    this.panelForm = new FormGroup({
      villeDepart: new FormControl(undefined, this.inputValidators)
    });
    this.addCity();
  }

  public onSubmit() {

  }
}
