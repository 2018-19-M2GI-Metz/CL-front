import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';

export abstract class FormPanelUtils {
    public panelForm: FormGroup;
    public villesSupp: string[] = [];
    public inputValidators: ValidatorFn[];

    constructor() {
        this.inputValidators = [Validators.required, Validators.minLength(1)];
    }

    public addCity() {
        const formControlName = `city-${this.getIdForNewCity()}`;
        this.villesSupp.push(formControlName);
        this.panelForm.addControl(formControlName, new FormControl(undefined, this.inputValidators));
    }

    public getIdForNewCity(): string {
        if (this.villesSupp.length !== 0) {
            return (+(this.villesSupp[this.villesSupp.length - 1].replace("city-", "")) + 1).toString();
        } else {
            return "0";
        }
    }

    public removeCitySupp(cityToRemove) {
        const cityControlName = this.villesSupp.find((ville: string) => ville === cityToRemove);
        this.villesSupp = this.villesSupp.filter(v => v !== cityControlName);
        this.panelForm.removeControl(cityControlName);
    }

    public abstract onSubmit();
}
