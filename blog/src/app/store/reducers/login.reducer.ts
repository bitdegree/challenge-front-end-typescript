import { Action, createReducer, on } from '@ngrx/store';
import { login } from '../actions/login.action';
import { User } from '../../models/user.model';

interface State {
    user: User | undefined;
}

export const initialState: State = {
    user: undefined
};

const _loginReducer = createReducer(
    initialState,
    on(login, (state: State, payload: User) => {
        return ({ ...state, user: payload });
    }),
  );


export function loginReducer(state : State | undefined, action : Action) {
    return _loginReducer(state, action);
  }