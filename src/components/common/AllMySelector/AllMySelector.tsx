import React, {useState} from 'react';
import {AppRootStateType, useTypedDispatch} from "../../../bll/store";
import {useSelector} from "react-redux";
import s from './AllMySelector.module.css'
import {setPacksUsedIdAC} from "../../../bll/packs-filter-settings-reducer";

const AllMySelector = () => {

    const dispatch = useTypedDispatch()
    const userId = useSelector<AppRootStateType, string>(state => state.login.userData._id)
    const [mine, setMine] = useState<boolean>(false)


    return (
            <div className={s.btnBlock}>
                <div className={`${s.btnOfLeftMenu} ${mine && s.active}`} onClick={() => { dispatch(setPacksUsedIdAC(userId)); setMine(true) }}>My</div>
                <div className={`${s.btnOfLeftMenu} ${!mine && s.active}`} onClick={() => { dispatch(setPacksUsedIdAC("")); setMine(false) }}>All</div>
            </div>
    );
};

export default AllMySelector;