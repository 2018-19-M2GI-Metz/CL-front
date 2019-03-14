import { Injectable } from '@angular/core';
import { Place } from 'model/place';
import { ReplaySubject, Observable } from 'rxjs';
import { LogService } from 'services/logger/log.service';
import { tap } from 'rxjs/operators';

/**
 * Service permettant la gestion de la position de l'utilisateur
 */
@Injectable({
  providedIn: 'root'
})
export class UserLocationService {
  private userPosition: ReplaySubject<Place>;
  private readonly defaultPlace = new Place(undefined, undefined, 0, 0);

  constructor(private logService: LogService) {
    this.userPosition = new ReplaySubject();
    this.initUserPosition();
  }

  public initUserPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userPosition.next(new Place(undefined, undefined, position.coords.latitude, position.coords.longitude));
      },
        err => {
          this.logService.set("La geolocation n'est pas disponible :", err.message).asWarn().and.log();
          this.userPosition.next(this.defaultPlace);
        });
    } else {
      this.logService.set("La geolocation n'est pas disponible sur ce navigateur").asWarn().and.log();
      this.userPosition.next(this.defaultPlace);
    }
  }

  /**
   * @returns la position de l'utilisateur
   * Si position indisponible Place(undefined, undefined, 0, 0)
   */
  public getUserLocation(): Observable<Place> {
    return this.userPosition.asObservable();
  }
}
