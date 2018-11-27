import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as mappaMundi from 'mappa-mundi';
import { Position } from 'model/position';

@Component({
  selector: 'cl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild("map") canvas: ElementRef;
  private map;
  private ctx;
  private positions: Position[];

  ngOnInit() {
    this.initMap();
    this.drawMap();
  }

  initPositions() {
    this.positions.push(new Position());
  }

  initMap() {
    const mappa = new mappaMundi('Leaflet');
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    const options = {
      lat: 0,
      lng: 0,
      zoom: 3,
      style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    };

    this.map = mappa.tileMap(options);
    this.map.overlay(this.canvas.nativeElement);
  }

  drawMap() {
    this.map.onChange(() => {
      this.clearMap();
      const coor = this.map.latLngToPixel(49.120243, 6.175639);

      this.ctx.beginPath();
      this.ctx.lineWidth = "6";
      this.ctx.strokeStyle = "red";
      this.ctx.arc(coor.x, coor.y, 20, 0, 2 * Math.PI);
      this.ctx.stroke();
    });
  }

  clearMap() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }
}
