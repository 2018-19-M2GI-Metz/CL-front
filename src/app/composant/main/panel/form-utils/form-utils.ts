import { FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { City } from 'model/city';
import { MapDataService } from 'services/map-data.service';
import { OnInit } from '@angular/core';
import { Position } from 'model/position';
import { Path } from 'model/path';
import { HttpService } from 'services/http-service.service';
import { knowCity, notAlreadyChoose } from './forms.validators';

export abstract class FormPanelUtils implements OnInit {
    public panelForm: FormGroup;
    public villesSupp: string[] = [];
    public inputValidators: ValidatorFn[];
    public cities: City[];

    constructor(protected http: HttpService, protected mapData: MapDataService) { }

    ngOnInit() {
        this.cities = this.mapData.cities;
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

    private getPositionFromForms(): Position[] {
        return this.getFormValues().map((cityName: string) => this.mapData.cities.find((city: City) => city.name === cityName).position);
    }

    private getFormValues() {
        const values = Object.values(this.panelForm.value);
        if (values.length > 2) {
            const arrivelCity = values[1];
            values.splice(1, 1);
            values.splice(values.length, 0, arrivelCity);
        }
        return values;
    }

    protected async onSubmit(fn: (positions: Position[]) => Promise<Path[]>) {
        this.mapData.resetPaths();
        this.mapData.resetPointersLocations();
        this.mapData.addPath(...await fn.call(this.http, this.getPositionFromForms()));
    }
}
