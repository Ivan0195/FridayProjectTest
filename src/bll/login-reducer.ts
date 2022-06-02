import {Dispatch} from "redux";
import { AppRootStateType, store } from "./store";
import {setAppStatusAC} from "./common-app-reducer";
import {authApi} from "../api/auth-api";
import {UserResponseType} from "../types/responseTypes";

const initialState = {
    userData: {} as UserResponseType,
    isLoggedIn: false, // исправить на false
    error: "" as string | null,
    authMeError: "" as string | null
}

//types
export type LoginInitialStateType = typeof initialState;
type SetUserDataActionType = ReturnType<typeof setUserDataAC>
type SetErrorActionType = ReturnType<typeof setErrorAC>
type SetAuthMeErrorActionType = ReturnType<typeof setAuthMeErrorAC>
type IsLoggedInActionType = ReturnType<typeof isLoggedInAC>
export type LoginActionsType = SetUserDataActionType | SetErrorActionType | IsLoggedInActionType | SetAuthMeErrorActionType
export type AppDispatch = typeof store.dispatch

//Action Creators\
export const setUserDataAC = (userData: UserResponseType) => ({type: 'LOGIN/SET-USER-DATA', userData} as const)
export const setErrorAC = (error: string | null) => ({type: 'LOGIN/SET-ERROR', error} as const)
export const setAuthMeErrorAC = (error: string | null) => ({type: 'LOGIN/SET-AUTH-ME-ERROR', error} as const)
export const isLoggedInAC = (isLoggedIn: boolean) => ({type: 'LOGIN/IS-LOGGED-IN', isLoggedIn} as const)

//Thunk Creators
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('pending'))
    authApi.login({email, password, rememberMe})
        .then(res => {
                dispatch(setUserDataAC(res.data))
                dispatch(isLoggedInAC(true))
                dispatch(setAppStatusAC('successful'))
            }
        )
        .catch(err => {
            dispatch(setAppStatusAC("failed"))
            const error = err.response
            dispatch(setErrorAC(error
                ? err.response.data.error
                : (err.message + ', more details in the console')))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('pending'))
    authApi.logout()
        .then(res => {
            dispatch(isLoggedInAC(true))
            dispatch(setAppStatusAC('successful'))
            dispatch(setErrorAC(''))
        })
        .catch(err => {
            dispatch(setAppStatusAC("failed"))
            const error = err.response
            dispatch(setErrorAC(error
                ? err.response.data.error
                : (err.message + ', more details in the console')))
        })
}

export const authTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('pending'))
    authApi.me()
        .then(res => {
            dispatch(setUserDataAC(res.data))
            dispatch(isLoggedInAC(true))
            dispatch(setAppStatusAC('successful'))
        })
        .catch(err => {
            dispatch(setAppStatusAC("failed"))
            const error = err.response
            dispatch(setAuthMeErrorAC(error
                ? err.response.data.error
                : (err.message + ', more details in the console')))
        })
}

//Reducer
export const loginReducer = (state: LoginInitialStateType = initialState, action: LoginActionsType): LoginInitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-USER-DATA':
            return {...state, userData: action.userData}
        case 'LOGIN/SET-ERROR':
            return {...state, error: action.error}
        case 'LOGIN/SET-AUTH-ME-ERROR':
            return {...state, authMeError: action.error}
        case 'LOGIN/IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return {...state}
    }
}

export const getUserData = (state: AppRootStateType) => state.login.userData;
