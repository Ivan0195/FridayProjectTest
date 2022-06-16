import React, {useEffect} from 'react';
import s from './ProfilePage.module.css'
import {DoubleRange} from "../../components/common/DoubleRange/DoubleRange";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppSelector, useTypedDispatch} from "../../bll/store";
import {Navigate, NavLink} from "react-router-dom";
import {Pagination} from '../../components/common/Pagination/Pagination';
import {
    setPackNameAC,
    setPacksPageAC,
    setPacksPageCountAC,
    setPacksUsedIdAC,
} from '../../bll/packs-filter-settings-reducer';
import {Search} from '../../components/common/SearchBlock/Search';
import {fetchCardsPack} from '../../bll/packs-reducer';
import {UserResponseType} from "../../types/responseTypes";
import {getUserData} from "../../bll/login-reducer";
import {Packs} from "../../components/Packs";
export const ProfilePage = () => {

    const totalItemsCount = useAppSelector(state => state.packsFilterSettings.totalCardsCount)
    const itemsOnPageCount = useAppSelector<number>(state => state.packsFilterSettings.pageCount)
    const packName = useAppSelector(state => state.packsFilterSettings.packName)
    const min = useAppSelector<number>(state => state.packsFilterSettings.min)
    const max = useAppSelector<number>(state => state.packsFilterSettings.max)
    const sortPacks = useAppSelector(state => state.packsFilterSettings.sortPacks)
    const currentPage = useAppSelector<number>(state => state.packsFilterSettings.page)
    const userName = useAppSelector<string>(state => state.login.userData.name)
    const dispatch = useTypedDispatch()
    const user = useSelector<AppRootStateType, UserResponseType>(getUserData);

    useEffect(() => {
        dispatch(setPacksUsedIdAC(user._id))
        dispatch(fetchCardsPack());
    }, [dispatch, itemsOnPageCount, packName, min, max, currentPage, sortPacks]);

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
                    <div className={s.imgContainer}>
                        <img alt={'Photo'}
                             src={user.avatar ? user.avatar : 'https://cyberpsy.ru/wp-content/uploads/2017/10/cyberpsy_post_image_80-1024x683.jpg'}/>
                        <h3>{userName}</h3>
                        <div><NavLink to={'/profile/edit'}> Edit profile </NavLink></div>
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