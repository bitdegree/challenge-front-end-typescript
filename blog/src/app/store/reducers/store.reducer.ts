import { Action, createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/login.action';
import { User } from '../../models/user.model';

export interface State {
    user: User | undefined;
}

export const initialState: State = {
    user: undefined
};

const _storeReducer = createReducer(
    initialState,
    on(login, (state: State, payload: User | undefined) => {
        return ({ ...state, user: payload });
    }),
    on(logout, (state:State) => {
        return ({...state, user: undefined})
    } )
  );


export function storeReducer(state : State | undefined, action : Action) {
    return _storeReducer(state, action);
  }