import React from 'react';
import {useTypedDispatch} from "../../bll/store";
import {logoutTC} from "../../bll/login-reducer";

const Header = () => {
    const dispatch = useTypedDispatch()
    const logout = () => {
        dispatch(logoutTC());
    }
    return (
        <div>
            <span>IT-INCUBATOR</span>
            <a onClick={logout}>        Logout</a>
        </div>
    );
};

export default Header;