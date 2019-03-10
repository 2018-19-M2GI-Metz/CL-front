import { Component, OnInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';
import * as mappaMundi from 'mappa-mundi';
import { Place } from 'model/place';
import { UserLocationService } from 'services/user-location.service';
import { DrawerService } from 'services/drawer.service';
import { MapDataService } from 'services/map-data.service';
import { Subscription } from 'rxjs';

const KEY = 'pk.eyJ1IjoiZGFuaWVscGF5ZXQiLCJhIjoiY2pvem1leGF0Mm1hOTN3cGhmbHM0b3p2ayJ9.s0Gdr8eabQi56tHONKv1Sg';

@Component({
  selector: 'cl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild("map") canvas: ElementRef;
  @ViewChild("container") container: ElementRef;
  private map;
  private positions: Place[] = [];
  private canvasTmp: ElementRef;
  private mapDataOnChange: Subscription;
  private zoomState: number = undefined;
  private positionMapState: Place = undefined;
  private mappa;

  constructor(
    private userLocationService: UserLocationService,
    private drawerService: DrawerService,
    private mapData: MapDataService,
    private renderer: Renderer2) {
    this.mappa = new mappaMundi('Mapbox', KEY);
  }

  async ngOnInit() {
    this.canvasTmp = this.canvas;
    this.initPositions();
    await this.initMap();
    this.drawMap();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.map) {
      this.zoomState = this.map.zoom();
      const position = this.map.fromPointToLatLng(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2));
      this.positionMapState = new Place(undefined, "curent_Position", position.lat, position.lng);
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

  private async initPositions() {
    // this.positions.push(...await this.httpService.getAllPositions());
  }

  private initMap(): Promise<{}> {
    return new Promise(async (res) => {
      this.drawerService.setContext(this.canvas.nativeElement.getContext("2d"));
      this.canvas.nativeElement.width = window.innerWidth;
      this.canvas.nativeElement.height = window.innerHeight;
      const userPosition = await this.userLocationService.getUserLocation();
      const realPosition = this.getPosition(userPosition);
      const options = {
        lat: realPosition ? realPosition.posX : 46.483440,
        lng: realPosition ? realPosition.posY : 2.525914,
        zoom: this.getZoomState(userPosition),
        // style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
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
    const userPosition = await this.userLocationService.getUserLocation();
    if (userPosition) {
      const positionPixels = this.map.latLngToPixel(userPosition.posX, userPosition.posY);
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
