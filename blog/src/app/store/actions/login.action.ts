import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';



export const login = createAction('[Login Screen] Login', props<User>());