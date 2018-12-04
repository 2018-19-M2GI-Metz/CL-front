import { Injectable } from '@angular/core';
import { Position } from 'model/position';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  public getUserLocation(): Promise<Position> {
    return new Promise((res) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          res(new Position(undefined, position.coords.latitude, position.coords.longitude));
        });
      } else {
        console.info("La geolocation n'est pas disponible");
        res(undefined);
      }
    });
  }
}
