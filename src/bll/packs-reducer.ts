import {CardsPackResponseType, CardsResponseType, ErrorResponseType} from '../types/responseTypes';
import {cardsApi} from '../api/cards-api';
import {handleNetworkError} from '../utils/errorUtils';
import {AxiosError} from 'axios';
import { AppDispatch, AppRootStateType, TypedDispatch } from './store';
import {CardsPackPayloadType, CardsPayloadType} from '../types/requestTypes';
import {setCardsCountAC} from './packs-filter-settings-reducer';
import {setCardsCountOnPackAC} from "./cards-reducer";

type InitialStateType = {
    cardsPack: null | CardsPackResponseType;
    cards: null | CardsResponseType;
    isLoading: boolean;
};

const initialState: InitialStateType = {
    cardsPack: null,
    cards: null,
    isLoading: false,
};

export const setLoadingStatus = (status: boolean) => ({
    type: 'packs/setLoadingStatus',
    payload: status,
} as const);

export const setCardsPack = (cardsPack: CardsPackResponseType | null) => ({
    type: 'packs/setCardsPack',
    payload: cardsPack,
} as const);

export const setCards = (cards: CardsResponseType | null) => ({
    type: 'packs/setCards',
    payload: cards,
} as const);

export const fetchCardsPack = () =>
    async (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
        try {
            dispatch(setLoadingStatus(true));
            const payload: CardsPackPayloadType = {
                pageCount: getState().packsFilterSettings.pageCount || 10,
                packName: getState().packsFilterSettings.packName,
                min: getState().packsFilterSettings.min,
                max: getState().packsFilterSettings.max,
                page: getState().packsFilterSettings.page,
                user_id: getState().packsFilterSettings.user_id,
                sortPacks: getState().packsFilterSettings.sortPacks,
            }; // getState...
            const response = await cardsApi.getCardsPack(payload);
            dispatch(setCardsCountAC(response.data.cardPacksTotalCount));
            dispatch(setCardsPack(response.data));
        } catch (e) {
            const err = e as AxiosError<ErrorResponseType>;
            handleNetworkError(err);
        } finally {
            dispatch(setLoadingStatus(false));
        }
    };

export const fetchCard = (id: string) =>
    async (dispatch: TypedDispatch, getState: () => AppRootStateType) => {
        try {
            const payload: CardsPayloadType = {
                cardsPack_id: id,
                pageCount: getState().cardsSettings.pageCount,
                page: getState().cardsSettings.page,
                cardQuestion: getState().cardsSettings.cardQuestion
            }; // getState...
            const response = await cardsApi.getCards(payload);
            dispatch(setCards(response.data));
            dispatch(setCardsCountOnPackAC(response.data.cardsTotalCount))
        } catch (e) {
            const err = e as AxiosError<ErrorResponseType>;
            handleNetworkError(err);
        }
    };

export const addCardPack = (name: string) => async (dispatch: TypedDispatch) => {
    dispatch(setLoadingStatus(true));
    try {
        await cardsApi.addCardsPack({ cardsPack: { name } });
        dispatch(fetchCardsPack());
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleNetworkError(err);
        dispatch(setLoadingStatus(false));
    }
};

export const editCardPack = (id: string, name: string) => async (dispatch: TypedDispatch) => {
    dispatch(setLoadingStatus(true));
    try {
        await cardsApi.editCardsPack({ cardsPack: { _id: id, name } });
        dispatch(fetchCardsPack());
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleNetworkError(err);
        dispatch(setLoadingStatus(false));
    }
};

export const removeCardPack = (id: string) => async (dispatch: TypedDispatch) => {
    dispatch(setLoadingStatus(true));
    try {
        await cardsApi.removeCardsPack({ id });
        dispatch(fetchCardsPack());
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleNetworkError(err);
        dispatch(setLoadingStatus(false));
    }
};

export type ActionsType =
    ReturnType<typeof setCardsPack>
    | ReturnType<typeof setCards>
    | ReturnType<typeof setLoadingStatus>;

export const PacksReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'packs/setLoadingStatus':
            return {...state, isLoading: action.payload};
        case 'packs/setCardsPack':
            return {...state, cardsPack: action.payload};
        case 'packs/setCards':
            return {...state, cards: action.payload};
        default:
            return state;
    }
};

export const getCardsPack = (state: AppRootStateType) => state.cardsPack.cardsPack;
export const getCards = (state: AppRootStateType) => state.cardsPack.cards;
export const getCardsPackLoadingStatus = (state: AppRootStateType) => state.cardsPack.isLoading;
