import {CardsPackResponseType, CardsResponseType, ErrorResponseType} from '../types/responseTypes';
import {cardsApi} from '../api/cards-api';
import {handleNetworkError} from '../utils/errorUtils';
import {AxiosError} from 'axios';
import {AppRootStateType, TypedDispatch} from './store';
import { CardsAddPayloadType, CardsPackPayloadType, CardsPayloadType } from '../types/requestTypes';
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

export const setCardGrade = (id: string, grade: number) => ({
    type: 'packs/setCardGrade',
    grade,
    id
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
        await cardsApi.addCardsPack({cardsPack: {name}});
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
        await cardsApi.editCardsPack({cardsPack: {_id: id, name}});
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
        await cardsApi.removeCardsPack({id});
        dispatch(fetchCardsPack());
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleNetworkError(err);
        dispatch(setLoadingStatus(false));
    }
};

export const addCard = (payload: CardsAddPayloadType['card']) => async (dispatch: TypedDispatch) => {
    dispatch(setLoadingStatus(true));
    try {
        await cardsApi.addCards({ card: payload });
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleNetworkError(err);
        dispatch(setLoadingStatus(false));
    }
};

export const updateCardGrade = (card_id: string, grade: number) => async (dispatch: TypedDispatch) => {
    try {
        const response = await cardsApi.updateCardGrade({card_id, grade});
        dispatch(setCardGrade(response.data.updatedGrade.card_id, response.data.updatedGrade.grade));
    } catch (e) {
        const err = e as AxiosError<ErrorResponseType>;
        handleNetworkError(err);
    }
};

export type ActionsType =
    ReturnType<typeof setCardsPack>
    | ReturnType<typeof setCards>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof setCardGrade>;

export const PacksReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'packs/setLoadingStatus':
            return {...state, isLoading: action.payload};
        case 'packs/setCardsPack':
            return {...state, cardsPack: action.payload};
        case 'packs/setCards':
            return {...state, cards: action.payload};
        case 'packs/setCardGrade':
            if (state.cards && state.cards.cards) {
                return {
                    ...state,
                    cards: {
                        ...state.cards,
                        cards: state.cards.cards.map(c => c._id === action.id ? {...c, grade: action.grade} : c)
                    }
                }
            }

            return state;

        default:
            return state;
    }
};

export const getCardsPack = (state: AppRootStateType) => state.cardsPack.cardsPack;
export const getCards = (state: AppRootStateType) => state.cardsPack.cards;
export const getCardsPackLoadingStatus = (state: AppRootStateType) => state.cardsPack.isLoading;
export const getCardsForLearning = (state: AppRootStateType) => getCards(state)?.cards || [];
