import { Component, OnInit, Input } from '@angular/core';

/**
 * Composant qui affiche un bouton et gère ses états
 */
@Component({
  selector: 'cl-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() disabled: boolean;
  @Input() style: 'flat' | 'icon' | 'circle' = 'flat';
  @Input() color = "primary";
  @Input() type = 'button';

  constructor() { }

  ngOnInit() {
  }

}
