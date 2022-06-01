import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk"
import {LoginActionsType, loginReducer} from "./login-reducer";
import {registrationReducer} from "./registration-reducer";
import {profileReducer} from "./profile-reducer";
import {useDispatch} from "react-redux";
import {appStatusReducer, SetAppStatusActionType} from "./common-app-reducer";
import resetPasswordReducer, {ResetPasswordActionsType} from "./reset-password-reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    appStatus: appStatusReducer,
    resetPassword: resetPasswordReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = LoginActionsType | SetAppStatusActionType | ResetPasswordActionsType // сюда нужно дописать общий тип для вашего редьюсера
export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();