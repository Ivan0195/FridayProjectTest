import React, {useEffect} from 'react';
import {RegistrationPage} from './Pages/RegistrationPage';
import Profile from './Pages/ProfilePage/Profile';
import PasswordReset from './Pages/PasswordResetPage/PasswordReset';
import Page404 from './Pages/404Page/404';
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate, Route, Routes} from 'react-router-dom'
import Test from "./Pages/TestPage/Test";
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "./bll/store";
import {AppStatusType} from "./bll/common-app-reducer";
import {authTC} from "./bll/login-reducer";
import LinearPreloader from "./components/common/LinearPreloader/LinearPreloader";
import {LoginContainer} from "./Pages/LoginPage/LoginContainer";
import {Header} from "./Pages/Header/Header";
import {NewPassword} from "./Pages/NewPasswordPage/NewPassword";
import {PacksList} from "./Pages/PacksListPage/PacksList";
import {CardsPage} from './Pages/CardsPage';
import {ProfilePage} from "./Pages/ProfilePage/ProfilePage";
import { CardsLearningContainer } from './Pages/CardsLearning/CardsLearningContainer';

function App() {
    useEffect(() => {
        dispatch(authTC())
    }, [])

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.appStatus.requestStatus)
    const dispatch = useTypedDispatch()

    if (appStatus === 'pending') {
        return <div className={'App'}><LinearPreloader/></div>
    } else {
        return (
            <div className={'App'}>
                {isLoggedIn && <Header/>}
                <Routes>
                    <Route path="/" element={<Navigate to={'/profile'}/>}/>
                    <Route path="/profile">
                        <Route path="" element={<ProfilePage/>}/>
                        <Route path="edit" element={<Profile/>}/>
                        <Route path=":id" element={<CardsPage/>}/>
                    </Route>
                    <Route path="/login" element={<LoginContainer/>}/>
                    <Route path="/registration" element={<RegistrationPage/>}/>
                    <Route path="/password_reset" element={<PasswordReset/>}/>
                    <Route path="/new_password/:token" element={<NewPassword/>}/>
                    <Route path="/packs_list">
                        <Route path="" element={<PacksList/>}/>
                        <Route path=":id" element={<CardsPage/>}/>
                    </Route>
                    <Route path="/pack_learn/:id" element={<CardsLearningContainer/>}/>
                    <Route path="/test" element={<Test/>}/>
                    <Route path="/404" element={<Page404/>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>
                <ToastContainer position="bottom-left" hideProgressBar/>
            </div>
        );
    }
}

export default App;
