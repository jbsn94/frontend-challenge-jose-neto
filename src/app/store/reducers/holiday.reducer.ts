import { createReducer, on } from '@ngrx/store';
import { IHolidayStoreState } from 'src/interface/holiday';
import { set, error, load } from '../actions/holiday.actions';

export const initialState: IHolidayStoreState = {
  holidays: [],
  loading: false,
  error: false
};
 
export const holidayReducer = createReducer(
  initialState,
  on(load, (state) => {
    return { ...state, loading: true }
  }),
  on(set, (state, { holidays }) => { 
    return {loading: false, holidays, error: false } 
  }),
  on(error, (state) => {
    return { ...state, error: true }
  })
);