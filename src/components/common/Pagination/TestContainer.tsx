import {Search} from "../SearchBlock/Search";
import {Pagination} from "./Pagination";
import {getCards, setPackNameAC, setPacksPageAC, setPacksPageCountAC} from "../../../bll/packs-filter-settings-reducer";
import React, {useEffect} from "react";
import {useAppSelector, useTypedDispatch} from "../../../bll/store";


export const Test = () => {
    const totalItemsCount = useAppSelector<number>(state => state.packsFilterSettings.totalCardsCount)
    const itemsOnPageCount = useAppSelector<number>(state => state.packsFilterSettings.pageCount)
    const currentPage = useAppSelector<number>(state => state.packsFilterSettings.page)
    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch(getCards(1))
    }, [dispatch, itemsOnPageCount])


    const onChangeSearchHandler = (value: string) => {
        dispatch(setPackNameAC(value))
    }

    const onPageChangedHandler = (pageNumber: number) => {
        dispatch(setPacksPageAC(pageNumber))
        dispatch(getCards(pageNumber))
    }

    const onChangeItemsCountHandler = (value: number) => {
        dispatch(setPacksPageCountAC(value))
    }

    return <>
        <Search onChange={onChangeSearchHandler}/>
        <Pagination currentPage={currentPage}
                    itemsOnPageCount={itemsOnPageCount}
                    totalItemsCount={totalItemsCount}
                    onPageChanged={onPageChangedHandler}
                    onChangeItemsOnPageCount={onChangeItemsCountHandler}
        />
    </>
}