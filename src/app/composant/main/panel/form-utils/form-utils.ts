import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { MapDataService } from 'services/map-data.service';
import { OnInit } from '@angular/core';
import { Place } from 'model/place';
import { Path } from 'model/path';
import { HttpService } from 'services/http-service.service';
import { knowCity, notAlreadyChoose } from './forms.validators';
import { LogService } from 'services/log.service';

export abstract class FormPanelUtils implements OnInit {
    public panelForm: FormGroup;
    public villesSupp: string[] = [];
    public inputValidators: ValidatorFn[];
    public cities: Place[] = undefined;

    constructor(protected http: HttpService, protected mapData: MapDataService, protected logService: LogService) {
    }

    ngOnInit() {
        this.inputValidators = [Validators.required, Validators.minLength(1), knowCity(this.cities), notAlreadyChoose()];
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

    private getPositionFromForms(): Promise<Place[][]> {
        return Promise.all(
            this.getCitiesNameFromForm()
                .map((cityName: string) => this.http.search(cityName.toLowerCase()))
        );
    }

    private getCitiesNameFromForm() {
        const values = Object.values(this.panelForm.value);
        if (values.length > 2) {
            const arrivelCity = values[1];
            values.splice(1, 1);
            values.splice(values.length, 0, arrivelCity);
        }
        return values;
    }

    protected async onSubmit(fn: (positions: Place[]) => Promise<Path[]>) {
        this.mapData.resetPaths();
        this.mapData.resetPointersLocations();
        const places: Place[] = (await this.getPositionFromForms()).map(place => place[0]);
        places.forEach(place => {
            if (!place) {
                this.logService.set("Une des villes saisis n'existe pas.").asError().showPopUp().and.log();
                throw new Error("Ville inconnue");
            }
        });
        this.mapData.addPath(...await fn.call(this.http, places));
    }
}
