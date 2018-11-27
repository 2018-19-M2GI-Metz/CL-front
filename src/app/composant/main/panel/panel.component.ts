import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public navLinks: { label: string, path: string }[] = [
    {
      label: "GPS",
      path: "gps",
    },
    {
      label: "TSP",
      path: "tsp",
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
