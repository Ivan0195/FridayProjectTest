import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './login-reducer';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appReducer } from './app-reducer';
import { ActionsType as AuthActionsType } from './login-reducer';
import { ActionsType as AppActionsType } from './app-reducer';
import { ActionsType as RegistrationActionsType } from './registration-reducer';
import { registrationReducer } from './registration-reducer';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {ThunkDispatch} from 'redux-thunk'
import {loginReducer} from "./login-reducer";
import {registrationReducer} from "./registration-reducer";
import {ProfileActionsType, profileReducer} from "./profile-reducer";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    registration: registrationReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionType = AuthActionsType | AppActionsType | RegistrationActionsType;
export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>;

export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

type AppActionType = ProfileActionsType
type TypedDispatch = ThunkDispatch<AppRootStateType, any, AppActionType>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
