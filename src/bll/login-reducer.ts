import {loginAPI, LoginResponseType} from "../api/login-api";
import {Dispatch} from "redux";
import {store} from "./store";

const initialState = {
    userData: {} as LoginResponseType,
    isLoggedIn: false,
    error: "" as string | null,
}

//types
export type LoginInitialStateType = typeof initialState;
type SetUserDataActionType = ReturnType<typeof setUserDataAC>
type SetErrorActionType = ReturnType<typeof setErrorAC>
type IsLoggedInActionType = ReturnType<typeof isLoggedInAC>
export type LoginActionsType = SetUserDataActionType | SetErrorActionType | IsLoggedInActionType
export type AppDispatch = typeof store.dispatch

//Action Creators\
export const setUserDataAC = (userData: LoginResponseType) => ({type: 'LOGIN/SET-USER-DATA', userData} as const)
export const setErrorAC = (error: string | null) => ({type: 'LOGIN/SET-ERROR', error} as const)
export const isLoggedInAC = (email: string) => ({type: 'LOGIN/IS-LOGGED-IN', email} as const)

//Thunk Creators
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatch) => {
    loginAPI.login(email, password, rememberMe)
        .then(res => {
                dispatch(setUserDataAC(res.data))
                dispatch(isLoggedInAC(res.data.email))
            }
        )
        .catch(err => {
            const error = err.response
            dispatch(setErrorAC(error
                ? err.response.data.error
                : (err.message + ', more details in the console')))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    loginAPI.logout()
        .then(res => {dispatch(isLoggedInAC(""))})
        .catch(err => {
        const error = err.response
        dispatch(setErrorAC(error
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
        case 'LOGIN/IS-LOGGED-IN':
            return {...state, isLoggedIn: !!action.email}
        default:
            return {...state}
    }
}

