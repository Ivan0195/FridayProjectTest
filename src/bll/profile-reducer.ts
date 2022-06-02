// types


export type InitialStateType = typeof initialState

export type ProfileActionsType = {type: ''}

// action creators
// reducer
const initialState = {}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}

