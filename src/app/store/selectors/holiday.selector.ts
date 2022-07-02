import { createSelector } from '@ngrx/store';
import { IHoliday, IHolidayStoreState } from 'src/interface/holiday';


interface AppState {
    holiday: IHolidayStoreState;
}

export const loading = () => createSelector(
    (state: AppState) => state.holiday.loading,
    (state: boolean) => state
)

export const error = () => createSelector(
    (state: AppState) => state.holiday.error,
    (state: boolean) => state
)

export const holidays = () => createSelector(
    (state: AppState) => state.holiday.holidays,
    (state: IHoliday[]) => state
)