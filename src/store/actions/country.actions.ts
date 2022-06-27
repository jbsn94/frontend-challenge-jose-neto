import { createAction, props } from '@ngrx/store';
import { ICountry } from 'src/interface/country';

export const load = createAction('[Country state] Load');
export const error = createAction('[Country state] Error');
export const set = createAction('[Country state] Set', props<{countries: ICountry[]}>());