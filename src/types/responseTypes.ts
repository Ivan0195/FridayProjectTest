export type ErrorResponseType = {
  error?: string | null;
};

export type UserResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
};

export type ResetPasswordResponseType = {
  info: string;
  error: string;
};

export type NewPasswordResponseType = {
  info: string
  error: string;
}

export type CardPackType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
  grade: number;
  more_id: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  user_name: string;
};

export type CardsPackResponseType = {
  cardPacks: CardPackType[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
};

export type CardsResponseType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type CardUpdatedGradeResponseType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}
