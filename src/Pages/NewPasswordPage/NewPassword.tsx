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
import {AppStatusType} from "../../bll/common-app-reducer";
import AppButton from "../../components/common/AppButton/AppButton";
import {ReactComponent as OffEye} from "../../assets/images/iconmonstr-eye-10.svg";
import {ReactComponent as OnEye} from "../../assets/images/iconmonstr-eye-9.svg";

export const NewPassword = React.memo(() => {

    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
    const dispatch = useTypedDispatch()
    const {token} = useParams<{ token: string }>()

    const status = useSelector<AppRootStateType, AppStatusType>((state) => state.appStatus.requestStatus)
    const error = useSelector<AppRootStateType, string | null>((state) => state.newPassword.error)
    const isAccepted = useSelector<AppRootStateType, boolean>(state => state.newPassword.isAccepted)


    const [showPassword, setShowPassword] = useState(false);
    const PasswordIcon = showPassword ? OffEye : OnEye;
    const onPasswordIconClick = () => {
        setShowPassword(!showPassword);
    };
    const [showConfPassword, setShowConfPassword] = useState(false);
    const ConfPasswordIcon = showConfPassword ? OffEye : OnEye;
    const onPasswordConfIconClick = () => {
        setShowConfPassword(!showConfPassword);
    };

    const passwordFieldType = showPassword ? 'text' : 'password';
    const confPasswordFieldType = showConfPassword ? 'text' : 'password';

    if (isAccepted) {
        return <Navigate to={"/login"}/>;
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
                {status === 'pending' ? <LinearPreloader/> : null}
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
                <div className={s.inputs}>
                    <AppInput className={s.input} value={password} onChangeText={setPassword}
                              type={passwordFieldType}
                              placeholder={'Password'}
                              endAddition={
                                  <AppButton type="button" iconButton
                                             onClick={onPasswordIconClick}><PasswordIcon/></AppButton>
                              }/>
                    <AppInput className={s.input} value={passwordConf} onChangeText={setPasswordConf}
                              type={confPasswordFieldType}
                              placeholder={'Confirm Password'}
                              endAddition={
                                  <AppButton type="button" iconButton
                                             onClick={onPasswordConfIconClick}><ConfPasswordIcon/></AppButton>
                              }/>
                </div>
                <div className={s.info}>
                    <p>Create new password and we will send you further instructions to email</p>
                </div>
                <div>
                    <SuperButton style={{width: "266px"}} disabled={status === "pending"} onClick={buttonCallback}>Create
                        new password</SuperButton>
                </div>
            </div>
        </div>
    );
})