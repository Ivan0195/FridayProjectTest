import { authApi } from '../api/auth-api';
import { AxiosError } from 'axios';
import { SignUpPayloadType } from '../types/requestTypes';
import { ErrorResponseType } from '../types/responseTypes';
import { AppRootStateType } from './store';
import { handleNetworkError } from '../utils/errorUtils';
import { Dispatch } from 'redux';

type StatusesType = 'pending' | 'success';

type InitialStateType = {
    status: StatusesType;
}

const initialState: InitialStateType = {
    status: 'pending',
}

export const setRegistrationStatus = (status: StatusesType) => ({
    type: 'register/setRegistrationStatus',
    payload: { status },
} as const);

export const registerUser = (payload: SignUpPayloadType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        await authApi.register(payload);
        dispatch(setRegistrationStatus('success'));
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleNetworkError(err);
    }
};

export type ActionsType = ReturnType<typeof setRegistrationStatus>;

export const registrationReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'register/setRegistrationStatus':
            return { ...state, status: action.payload.status };
        default:
            return {...state}
    }
}

export const getRegistrationStatus = (state: AppRootStateType) => state.registration.status;


