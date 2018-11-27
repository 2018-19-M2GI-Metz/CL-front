import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("helo");
  }

}
