import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Navigate, useParams} from 'react-router-dom';
import style from "./NewPassword.module.css";
import s from './NewPassword.module.css'
import {newPassTC, setAppErrorAC} from "../../bll/new-password-reducer";
import {AppRootStateType, useTypedDispatch} from "../../bll/store";
import LinearPreloader from "../../components/common/LinearPreloader/LinearPreloader";
import SuperButton from "../ProfilePage/common/Button/SuperButton";
import AppInput from "../../components/common/AppInput/AppInput";

export const NewPassword = React.memo(() => {
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
    const dispatch = useTypedDispatch()
    const { token } = useParams<{ token: string }>()

    const status = useSelector<AppRootStateType, string>((state) => state.appStatus.requestStatus)
    const error = useSelector<AppRootStateType, string | null>((state) => state.newPassword.error)
    const isAccepted = useSelector<AppRootStateType, boolean>(state => state.newPassword.isAccepted)

    if (isAccepted) {
        return <Navigate to={"/login"} />;
    }
    const buttonCallback = () => {
        if (password === passwordConf && !!token) {
            dispatch(newPassTC(password, token))
        } else {
            dispatch(setAppErrorAC("Password mismatch"))
        }
    }

    return (
        <div className={s.wrapper}>
            <div className={s.newPassContainer}>
                <h2 className={s.title}>It-incubator</h2>
                <p className={s.subTitle}>Create new password</p>
                {status === 'pending' ? <LinearPreloader /> : null}
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
                <div className={s.inputs}>
                    <AppInput className={s.input} value={password} onChangeText={setPassword} placeholder={'Password'} />
                    <AppInput className={s.input} value={passwordConf} onChangeText={setPasswordConf} placeholder={'Confirm Password'} />
                </div>
                <div className={s.info}>
                    <p>Create new password and we will send you further instructions to email</p>
                </div>
                <div>
                    <SuperButton style={{ width: "266px" }} disabled={status === "pending"} onClick={buttonCallback}>Create new password</SuperButton>
                </div>
            </div>
        </div>
    );
})