import { createReducer, on } from '@ngrx/store';
import { ICountryStoreState } from 'src/interface/country';
import { set, load, error, paginator } from '../actions/country.actions';

export const initialState: ICountryStoreState = {
  loading: false,
  countries: [],
  error: false,
  page: 0,
  size: 20
};
 
export const countryReducer = createReducer(
  initialState,
  on(load, (state) => { return { ...state, loading: true } }),
  on(error, (state) => {
    return {...state, loading: false, error: true};
  } ),
  on(set, (state, { countries }) => { return { ...state, loading: false, countries } }),
  on(paginator, (state, { page, size }) => {
    return { ...state, page, size };
  })
);