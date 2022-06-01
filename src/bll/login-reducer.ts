import { SignInPayloadType } from '../types/requestTypes';
import { Dispatch } from 'redux';
import { authService } from '../services/authService';
import { AxiosError } from 'axios';
import { ErrorResponseType, UserType } from '../types/responseTypes';
import { handleNetworkError } from '../utils/errorUtils';
import { AppRootStateType } from './store';

type InitialStateType = {
    user: null | UserType;
}

const initialState: InitialStateType = {
    user: null,
}

export const setUser = (user: UserType) => ({
    type: 'auth/setUser',
    payload: { user }
} as const);

export const login = (payload: SignInPayloadType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const response = await authService.login(payload);
        dispatch(setUser(response.data));
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleNetworkError(err);
    }
};

export type ActionsType = ReturnType<typeof setUser>;

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/setUser':
            return { ...state, user: action.payload.user }
        default:
            return {...state}
    }
};

export const getUser = (state: AppRootStateType) => state.auth.user;

