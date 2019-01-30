import { AbstractControl, ValidatorFn, FormGroup } from "@angular/forms";
import { Place } from "model/place";

export function knowCity(cites: Place[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return cites && !cites.some(city => city.name === control.value) ? { 'cityInexist': { value: control.value } } : null;
    };
}

export function notAlreadyChoose(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.parent) {
            return Object.values(control.parent.value).filter(value => value === control.value).length <= 1 ? null : { 'cityAlreayChoose': { value: control.value } };
        }
        return null;
    };
}

