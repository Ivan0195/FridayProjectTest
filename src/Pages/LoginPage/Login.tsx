import React, {memo, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "../../bll/store";
import {loginTC} from "../../bll/login-reducer";
import {Navigate} from 'react-router-dom'
import s from './Login.module.css'
import cn from 'classnames';
import styles from "../../components/forms/SignUp/SignUp.module.css";
import AppInput from "../../components/common/AppInput/AppInput";
import AppButton from "../../components/common/AppButton/AppButton";
import {useFormik} from "formik";
import AppCheckbox from "../../components/common/AppCheckbox/AppCheckbox";
import {ReactComponent as OffEye} from "../../assets/images/iconmonstr-eye-10.svg";
import {ReactComponent as OnEye} from "../../assets/images/iconmonstr-eye-9.svg";
import {AppStatusType} from "../../bll/common-app-reducer";

const Login = memo(() => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
        },
    })

    const [showPassword, setShowPassword] = useState(false);
    const PasswordIcon = showPassword ? OffEye : OnEye;
    const onPasswordIconClick = () => {
        setShowPassword(!showPassword);
    };

    const dispatch = useTypedDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const appStatus = useSelector<AppRootStateType, AppStatusType>((state) => state.appStatus.requestStatus)
    const passwordFieldType = showPassword ? 'text' : 'password';


    if (isLoggedIn) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div>
            <h3 className={cn('title', styles.title)}>Sign In</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.inputs}>
                    <AppInput className={cn(styles.field)}
                              label="E-mail"
                              name={'email'}
                              onChange={formik.handleChange}
                              value={formik.values.email}
                    />
                    <AppInput
                        label="Password"
                        name="password"
                        className={cn(styles.field)}
                        type={passwordFieldType}
                        endAddition={
                            <AppButton type="button" iconButton
                                       onClick={onPasswordIconClick}><PasswordIcon/></AppButton>
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                </div>
                <div className={s.remember}>
                    <AppCheckbox name={'rememberMe'}
                                   onChange={formik.handleChange}
                                   checked={formik.values.rememberMe}
                /> Remember Me
                </div>
                <div><AppButton type="submit" disabled={appStatus === 'pending'} className={cn(styles.button)}
                                onClick={() => formik.handleSubmit()}>LOGIN</AppButton></div>
            </form>
        </div>
    );
})


export default Login;
