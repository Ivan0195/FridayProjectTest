import React from 'react';
import './App.css';
import Page404 from "./Pages/404Page/404";
import Login from "./Pages/LoginPage/Login";
import Profile from "./Pages/ProfilePage/Profile";
import {Navigate, Route, Routes} from 'react-router-dom'
import Registration from "./Pages/RegistrationPage/Registration";
import PasswordReset from "./Pages/PasswordResetPage/PasswordReset";
import NewPassword from "./Pages/NewPasswordPage/NewPassword";
import Test from "./Pages/TestPage/Test";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import Header from "./Pages/Header/Header";

function App() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    return (
        <div>
            {isLoggedIn && <Header/>}
            <Routes>
                <Route path="profile" element={<Profile/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="password_reset" element={<PasswordReset/>}/>
                <Route path="new_password" element={<NewPassword/>}/>
                <Route path="test" element={<Test/>}/>
                <Route path="404" element={<Page404/>}/>
                <Route path="*" element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
