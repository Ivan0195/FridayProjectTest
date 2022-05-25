//types
type InitialStateType = typeof initialState

type ActionsType = any

const initialState = {}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}
