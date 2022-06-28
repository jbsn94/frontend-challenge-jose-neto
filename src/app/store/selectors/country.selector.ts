import { createSelector } from '@ngrx/store';
import { ICountry, ICountryStoreState } from 'src/interface/country';


interface AppState {
    country: ICountryStoreState;
}

export const find = (code: string) => createSelector(
    (state: AppState) => state.country.countries,
    (state: ICountry[]) => state.find((country) => country.code == code)
);

export const loading = () => createSelector(
    (state: AppState) => state.country.loading,
    (state: boolean) => state
)

export const error = () => createSelector(
    (state: AppState) => state.country.error,
    (state: boolean) => state
)

export const countries = () => createSelector(
    (state: AppState) => state.country,
    (state: ICountryStoreState) => state.countries.slice(state.page * state.size, state.size * (state.page + 1))
)

export const length = () => createSelector(
    (state: AppState) => state.country.countries,
    (state: ICountry[]) => state.length
)

export const size = () => createSelector(
    (state: AppState) => state.country.size,
    (state: number) => state
)