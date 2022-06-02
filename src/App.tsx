import React, { useEffect } from 'react';
import { RegistrationPage } from './Pages/RegistrationPage';
import Profile from './Pages/ProfilePage/Profile';
import PasswordReset from './Pages/PasswordResetPage/PasswordReset';
import NewPassword from './Pages/NewPasswordPage/NewPassword';
import Page404 from './Pages/404Page/404';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Pages/LoginPage/Login";
import { Navigate, Route, Routes } from 'react-router-dom'
import Test from "./Pages/TestPage/Test";
import { useSelector } from "react-redux";
import { AppRootStateType, useTypedDispatch } from "./bll/store";
import { AppStatusType } from "./bll/common-app-reducer";
import { authTC } from "./bll/login-reducer";
import {Header} from "./Pages/Header/Header";

function App() {
    useEffect(() => {
        dispatch(authTC())
    }, [])

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.appStatus.requestStatus)
    const authMeError = useSelector<AppRootStateType, string | null>(state => state.login.authMeError)
    const dispatch = useTypedDispatch()

    if (appStatus === 'pending') {
        return <div className={'App'}><img src={'https://i.gifer.com/Q46y.gif'}/></div>
    } else {
        return (
            <div className={'App'}>
                {isLoggedIn && <Header/>}
                <Routes>
                        <Route path="/" element={<Profile/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="registration" element={<RegistrationPage/>}/>
                        <Route path="password_reset" element={<PasswordReset/>}/>
                        <Route path="new_password" element={<NewPassword/>}/>
                        <Route path="test" element={<Test/>}/>
                        <Route path="404" element={<Page404/>}/>
                        <Route path="*" element={<Navigate to={'/404'}/>}/>
                    </Routes>
              <ToastContainer position="bottom-left" hideProgressBar />
            </div>
        );
    }
}

export default App;
