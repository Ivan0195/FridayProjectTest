import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ActionsType as RegistrationActionsType } from './registration-reducer';
import { registrationReducer } from './registration-reducer';
import {LoginActionsType, loginReducer} from "./login-reducer";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {appStatusReducer, SetAppStatusActionType} from "./common-app-reducer";
import resetPasswordReducer, {ResetPasswordActionsType} from "./reset-password-reducer";

const rootReducer = combineReducers({
    registration: registrationReducer,
    profile: profileReducer,
    appStatus: appStatusReducer,
    resetPassword: resetPasswordReducer,
    login: loginReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = LoginActionsType | SetAppStatusActionType | ResetPasswordActionsType | ProfileActionsType | RegistrationActionsType // сюда нужно дописать общий тип для вашего редьюсера
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
