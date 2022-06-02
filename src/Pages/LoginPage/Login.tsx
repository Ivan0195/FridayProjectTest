import React, {memo, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "../../bll/store";
import {loginTC} from "../../bll/login-reducer";
import {Navigate, NavLink} from 'react-router-dom'
import SuperCheckbox from "../../SuperComponents/SuperCheckbox/SuperCheckbox";
import s from './Login.module.css'
import SuperButton from "../ProfilePage/common/Button/SuperButton";
import {Input} from "../ProfilePage/common/Input/Input";

const Login = memo(() => {

        const dispatch = useTypedDispatch();
        const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
        const error = useSelector<AppRootStateType, string | null>((state) => state.login.error)

        const [email, setEmail] = useState<string>("")
        const [password, setPassword] = useState<string>("")
        const [rememberMe, setRememberMe] = useState<boolean>(false)

        const onButtonCLickHandler = () => dispatch(loginTC(email, password, rememberMe))
        const checkboxHandler = () => setRememberMe(!rememberMe)

        if (isLoggedIn) {
            return <Navigate to={"/profile"}/>
        }

        return (
            <div className={s.container}>
                <div className={s.loginContainer}>
                    <h2>It-incubator</h2>
                    <p>Sign In</p>
                    {error && <div className={s.formSummaryError}>{error}</div>}
                    <div className={s.inputs}>
                        <Input value={email} onChange={setEmail} placeholder="Email"
                                        error={error ? error : ''}/>
                        <Input value={password} onChange={setPassword} placeholder="Password"
                                        error={error ? error : ''}/>
                    </div>
                    <span><SuperCheckbox checked={rememberMe} onChange={checkboxHandler}/> Remember Me</span>
                    <div><SuperButton onClick={onButtonCLickHandler}>Login</SuperButton></div>
                    <div>
                        <p>Don’t have an account?</p>
                        <div><NavLink to={'/registration'}> Sign Up</NavLink></div>
                    </div>
                </div>
            </div>
        );
    }
)

export default Login;