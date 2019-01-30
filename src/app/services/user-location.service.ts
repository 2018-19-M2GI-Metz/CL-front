import { Injectable } from '@angular/core';
import { Place } from 'model/place';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  constructor(private logService: LogService) { }

  public getUserLocation(): Promise<Place> {
    return new Promise((res) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          res(new Place(undefined, undefined, position.coords.latitude, position.coords.longitude));
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
