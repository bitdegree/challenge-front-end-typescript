import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';


//I created store for storing login informations, since this kind of little values must store in 'Store' objects
export const login = createAction('[Login Screen] Login', props<User>());
export const logout = createAction('[Login Screen] Logout');