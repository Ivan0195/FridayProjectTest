const initialState = {
    min: 0,
    max: 0,
    sortCards: '0updated',
    page: 1,
    pageCount: 4,
    cardsPack_id: '',
    totalCardsCount: 0,
    cardAnswer: '',
    cardQuestion: '',
    grade: 1

}

export type FilterSettingsInitialStateType = typeof initialState;
export type SetCardsFilterActionType = ReturnType<typeof setCardAnswerAC>
    | ReturnType<typeof setSortCardsAC>
    | ReturnType<typeof setCardsPageAC>
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setCardUsedIdAC>
    | ReturnType<typeof setCardsCountOnPackAC>
    | ReturnType<typeof setCardQuestionAC>
    | ReturnType<typeof setCardGrade>

export const setCardAnswerAC = (cardAnswer: string) => ({type: 'CARDS/SET-CARDS-ANSWER', cardAnswer} as const)
export const setCardQuestionAC = (cardQuestion: string) => ({type: 'CARDS/SET-CARDS-QUESTION', cardQuestion} as const)
export const setSortCardsAC = (sortBy: string) => ({type: 'CARDS/SET-CARD-SORT-BY', sortBy} as const)
export const setCardsPageAC = (page: number) => ({type: 'CARDS/SET-CARD-PAGE', page} as const)
export const setCardsPageCountAC = (pageCount: number) => ({
    type: 'CARDS/SET-CARD-PAGE-COUNT',
    pageCount
} as const)
export const setCardUsedIdAC = (id: string) => ({type: 'CARDS/SET-CARD-USER-ID', id} as const)
export const setCardsCountOnPackAC = (totalCardsCount: number) => ({
    type: 'CARDS/SET-CARDS-COUNT',
    totalCardsCount
} as const)
export const setCardGrade = (id: string, grade: number) => ({
    type: 'CARDS/SET-CARDS-GRADE',
    grade: grade,
} as const);

export const cardsReducer = (state: FilterSettingsInitialStateType = initialState, action: SetCardsFilterActionType): FilterSettingsInitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS-ANSWER':
            return {...state, cardAnswer: action.cardAnswer, page: 1}
        case "CARDS/SET-CARDS-QUESTION":
            return {...state, cardQuestion: action.cardQuestion, page: 1}
        case 'CARDS/SET-CARD-SORT-BY':
            return {...state, sortCards: action.sortBy, page: 1}
        case "CARDS/SET-CARD-PAGE":
            return {...state, page: action.page}
        case "CARDS/SET-CARD-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "CARDS/SET-CARDS-COUNT":
            return {...state, totalCardsCount: action.totalCardsCount}
        case "CARDS/SET-CARDS-GRADE":
            return {...state, grade: action.grade}
        default:
            return {...state}
    }
}
