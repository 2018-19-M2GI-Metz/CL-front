import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ErreurPopUpComponent } from "../composant/global/erreur-pop-up/erreur-pop-up.component";

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
        switch (this.flags) {
            case "error":
                console.error(this.message, this.info);
                break;
            case "warn":
                console.warn(this.message, this.info);
                break;
            case "info":
                console.info(this.message, this.info);
                break;
        }
        return this;
    }
}
