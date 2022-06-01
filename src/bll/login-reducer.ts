import {loginAPI, LoginResponseType} from "../api/login-api";
import {Dispatch} from "redux";
import {store} from "./store";
import {setAppStatusAC} from "./common-app-reducer";

const initialState = {
    userData: {} as LoginResponseType,
    isLoggedIn: false,
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
export const setUserDataAC = (userData: LoginResponseType) => ({type: 'LOGIN/SET-USER-DATA', userData} as const)
export const setErrorAC = (error: string | null) => ({type: 'LOGIN/SET-ERROR', error} as const)
export const setAuthMeErrorAC = (error: string | null) => ({type: 'LOGIN/SET-AUTH-ME-ERROR', error} as const)
export const isLoggedInAC = (email: string) => ({type: 'LOGIN/IS-LOGGED-IN', email} as const)

//Thunk Creators
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('pending'))
    loginAPI.login(email, password, rememberMe)
        .then(res => {
                dispatch(setUserDataAC(res.data))
                dispatch(isLoggedInAC(res.data.email))
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
    loginAPI.logout()
        .then(res => {
            dispatch(isLoggedInAC(""))
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
    loginAPI.me()
        .then(res => {
            dispatch(setUserDataAC(res.data))
            dispatch(isLoggedInAC(res.data.email))
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
            return {...state, isLoggedIn: !!action.email}
        default:
            return {...state}
    }
}

