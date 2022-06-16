import { api } from './axios';
import {
  CardGradePayloadType,
  CardsAddPayloadType,
  CardsPackAddPayloadType,
  CardsPackDeletePayloadType, CardsPackEditPayloadType,
  CardsPackPayloadType,
  CardsPayloadType
} from '../types/requestTypes';
import {CardsPackResponseType, CardsResponseType, CardUpdatedGradeResponseType} from '../types/responseTypes';

export const cardsApi = {
  endpoints: {
    pack: '/cards/pack',
    card: '/cards/card',
    cardGrade: '/cards/grade'
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
  updateCardGrade(payload:CardGradePayloadType) {
    return api.put<CardUpdatedGradeResponseType>(this.endpoints.cardGrade, payload)
  },
  addCards(payload: CardsAddPayloadType) {
    return api.post<CardsAddPayloadType>(this.endpoints.card, payload);
  },
};
