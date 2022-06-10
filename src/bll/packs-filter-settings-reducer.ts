const initialState = {
    packName: '',
    min: 0,
    max: 103,
    sortPacks: '0updated',
    page: 1,
    pageCount: 4,
    user_id: '',
    totalCardsCount: 0
}

export type FilterSettingsInitialStateType = typeof initialState;
export type SetPacksFilterActionType = ReturnType<typeof setPackNameAC>
    | ReturnType<typeof setMinCardsCountAC>
    | ReturnType<typeof setMaxCardsCountAC>
    | ReturnType<typeof setSortPacksAC>
    | ReturnType<typeof setPacksPageAC>
    | ReturnType<typeof setPacksPageCountAC>
    | ReturnType<typeof setPacksUsedIdAC>
    | ReturnType<typeof setCardsCountAC>

export const setPackNameAC = (packName: string) => ({type: 'PACKS-FILTER/SET-PACK-NAME', packName} as const)
export const setMinCardsCountAC = (min: number) => ({type: 'PACKS-FILTER/SET-PACK-MIN-CARDS', min} as const)
export const setMaxCardsCountAC = (max: number) => ({type: 'PACKS-FILTER/SET-PACK-MAX-CARDS', max} as const)
export const setSortPacksAC = (sortBy: string) => ({type: 'PACKS-FILTER/SET-PACK-SORT-BY', sortBy} as const)
export const setPacksPageAC = (page: number) => ({type: 'PACKS-FILTER/SET-PACK-PAGE', page} as const)
export const setPacksPageCountAC = (pageCount: number) => ({
    type: 'PACKS-FILTER/SET-PACK-PAGE-COUNT',
    pageCount
} as const)
export const setPacksUsedIdAC = (id: string) => ({type: 'PACKS-FILTER/SET-PACK-USER-ID', id} as const)
export const setCardsCountAC = (totalCardsCount: number) => ({
    type: 'PACKS-FILTER/SET-CARDS-COUNT',
    totalCardsCount
} as const)

export const packsFilterSettingsReducer = (state: FilterSettingsInitialStateType = initialState, action: SetPacksFilterActionType): FilterSettingsInitialStateType => {
    switch (action.type) {
        case 'PACKS-FILTER/SET-PACK-NAME':
            return {...state, packName: action.packName, page: 1}
        case "PACKS-FILTER/SET-PACK-MIN-CARDS":
            return {...state, min: action.min, page: 1}
        case "PACKS-FILTER/SET-PACK-MAX-CARDS":
            return {...state, max: action.max, page: 1}
        case "PACKS-FILTER/SET-PACK-SORT-BY":
            return {...state, sortPacks: action.sortBy, page: 1}
        case "PACKS-FILTER/SET-PACK-PAGE":
            return {...state, page: action.page}
        case "PACKS-FILTER/SET-PACK-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "PACKS-FILTER/SET-PACK-USER-ID":
            return {...state, user_id: action.id}
        case "PACKS-FILTER/SET-CARDS-COUNT":
            return {...state, totalCardsCount: action.totalCardsCount}
        default:
            return {...state}
    }
}
