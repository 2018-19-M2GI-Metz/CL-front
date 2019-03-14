import { Injectable } from '@angular/core';
import { Path } from 'model/path';
import { Place } from 'model/place';
import { Subject } from 'rxjs';

/**
 * Service qui permet la liaison entre la map et les panels
 */
@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  public paths: Path[] = [];
  public pointersLocation: Place[] = [];
  private change: Subject<any> = new Subject();
  private cityPushed: Subject<any> = new Subject();

  /**
   * Ajoute un ou plusieurs chemin à dessiner
   * @param paths - chemin(s) a ajouter
   */
  public addPath(...paths: Path[]) {
    this.paths.push(...paths);
    if (paths.length === 1) {
      this.addPointersLocations(paths[0].startPlace, paths[0].endPlace);
    } else {
      this.addPointersLocations(...paths.map(p => p.startPlace));
      if (paths[0].startPlace.id !== paths[paths.length - 1].endPlace.id) {
        this.addPointersLocations(paths[paths.length - 1].endPlace);
      }
    }
    this.notify();
  }



  private addPointersLocations(...positions: Place[]) {
    this.pointersLocation.push(...positions);
    this.notify();
  }

  /**
   * Supprime toutes les données de la précédente recherche.
   */
  public resetAll() {
    this.resetPaths();
    this.resetPointersLocations();
  }

  private resetPaths() {
    this.paths = [];
    this.notify();
  }

  private resetPointersLocations() {
    this.pointersLocation = [];
    this.notify();
  }

  /**
   * Permet d'écouter n'importe quel changement dans les données liées a la carte
   */
  public onChange() {
    return this.change.asObservable();
  }

  private notify() {
    this.change.next();
  }

  /**
   * Permet d'écouter une sélection d'une ville depuis la carte
   */
  public onCityPushed() {
    return this.cityPushed.asObservable();
  }

  /**
   * Ajouter une nouvelle ville en sélection
   * @param city à selectionner
   */
  public pushCity(city: Place) {
    this.cityPushed.next(city);
  }
}
