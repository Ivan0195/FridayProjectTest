// types
import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {handleNetworkError} from "../utils/errorUtils";

export type InitialStateType = typeof initialState

export type ProfileActionsType = ReturnType<typeof updateData>

export type UpdatingDataType = {
    name?: string
    avatar?: string
}

// action creators
const updateData = (payload: UpdatingDataType) => ({type: 'PROFILE/UPDATE-DATA', payload} as const)
// reducer
const initialState = {
    name: '',
    email: '',
    avatar: '' as null | string,
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/UPDATE-DATA":
            return {...state, ...action.payload};
        default:
            return {...state}
    }
}

// thunk creators
export const updateInitializingDataTC = (payload: UpdatingDataType) =>
    (dispatch: Dispatch<ProfileActionsType>) => {
        authApi.updateMe(payload)
            .then(res => {
                    dispatch(updateData(payload))
                }
            )
            .catch(e => {
                handleNetworkError(e)
            })
    }
