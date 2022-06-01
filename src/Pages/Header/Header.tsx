import React from 'react';
import {useTypedDispatch} from "../../bll/store";
import {logoutTC} from "../../bll/login-reducer";
import s from './Header.module.css'

const Header = () => {
    const dispatch = useTypedDispatch()
    const logout = () => {
        dispatch(logoutTC());
    }
    return (
        <div className={s.header}>
            <div className={s.container}>
                <span className={s.title}>IT-INCUBATOR</span>
                <a onClick={logout} className={s.logout}>Logout</a>
            </div>
        </div>
    );
};

export default Header;