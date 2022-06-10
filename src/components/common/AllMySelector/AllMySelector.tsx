import React, {useState} from 'react';
import {AppRootStateType, useAppSelector, useTypedDispatch} from "../../../bll/store";
import {useSelector} from "react-redux";
import s from './AllMySelector.module.css'
import {setPacksUsedIdAC} from "../../../bll/packs-filter-settings-reducer";
import {notificationHandler} from "../../../utils/errorUtils";

export const AllMySelector = () => {

    const myUserName = useAppSelector<string>(state => state.packsFilterSettings.user_id)

    const dispatch = useTypedDispatch()
    const userId = useSelector<AppRootStateType, string>(state => state.login.userData._id)
    const loadingStatus = useAppSelector<boolean>(state => state.cardsPack.isLoading)
    const [mine, setMine] = useState<boolean>(!!myUserName)

    const dispatchValues = (userId:string) => {
        dispatch(setPacksUsedIdAC(userId))
        setMine(!!userId)
    }

    const onclickHandler = (userId: string) => {
        loadingStatus
            ? notificationHandler('wait for previous operation')
            : dispatchValues(userId)
    }


    return (
        <div className={s.btnBlock}>
            <div className={`${s.btnOfLeftMenu} ${mine && s.active}`} onClick={() => {
                onclickHandler(userId);
            }}>My
            </div>
            <div className={`${s.btnOfLeftMenu} ${!mine && s.active}`} onClick={() => {
                onclickHandler('');
            }}>All
            </div>
        </div>
    );
};
