import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'services/http-service.service';
import { MapDataService } from 'services/map-data.service';
import { FormPanelUtils } from '../form-utils/form-utils';

@Component({
  selector: 'cl-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent extends FormPanelUtils implements OnInit {

  constructor(http: HttpService, mapData: MapDataService) {
    super(http, mapData);
  }

  ngOnInit() {
    super.ngOnInit();
    this.panelForm = new FormGroup({
      villeDepart: new FormControl(undefined, this.inputValidators),
      villeArrivee: new FormControl(undefined, this.inputValidators)
    });
  }

  public async onSubmit() {
    super.onSubmit(this.http.getPath);
  }
}
