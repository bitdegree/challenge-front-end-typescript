import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';



export const login = createAction('[Login Screen] Login', props<User>());
export const logout = createAction('[Login Screen] Logout');