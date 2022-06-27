import { createSelector } from '@ngrx/store';
import { ICountry, ICountryStoreState } from 'src/interface/country';


interface AppState {
    country: ICountryStoreState;
}

export const findCountry = (code: string) => createSelector(
    (state: AppState) => state.country.countries,
    (state: ICountry[]) => state.find((country) => country.code == code)
);


export const getLoading = () => createSelector(
    (state: AppState) => state.country.loading,
    (state: boolean) => state
)

export const getError = () => createSelector(
    (state: AppState) => state.country.error,
    (state: boolean) => state
)