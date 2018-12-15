import { Injectable } from '@angular/core';
import { Position } from 'model/position';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  constructor(private logService: LogService) { }

  public getUserLocation(): Promise<Position> {
    return new Promise((res) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          res(new Position(undefined, position.coords.latitude, position.coords.longitude));
        },
          err => {
            this.logService.set("La geolocation n'est pas disponible :", err.message).asWarn().and.log();
            res(undefined);
          });
      } else {
        this.logService.set("La geolocation n'est pas disponible sur ce navigateur").asWarn().and.log();
        res(undefined);
      }
    });
  }
}
