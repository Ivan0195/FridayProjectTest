import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk"
import {LoginActionsType, loginReducer} from "./login-reducer";
import {registrationReducer} from "./registration-reducer";
import {profileReducer} from "./profile-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = LoginActionsType // сюда нужно дописать общий тип для вашего редьюсера
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();