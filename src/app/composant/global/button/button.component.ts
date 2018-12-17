import { Component, OnInit, Input } from '@angular/core';

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
