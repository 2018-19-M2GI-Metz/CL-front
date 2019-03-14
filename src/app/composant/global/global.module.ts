import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ErreurPopUpComponent } from './erreur-pop-up/erreur-pop-up.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PipesModule } from 'src/app/pipes/pipes.module';

/**
 * Tout composant qui peux être utilisé dans n'importe quel partie de l'application
 */
@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ErreurPopUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    PipesModule
  ],
  exports: [
    ButtonComponent,
    InputComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ErreurPopUpComponent
  ]
})
export class GlobalModule { }
