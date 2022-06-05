import {Dispatch} from "redux";
import {AppRootStateType, store} from "./store";
import {setAppStatusAC} from "./common-app-reducer";
import {handleNetworkError} from "../utils/errorUtils";
import {UserResponseType} from "../types/responseTypes";
import {authApi} from "../api/auth-api";
import {UpdatingProfilePayloadType} from "../types/requestTypes";
import {toast} from "react-toastify";

const initialState = {
    userData: {} as UserResponseType,
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
export type LoginActionsType =
    SetUserDataActionType
    | SetErrorActionType
    | IsLoggedInActionType
    | SetAuthMeErrorActionType
export type AppDispatch = typeof store.dispatch

//Action Creators\
export const setUserDataAC = (userData: UserResponseType) => ({type: 'LOGIN/SET-USER-DATA', userData} as const)
export const setErrorAC = (error: string | null) => ({type: 'LOGIN/SET-ERROR', error} as const)
export const setAuthMeErrorAC = (error: string | null) => ({type: 'LOGIN/SET-AUTH-ME-ERROR', error} as const)
export const isLoggedInAC = (email: string) => ({type: 'LOGIN/IS-LOGGED-IN', email} as const)

//Thunk Creators
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('pending'))
    authApi.login({email: email, password: password, rememberMe: rememberMe})
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
            handleNetworkError(err);
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('pending'))
    authApi.logout()
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
            handleNetworkError(err);
        })
}

export const authTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('pending'))
    authApi.me()
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

export const updateInitializingDataTC = (payload: UpdatingProfilePayloadType) =>
    (dispatch: Dispatch) => {
        authApi.updateMe(payload)
            .then(res => {
                    dispatch(setUserDataAC(res.data))
                    toast.success('Data successfully updated')
                }
            )
            .catch(e => {
                handleNetworkError(e)
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

export const getUserData = (state: AppRootStateType) => state.login.userData;
