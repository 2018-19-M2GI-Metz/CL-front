import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as mappaMundi from 'mappa-mundi';

@Component({
  selector: 'cl-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild("map") canvas: ElementRef;
  private map;
  private ctx;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const mappa = new mappaMundi('Leaflet');
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    const options = {
      lat: 0,
      lng: 0,
      zoom: 4,
      style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    };

    this.map = mappa.tileMap(options);
    this.map.overlay(this.canvas.nativeElement);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }
}
