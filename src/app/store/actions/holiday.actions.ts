import { createAction, props } from '@ngrx/store';
import { IHoliday } from 'src/interface/holiday';

export const error = createAction('[Holiday state] Error');
export const set = createAction('[Holiday state] Set', props<{holidays: IHoliday[]}>());
export const load = createAction('[Holiday state] Load', props<{code: string, year: string | number}>());