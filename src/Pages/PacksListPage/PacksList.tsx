import React, {useEffect} from 'react';
import s from './PacksListPage.module.css'
import {AllMySelector} from "../../components/common/AllMySelector/AllMySelector";
import {DoubleRange} from "../../components/common/DoubleRange/DoubleRange";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppSelector, useTypedDispatch} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {Packs} from '../Packs';
import {Pagination} from '../../components/common/Pagination/Pagination';
import {setPackNameAC, setPacksPageAC, setPacksPageCountAC,} from '../../bll/packs-filter-settings-reducer';
import {Search} from '../../components/common/SearchBlock/Search';
import {fetchCardsPack} from '../../bll/packs-reducer';
import SuperButton from "../ProfilePage/common/Button/SuperButton";

export const PacksList = () => {
    const loadingStatus = useAppSelector<boolean>(state => state.cardsPack.isLoading)
    const totalItemsCount = useAppSelector(state => state.packsFilterSettings.totalCardsCount)
    const itemsOnPageCount = useAppSelector<number>(state => state.packsFilterSettings.pageCount)
    const packName = useAppSelector(state => state.packsFilterSettings.packName)
    const min = useAppSelector<number>(state => state.packsFilterSettings.min)
    const max = useAppSelector<number>(state => state.packsFilterSettings.max)
    const sortPacks = useAppSelector(state => state.packsFilterSettings.sortPacks)
    const currentPage = useAppSelector<number>(state => state.packsFilterSettings.page)
    const user_id = useAppSelector(state => state.packsFilterSettings.user_id)
    const dispatch = useTypedDispatch()

    useEffect(() => {
        dispatch(fetchCardsPack());
    }, [dispatch, itemsOnPageCount, totalItemsCount, packName, min, max, currentPage, sortPacks, user_id]);

    const onChangeSearchHandler = (value: string) => {
        dispatch(setPackNameAC(value))
    }

    const onPageChangedHandler = (pageNumber: number) => {
        dispatch(setPacksPageAC(pageNumber))
    }

    const onChangeItemsCountHandler = (value: number) => {
        dispatch(setPacksPageCountAC(value))
    }

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.sideBar}>
                    <h3 className={s.sideBarTitle}>Show Packs Cards</h3>
                    <div className={s.ownSelector}>
                        <AllMySelector/>
                    </div>
                    <h3 className={s.sideBarTitle}>Number of Cards</h3>
                    <div className={s.ownSelector}>
                        <DoubleRange/>
                    </div>
                </div>
                <div className={s.packsBar}>
                    <h1 className={s.packsBarTitle}>Packs List</h1>
                    <div className={s.packsBarActions}>
                        <Search onChange={onChangeSearchHandler}/>
                        <SuperButton>Add new pack</SuperButton>
                    </div>
                    <div className={s.packsBarContent}>
                        <Packs/>
                    </div>
                    <Pagination currentPage={currentPage}
                                itemsOnPageCount={itemsOnPageCount}
                                totalItemsCount={totalItemsCount}
                                onPageChanged={onPageChangedHandler}
                                onChangeItemsOnPageCount={onChangeItemsCountHandler}
                    />
                </div>
            </div>
        </div>
    );
};
