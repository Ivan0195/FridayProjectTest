import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";

const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (

        <div>
            PROFILE PAGE
        </div>
    );
};

export default Profile;