import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'services/http/http-service.service';
import { MapDataService } from 'services/map/map-data.service';
import { FormPanelUtils } from '../form-utils/form-utils';
import { LogService } from 'services/logger/log.service';

/**
 * Composant permettant le calcul gps d'un chemin
 */
@Component({
  selector: 'cl-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent extends FormPanelUtils implements OnInit {
  @Input() current: number;
  public tabNumber = 0;

  constructor(http: HttpService, mapData: MapDataService, logService: LogService) {
    super(http, mapData, logService);
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
