import { api } from './axios';
import { CardsPackPayloadType, CardsPayloadType } from '../types/requestTypes';
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
};
