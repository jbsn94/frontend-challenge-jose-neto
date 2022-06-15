import { createReducer, on } from '@ngrx/store';
import { ICountry } from 'src/interface/country';
import { set, find } from './country.actions';

export const initialState: ICountry[] = [];
 
export const countryReducer = createReducer(
  initialState,
  on(set, (state, { countries }) => countries),
  on(find, (state, { code }) => state.filter((country) => country.code == code)),
);