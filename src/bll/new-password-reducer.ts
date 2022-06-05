import {AppActionType, AppDispatch} from "./store";
import {setAppStatusAC} from "./common-app-reducer";
import {authApi} from "../api/auth-api";
import {handleNetworkError} from "../utils/errorUtils";

const initialState: InitialStateType = {
    error: null,
    isAccepted: false
}

export type InitialStateType = {
    error: string | null
    isAccepted: boolean
}

export type NewPasswordActionsType = ReturnType<typeof setIsAcceptedAC> | ReturnType<typeof setAppErrorAC>

const newPasswordReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        case "NEW_PASS/SET-IS-ACCEPTED":
            return { ...state, isAccepted: action.isAccepted }
        case "NEW_PASS/SET-ERROR":
            return { ...state, error: action.error }
        default: return { ...state };
    }
}

export const setIsAcceptedAC = (isAccepted: boolean) => ({
    type: "NEW_PASS/SET-IS-ACCEPTED",
    isAccepted
} as const)
export const setAppErrorAC = (error: string | null) => ({ type: 'NEW_PASS/SET-ERROR', error } as const)

export const newPassTC = (password: string, resetPasswordToken: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("pending"))
    authApi.newPassword({password, resetPasswordToken})
        .then(() => {
            dispatch(setAppStatusAC("successful"))
            dispatch(setIsAcceptedAC(true))
        })
        .catch((error) => {
            dispatch(setAppStatusAC("failed"))
            handleNetworkError(error)
        })
}

export default newPasswordReducer;