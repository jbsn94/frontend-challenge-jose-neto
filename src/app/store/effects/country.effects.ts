import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, of } from "rxjs";
import { CountryService } from "src/app/service/country/country.service";
import { CountryActions } from '../actions';

@Injectable()
export class CountryEffects {
    
    loadCountries$ = createEffect(() => this.actions$.pipe(
        ofType(CountryActions.load),
        mergeMap(
            () => this.countryService.list()
                .pipe(
                    map(({ countries }) => CountryActions.set({ countries })),
                    catchError( () => of(CountryActions.error()))
                )
        )
    ));

    constructor(
        private actions$: Actions,
        private countryService: CountryService,
    ){}
}