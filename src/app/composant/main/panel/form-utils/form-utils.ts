import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';

export abstract class FormPanelUtils {
    public panelForm: FormGroup;
    public villesSupp: string[] = [];
    public inputValidators: ValidatorFn[];

    constructor() {
        this.inputValidators = [Validators.required, Validators.minLength(1)];
    }

    protected addCity() {
        const formControlName = `city-${this.villesSupp.length}`;
        this.villesSupp.push(formControlName);
        this.panelForm.addControl(formControlName, new FormControl(undefined, this.inputValidators));
    }

    protected removeCitySupp(event) {
        event.preventDefault();
        const cityControlName = this.villesSupp[this.villesSupp.length - 1];
        this.villesSupp = this.villesSupp.filter(v => v !== cityControlName);
        this.panelForm.removeControl(cityControlName);
    }

    public abstract onSubmit();
}
