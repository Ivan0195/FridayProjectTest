import React, {useState} from 'react';
import {AppRootStateType, useAppSelector, useTypedDispatch} from "../../../bll/store";
import {useSelector} from "react-redux";
import s from './AllMySelector.module.css'
import {setPacksUsedIdAC} from "../../../bll/packs-filter-settings-reducer";

export const AllMySelector = () => {

    const myUserName = useAppSelector<string>(state => state.packsFilterSettings.user_id)

    const dispatch = useTypedDispatch()
    const userId = useSelector<AppRootStateType, string>(state => state.login.userData._id)
    const [mine, setMine] = useState<boolean>(!!myUserName)


    return (
            <div className={s.btnBlock}>
                <div className={`${s.btnOfLeftMenu} ${mine && s.active}`} onClick={() => { dispatch(setPacksUsedIdAC(userId)); setMine(true) }}>My</div>
                <div className={`${s.btnOfLeftMenu} ${!mine && s.active}`} onClick={() => { dispatch(setPacksUsedIdAC("")); setMine(false) }}>All</div>
            </div>
    );
};
