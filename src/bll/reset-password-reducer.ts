import {AppDispatch} from "./store";
import {setAppStatusAC} from "./common-app-reducer";
import {authApi} from "../api/auth-api";
import {handleNetworkError} from "../utils/errorUtils";

const resetPasswordInitialState: resetPasswordInitialStateType = {
    error: null,
    tokenIsSent: false
}
export type resetPasswordInitialStateType = {
    error: null | string,
    tokenIsSent: boolean
}

export type setErrorActionType = ReturnType<typeof setAppErrorAC>;
export type setIsInitializedActionType = ReturnType<typeof setTokenIsSentAC>;

export type ResetPasswordActionsType = setErrorActionType | setIsInitializedActionType

export const setAppErrorAC = (error: string | null) => ({ type: 'RESET-PASSWORD/SET-ERROR', error } as const)
export const setTokenIsSentAC = (tokenIsSent: boolean) => ({type: 'RESET-PASSWORD/TOKEN-IS-SENT',tokenIsSent} as const)

const resetPasswordReducer = (state = resetPasswordInitialState, action: ResetPasswordActionsType) => {
    switch (action.type) {
        case "RESET-PASSWORD/SET-ERROR":
            return { ...state, error: action.error }
        case "RESET-PASSWORD/TOKEN-IS-SENT":
            return { ...state, tokenIsSent: action.tokenIsSent }
        default: return { ...state };
    }

}

const from = "test-front-admin<ai73a@yandex.by>"
const message = `<div style="background-color: lime; padding: 15px"> 
go to reset your password: 
<a href='https://Ivan0195.github.io/FridayProjectTest/#/new_password/$token$'>
link</a></div>`

export const sendTokenTC = (email: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("pending"))
    authApi.resetPassword({email, from, message})
        .then(() => {
            dispatch(setAppStatusAC("successful"))
            dispatch(setTokenIsSentAC(true))
        })
        .catch((error) => {
            dispatch(setAppStatusAC("failed"))
            dispatch(setAppErrorAC(error.response.data.error))
            handleNetworkError(error)
        })
}

export default resetPasswordReducer;