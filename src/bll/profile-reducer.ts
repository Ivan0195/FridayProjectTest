// types
import {Dispatch} from "redux";
import {profileApi} from "../Pages/ProfilePage/profile-api";

export type InitialStateType = typeof initialState

export type ProfileActionsType = ReturnType<typeof setIsAuthorized>
    | ReturnType<typeof setAuthorizedData>
    | ReturnType<typeof setError>
    | ReturnType<typeof updateData>

type AuthorizedDataType = {
    email: string
    name: string
    avatar?: string
}

export type UpdatingDataType = {
    name?: string
    avatar?: string
}


// action creators
const setIsAuthorized = (isAuthorized: boolean) => ({type: 'PROFILE/IS-AUTHORIZED', isAuthorized} as const)
const setAuthorizedData = (payload: AuthorizedDataType) => ({type: 'PROFILE/SET-DATA', payload} as const)
export const setError = (error: string) => ({type: 'PROFILE/SET-ERROR', error} as const)
const updateData = (payload: UpdatingDataType) => ({type: 'PROFILE/UPDATE-DATA', payload} as const)
// reducer
const initialState = {
    isAuthorized: false, //заглушка, поменять на false
    name: '',
    email: '',
    avatar: '' as null | string,
    error: '' as null | string
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/IS-AUTHORIZED":
            return {...state, isAuthorized: action.isAuthorized};
        case "PROFILE/SET-DATA":
        case "PROFILE/UPDATE-DATA":
            return {...state, ...action.payload};
        case "PROFILE/SET-ERROR":
            return {...state, error: action.error};
        default:
            return {...state}
    }
}

// thunk creators
export const initializeProfileTC = () => (dispatch: Dispatch<ProfileActionsType>) => {
    profileApi.me()
        .then(res => {
            dispatch(setIsAuthorized(true))
            dispatch(setAuthorizedData({name: res.data.name, email: res.data.email, avatar: res.data.avatar}))
        })
        .catch(e => {
                dispatch(setError(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')))
            }
        )
}

export const updateInitializingDataTC = (payload: UpdatingDataType) =>
    (dispatch: Dispatch<ProfileActionsType>) => {
        profileApi.updateMe(payload)
            .then(res => {
                    dispatch(updateData(payload))
                }
            )
            .catch(e => {
                dispatch(setError(e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')))
            })
    }
