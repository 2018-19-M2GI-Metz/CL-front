import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * Valide si le ville n'est pas déjà séléctionné
 */
export function notAlreadyChoose(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.parent) {
            return Object.values(control.parent.value).filter(value => value === control.value).length <= 1 ? null : { 'cityAlreayChoose': { value: control.value } };
        }
        return null;
    };
}
