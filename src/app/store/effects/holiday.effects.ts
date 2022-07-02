import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { HolidayService } from "src/app/service/holiday/holiday.service";
import { HolidayActions } from '../actions';

@Injectable()
export class HolidayEffects {
    
    loadHolidays$ = createEffect(() => this.actions$.pipe(
        ofType(HolidayActions.load),
        mergeMap(
            ({code, year}) => this.holidayService.list(code, year)
                .pipe(
                    map(({ holidays }) => HolidayActions.set({ holidays })),
                    catchError( () => of(HolidayActions.error()))
                )
        )
    ));

    constructor(
        private actions$: Actions,
        private holidayService: HolidayService
    ){}
}