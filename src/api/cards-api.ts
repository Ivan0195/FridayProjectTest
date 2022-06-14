import { api } from './axios';
import {
  CardsPackAddPayloadType,
  CardsPackDeletePayloadType, CardsPackEditPayloadType,
  CardsPackPayloadType,
  CardsPayloadType
} from '../types/requestTypes';
import { CardsPackResponseType, CardsResponseType } from '../types/responseTypes';

export const cardsApi = {
  endpoints: {
    pack: '/cards/pack',
    card: '/cards/card',
  },
  getCardsPack(params: CardsPackPayloadType = {}) {
    return api.get<CardsPackResponseType>(this.endpoints.pack, { params });
  },
  getCards(params: CardsPayloadType) {
    return api.get<CardsResponseType>(this.endpoints.card, { params });
  },
  addCardsPack(payload: CardsPackAddPayloadType) {
    return api.post<CardsPackAddPayloadType>(this.endpoints.pack, payload);
  },
  editCardsPack(payload: CardsPackEditPayloadType) {
    return api.put<CardsPackEditPayloadType>(this.endpoints.pack, payload);
  },
  removeCardsPack(params: CardsPackDeletePayloadType) {
    return api.delete(this.endpoints.pack, { params });
  },
};
