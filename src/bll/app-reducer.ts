import { Dispatch } from 'redux';
import { authService } from '../services/authService';
import { AppRootStateType } from './store';
import { setUser } from './login-reducer';

type InitialStateType = {
  initializedStatus: boolean;
};

const initialState: InitialStateType = {
  initializedStatus: false,
};

export const setAppInitializedStatus = (status: boolean) => ({
  type: 'app/setAppInitializedStatus',
  payload: { status },
} as const);

export const checkAuth = () => async (dispatch: Dispatch<ActionsType>) => {
  try {
    const response = await authService.checkAuth();
    dispatch(setUser(response.data));
  } catch (e) {
  } finally {
    dispatch(setAppInitializedStatus(true));
  }
};

export type ActionsType = ReturnType<typeof setAppInitializedStatus> | ReturnType<typeof setUser>;

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/setAppInitializedStatus':
      return { ...state, initializedStatus: action.payload.status };
    default:
      return state;
  }
};

export const getAppInitializedStatus = (state: AppRootStateType) => state.app.initializedStatus;
