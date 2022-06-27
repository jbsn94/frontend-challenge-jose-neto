import { createReducer, on } from '@ngrx/store';
import { ICountryStoreState } from 'src/interface/country';
import { set, load, error } from '../actions/country.actions';

export const initialState: ICountryStoreState = {
  loading: false,
  countries: [],
  error: false
};
 
export const countryReducer = createReducer(
  initialState,
  on(load, (state) => { return { ...state, loading: true } }),
  on(error, (state) => {
    return {...state, loading: false, error: true};
  } ),
  on(set, (state, { countries }) => { return { ...state, loading: false, countries } })
);