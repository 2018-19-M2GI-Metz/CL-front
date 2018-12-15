import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormPanelUtils } from '../form-utils/form-utils';
import { HttpService } from 'services/http-service.service';
import { metz, charleville } from 'src/app/mock-backend/mock-api';
import { DrawerService } from 'services/drawer.service';
import { MapDataService } from 'services/map-data.service';

@Component({
  selector: 'cl-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent extends FormPanelUtils {

  constructor(private http: HttpService, private mapData: MapDataService) {
    super();
    this.panelForm = new FormGroup({
      villeDepart: new FormControl(undefined, this.inputValidators),
      villeArrivee: new FormControl(undefined, this.inputValidators)
    });
  }

  public async onSubmit() {
    this.mapData.resetPaths();
    this.mapData.resetPointersLocations();
    this.mapData.addPath(...await this.http.getPath([metz, charleville]));
  }
}
