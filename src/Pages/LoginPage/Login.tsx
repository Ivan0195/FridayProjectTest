import React, {memo, useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "../../bll/store";
import {loginTC} from "../../bll/login-reducer";
import {Navigate, NavLink} from 'react-router-dom'
import SuperButton from "../../SuperComponents/SuperButton/SuperButton";
import SuperCheckbox from "../../SuperComponents/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../SuperComponents/SuperInput/SuperInputText";
import s from './Login.module.css'

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
                        <SuperInputText value={email} onChangeText={setEmail} placeholder="email"
                                        error={error ? error : ''}/>
                        <SuperInputText value={password} onChangeText={setPassword} placeholder="password"
                                        error={error ? error : ''}/>
                    </div>
                    <span><SuperCheckbox checked={rememberMe} onChange={checkboxHandler}/> Remember Me</span>
                    <div><SuperButton onClick={onButtonCLickHandler} style={{width: "266px"}}>Login</SuperButton></div>
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