import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormPanelUtils } from '../form-utils/form-utils';
import { HttpService } from 'services/http-service.service';
import { MapDataService } from 'services/map-data.service';
import { metz, charleville } from 'src/app/mock-backend/mock-api';

@Component({
  selector: 'cl-tsp',
  templateUrl: './tsp.component.html',
  styleUrls: ['./tsp.component.scss']
})
export class TspComponent extends FormPanelUtils {

  constructor(private http: HttpService, private mapData: MapDataService) {
    super();
    this.panelForm = new FormGroup({
      villeDepart: new FormControl(undefined, this.inputValidators)
    });
    this.addCity();
  }

  public async onSubmit() {
    this.mapData.resetPaths();
    this.mapData.resetPointersLocations();
    this.mapData.addPath(...await this.http.getTSP([metz, charleville]));
  }
}
