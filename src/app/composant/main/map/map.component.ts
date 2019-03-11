import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import * as mappaMundi from 'mappa-mundi';
import { Place } from 'model/place';
import { UserLocationService } from 'services/user-location.service';
import { DrawerService } from 'services/drawer.service';
import { MapDataService } from 'services/map-data.service';
import { Subscription } from 'rxjs';
import { HttpService } from 'services/http-service.service';

const KEY = 'pk.eyJ1IjoiZGFuaWVscGF5ZXQiLCJhIjoiY2pvem1leGF0Mm1hOTN3cGhmbHM0b3p2ayJ9.s0Gdr8eabQi56tHONKv1Sg';

@Component({
  selector: 'cl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private userLocationService: UserLocationService,
    private drawerService: DrawerService,
    private mapData: MapDataService,
    private renderer: Renderer2,
    private http: HttpService
  ) {
    this.mappa = new mappaMundi('Mapbox', KEY);
  }
  @ViewChild("map") canvas: ElementRef;
  @ViewChild("container") container: ElementRef;
  @ViewChild("popup") popup: ElementRef;
  @ViewChild("popupValue") popupValue: ElementRef;

  private map;
  private positions: Place[] = [];
  private userPosition: Place;
  private canvasTmp: ElementRef;
  private mapDataOnChange: Subscription;
  private zoomState: number = undefined;
  private positionMapState: Place = undefined;
  private mappa;

  private mapMouseClickState: undefined | "mouseDown" | "mouseMove";

  private popupPosition: { lat: number, lng: number };
  private popupCity: Place;

  async ngOnInit() {
    this.canvasTmp = this.canvas;
    await this.initMap();
    this.drawMap();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.map) {
      this.zoomState = this.map.zoom();
      const position = this.map.fromPointToLatLng(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
      this.positionMapState = new Place(undefined, "current_Position", position.lat, position.lng);
      this.mapDataOnChange.unsubscribe();
      this.map.onChange(() => { });
    }
    for (const child of this.container.nativeElement.children) {
      this.renderer.removeChild(this.container.nativeElement, child);
    }
    this.canvas = this.canvasTmp;
    try {
      this.renderer.removeChild(document.getElementsByTagName("body").item(0), document.getElementById("Mapbox"));
    } catch (e) { }
    this.renderer.appendChild(this.container.nativeElement, this.canvas.nativeElement);
    this.ngOnInit();
  }

  initMouseEvent() {
    this.renderer.listen(this.container.nativeElement, 'mousedown', () => {
      this.mapMouseClickState = "mouseDown";
    });
    this.renderer.listen(this.container.nativeElement, 'mousemove', () => {
      if (this.mapMouseClickState === "mouseDown") {
        this.mapMouseClickState = "mouseMove";
      }
    });
    this.renderer.listen(this.container.nativeElement, 'mouseup', (event) => {
      if (this.mapMouseClickState === "mouseDown") {
        this.mapMouseClickState = "mouseMove";
        this.popupPosition = this.map.fromPointToLatLng(event.clientX, event.clientY);
        this.http.getNearestPosition(new Place(null, null, this.popupPosition.lat, this.popupPosition.lng)).then(
          (city: Place) => {
            this.popupCity = city;
            this.createPopUp(city.name);
            this.updatePopUpPosition();
          });
        this.mapMouseClickState = undefined;
      }
    });
  }

  private createPopUp(name: string) {
    this.renderer.setStyle(this.popup.nativeElement, "display", "initial");
    if (this.popupValue.nativeElement.childNodes.length > 0) {
      this.renderer.removeChild(this.popupValue.nativeElement, this.popupValue.nativeElement.childNodes[0]);
    }
    this.renderer.appendChild(this.popupValue.nativeElement, this.renderer.createText(name.charAt(0).toUpperCase() + name.slice(1)));
  }

  public fermerPopUp() {
    this.renderer.setStyle(this.popup.nativeElement, "display", "none");
    if (this.popupValue.nativeElement.childNodes.length > 0) {
      this.renderer.removeChild(this.popupValue.nativeElement, this.popupValue.nativeElement.childNodes[0]);
    }
    this.popupPosition = undefined;
  }

  private updatePopUpPosition() {
    if (this.popupPosition) {
      const position = this.map.latLngToPixel(this.popupPosition.lat, this.popupPosition.lng);
      const sizeX = this.popup.nativeElement.offsetWidth / 2;
      const sizeY = this.popup.nativeElement.offsetHeight;
      this.renderer.setStyle(this.popup.nativeElement, "top", `${position.y - sizeY}px`);
      this.renderer.setStyle(this.popup.nativeElement, "left", `${position.x - sizeX}px`);
    }
  }

  public setLocalisation() {
    this.mapData.pushCity(this.popupCity);
  }

  private initMap(): Promise<{}> {
    return new Promise(async (res) => {
      this.drawerService.setContext(this.canvas.nativeElement.getContext("2d"));
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;
      this.userPosition = await this.userLocationService.getUserLocation();
      const realPosition = this.getPosition(this.userPosition);
      const options = {
        lat: realPosition ? realPosition.posX : 46.483440,
        lng: realPosition ? realPosition.posY : 2.525914,
        zoom: this.getZoomState(this.userPosition)
      };
      this.map = this.mappa.tileMap(options);
      this.map.overlay(this.canvas.nativeElement);
      res();
    });
  }

  private getPosition(userPosition): Place {
    return this.positionMapState || userPosition;
  }

  private getZoomState(userPosition): number {
    return this.zoomState || (userPosition ? 10 : 6);
  }

  private drawMap() {
    const updateDraw = () => {
      this.clearMap();
      this.drawUserLocation();
      this.drawLocation();
      this.drawPositions();
      this.drawPaths();
      this.updatePopUpPosition();
      this.initMouseEvent();
    };
    if (this.map) {
      this.map.onChange(updateDraw);
      this.mapDataOnChange = this.mapData.onChange().subscribe(updateDraw);
    }
  }

  private drawPaths() {
    if (this.mapData.paths) {
      this.mapData.paths.forEach(path => {
        const startPixels = this.map.latLngToPixel(path.startPlace.posY, path.startPlace.posX);
        const endPixels = this.map.latLngToPixel(path.endPlace.posY, path.endPlace.posX);
        this.drawerService.path(startPixels, endPixels);
      });
    }
  }

  private clearMap() {
    this.drawerService.clear();
  }

  private async drawUserLocation() {
    if (this.userPosition) {
      const positionPixels = this.map.latLngToPixel(this.userPosition.posX, this.userPosition.posY);
      this.drawerService.pointerUser(positionPixels);
    }
  }

  private drawLocation() {
    if (this.mapData.pointersLocation) {
      this.mapData.pointersLocation.forEach(position => {
        const positionPixels = this.map.latLngToPixel(position.posY, position.posX);
        this.drawerService.pointer(positionPixels);
      });
    }
  }

  private drawPositions() {
    this.positions.forEach(position => {
      const positionPixels = this.map.latLngToPixel(position.posY, position.posX);
      this.drawerService.location(positionPixels);
    });
  }
}
