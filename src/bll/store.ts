import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {ThunkDispatch} from 'redux-thunk'
import {loginReducer} from "./login-reducer";
import {registrationReducer} from "./registration-reducer";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,

})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
type AppActionType = ProfileActionsType
type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()