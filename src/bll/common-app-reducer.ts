import {LoginResponseType} from "../api/login-api";
import {LoginActionsType, LoginInitialStateType, setUserDataAC} from "./login-reducer";

const initialState = {
    requestStatus: 'successful' as AppStatusType
}

export type AppStatusType = 'pending' | 'successful' | 'failed'
export type AppStatusInitialStateType = typeof initialState;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export const setAppStatusAC = (status: AppStatusType) => ({type: 'APP/SET-APP-STATUS', status} as const)

export const appStatusReducer = (state: AppStatusInitialStateType = initialState, action: SetAppStatusActionType): AppStatusInitialStateType => {
    switch (action.type) {
        case 'APP/SET-APP-STATUS':
            return {...state, requestStatus: action.status}
        default:
            return {...state}
    }
}