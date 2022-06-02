import s from './Header.module.css'
import packsListIcon from './icons/Group 608.png'
import profileIcon from './icons/Group 607.png'
import logoutIcon from './icons/logout.png'
import {MenuItem} from "./MenuItem/MenuItem";
import React from "react";
import {useTypedDispatch} from "../../bll/store";
import {logoutTC} from "../../bll/login-reducer";

export const Header = () => {
    const dispatch = useTypedDispatch()
    const logout = () => {
        dispatch(logoutTC());
    }
    return (
        <div className={s.header}>
            <h2 className={s.headerText}>It-incubator</h2>
            <div className={s.menu}>
                <MenuItem title={'Packs list'} link={'/ty'} icon={packsListIcon}/>
                <MenuItem title={'Profile'} link={'/profile'} icon={profileIcon}/>
            </div>
            <div className={s.logout}>
                <MenuItem title={'Logout'} onClick={logout} link={'/login'} icon={logoutIcon}/>
            </div>
            {/*<a onClick={logout} className={s.logout}>Logout</a>*/}
        </div>
    )
}

