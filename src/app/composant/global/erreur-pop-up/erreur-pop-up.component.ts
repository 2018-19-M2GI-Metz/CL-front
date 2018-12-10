import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cl-erreur-pop-up',
  templateUrl: './erreur-pop-up.component.html',
  styleUrls: ['./erreur-pop-up.component.scss']
})
export class ErreurPopUpComponent {

  constructor(
    public dialogRef: MatDialogRef<ErreurPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }
}
