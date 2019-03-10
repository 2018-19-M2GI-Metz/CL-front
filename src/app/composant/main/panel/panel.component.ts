import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  public current = 0;

  public setCurrentTab(index) {
    this.current = index;
  }
}
