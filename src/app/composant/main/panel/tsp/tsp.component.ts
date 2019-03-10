

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'services/http-service.service';
import { MapDataService } from 'services/map-data.service';
import { FormPanelUtils } from '../form-utils/form-utils';
import { LogService } from 'services/log.service';
@Component({
  selector: 'cl-tsp',
  templateUrl: './tsp.component.html',
  styleUrls: ['./tsp.component.scss']
})
export class TspComponent extends FormPanelUtils implements OnInit {
  constructor(http: HttpService, mapData: MapDataService, logService: LogService) {
    super(http, mapData, logService);
  }
  ngOnInit() {
    super.ngOnInit();
    this.panelForm = new FormGroup({
      villeDepart: new FormControl(undefined, this.inputValidators)
    });
    this.addCity();
  }
  public async onSubmit() {
    super.onSubmit(this.http.getTSP);
  }
}
