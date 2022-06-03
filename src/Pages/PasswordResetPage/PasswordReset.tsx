import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {sendTokenTC} from "../../bll/reset-password-reducer";
import {CheckEmail} from "../CheckEmailPage/CheckEmail";
import {AppRootStateType, useTypedDispatch} from "../../bll/store";
import {Navigate, NavLink} from 'react-router-dom'
import s from './PasswordReset.module.css'
import LinearPreloader from "../../components/common/LinearPreloader/LinearPreloader";
import SuperButton from "../ProfilePage/common/Button/SuperButton";
import AppInput from "../../components/common/AppInput/AppInput";

const PasswordReset = () => {

    //useState
    const [email, setEmail] = useState<string>("")

    //useSelectors
    const tokenIsSent = useSelector<AppRootStateType, boolean>((state) => state.resetPassword.tokenIsSent)
    const appStatus = useSelector<AppRootStateType, string>((state) => state.appStatus.requestStatus)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useTypedDispatch()

    const buttonCallback = () => {
        dispatch(sendTokenTC(email))
    }

    if (tokenIsSent) {
        return <CheckEmail />
    }
    if (isLoggedIn) {
        return <Navigate to='/profile' />
    }

    return (
        <div className={s.wrapper} >
            <div className={s.recoveryContainer}>
                <h2 className={s.title}>It-incubator</h2>
                <p className={s.subTitle}>Forgot your password?</p>
                {appStatus === 'pending' ? <LinearPreloader /> : null}
                                <AppInput className={s.input} value={email} onChangeText={setEmail} placeholder={'E-mail'}/>
                <div className={s.info}>
                    <p>Enter your email address and we will send you further instructions </p>
                </div>
                <div>
                    <SuperButton style={{ width: "266px", marginTop: "100px" }} disabled={appStatus === "pending"} onClick={buttonCallback}>SEND</SuperButton>
                </div>
                <div className={s.info}>
                    <p>Did you remember your password?</p>
                </div>
                <div className={s.goLogin}><NavLink to={'/login'}>Try to log in again</NavLink></div>
            </div>
        </div >
    );
};

export default PasswordReset;