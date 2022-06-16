import { createReducer, on } from '@ngrx/store';
import { ISession } from 'src/interface/session';
import { set } from './session.actions';

export const initialState: ISession = {
  isAuthenticated: true
};
 
export const sessionReducer = createReducer(
  initialState,
  on(set, (state, session) => session),
);