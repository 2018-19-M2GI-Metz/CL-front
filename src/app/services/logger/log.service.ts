import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErreurPopUpComponent } from "../../composant/global/erreur-pop-up/erreur-pop-up.component";

/**
 * Service qui s'occupe de logger les informations
 */
@Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor(private dialog: MatDialog) {
    }

    set(message: string, info: any = {}) {
        return new Log(this.dialog, message, info);
    }
}

/**
 * Classe représentant un logger
 */
class Log {
    private message: string;
    private info: any;
    public and: Log;
    private flags: 'error' | 'warn' | 'info';

    constructor(public dialog: MatDialog, message: string, info: any) {
        this.message = message;
        this.info = info;
        this.and = this;
    }

    public asError() {
        this.setFlags('error');
        return this;
    }

    public asWarn() {
        this.setFlags('warn');
        return this;
    }

    public asInfo() {
        this.setFlags('info');
        return this;
    }

    private setFlags(flags: 'error' | 'warn' | 'info') {
        this.flags = flags;
    }

    public showPopUp() {
        this.dialog.open(ErreurPopUpComponent, {
            data: { message: this.message }
        });
        return this;
    }

    public log() {
        console[this.flags](this.message, this.info);
        return this;
    }
}
