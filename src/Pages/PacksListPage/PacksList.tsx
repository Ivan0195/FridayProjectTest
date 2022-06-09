import React from 'react';
import s from './PacksListPage.module.css'
import {AllMySelector} from "../../components/common/AllMySelector/AllMySelector";
import {DoubleRange} from "../../components/common/DoubleRange/DoubleRange";
import {SortPacksBlock} from "../../components/common/SortPacksBlock/SortPacksBlock";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {Navigate} from "react-router-dom";

export const PacksList = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.sideBar}>
                    <h3>Show Packs Cards</h3>
                    <AllMySelector/>
                    <h3>Number of Cards</h3>
                    <DoubleRange/>
                </div>
                <div className={s.packsBar}>
                    <h1>Packs List</h1>
                    <h3>Place for Search component</h3>
                    <SortPacksBlock/>
                    <h3>Place for Packs Table</h3>
                    <h3>Place for Paginator component</h3>
                </div>
            </div>
        </div>
    );
};
