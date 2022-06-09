import { CardsPackResponseType, CardsResponseType, ErrorResponseType } from '../types/responseTypes';
import { cardsApi } from '../api/cards-api';
import { handleNetworkError } from '../utils/errorUtils';
import { AxiosError } from 'axios';
import { AppDispatch, AppRootStateType } from './store';
import { CardsPackPayloadType, CardsPayloadType } from '../types/requestTypes';
import { setAppStatusAC } from './common-app-reducer';

type InitialStateType = {
  cardsPack: null | CardsPackResponseType;
  cards: null | CardsResponseType;
};

const initialState: InitialStateType = {
  cardsPack: null,
  cards: null,
};

export const setCardsPack = (cardsPack: CardsPackResponseType | null) => ({
  type: 'packs/setCardsPack',
  payload: cardsPack,
} as const);

export const setCards = (cards: CardsResponseType | null) => ({
  type: 'packs/setCards',
  payload: cards,
} as const);

export const fetchCardsPack = () =>
  async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    try {
      const payload: CardsPackPayloadType = {
        pageCount: 10,
      }; // getState...
      const response = await cardsApi.getCardsPack(payload);
      dispatch(setCardsPack(response.data));
    } catch (e) {
      const err = e as AxiosError<ErrorResponseType>;
      handleNetworkError(err);
    }
  };

export const fetchCard = (id: string) =>
  async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    try {
      const payload: CardsPayloadType = {
        cardsPack_id: id,
        pageCount: 10,
      }; // getState...
      const response = await cardsApi.getCards(payload);
      dispatch(setCards(response.data));
    } catch (e) {
      const err = e as AxiosError<ErrorResponseType>;
      handleNetworkError(err);
    }
  };

export type ActionsType = ReturnType<typeof setCardsPack> | ReturnType<typeof setCards>;

export const PacksReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'packs/setCardsPack':
      return { ...state, cardsPack: action.payload };
    case 'packs/setCards':
      return { ...state, cards: action.payload };
    default:
      return state;
  }
};

export const getCardsPack = (state: AppRootStateType) => state.cardsPack.cardsPack;
export const getCards = (state: AppRootStateType) => state.cardsPack.cards;
