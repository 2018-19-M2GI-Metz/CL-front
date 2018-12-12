import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErreurPopUpComponent } from "../composant/global/erreur-pop-up/erreur-pop-up.component";

@Injectable({
    providedIn: 'root'
})
export class ErreurService {
    private erreur: string;
    private info: any;
    public and: ErreurService;

    constructor(public dialog: MatDialog) {
        this.and = this;
    }


    setErreur(erreur: string, info: any = {}) {
        this.erreur = erreur;
        this.info = info;
        return this;
    }

    showPopUp() {
        this.dialog.open(ErreurPopUpComponent, {
            data: { message: this.erreur }
        });
        return this;
    }

    log() {
        console.error(this.erreur, this.info);
        return this;
    }
}
