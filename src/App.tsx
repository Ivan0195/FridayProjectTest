import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthPage } from './Pages/LoginPage';
import { RegistrationPage } from './Pages/RegistrationPage';
import ProfilePage from './Pages/ProfilePage/Profile';
import Recovery from './Pages/PasswordResetPage/PasswordReset';
import PasswordChange from './Pages/NewPasswordPage/NewPassword';
import Error404 from './Pages/404Page/404';
import './App.css';
import { RoutesEnum } from './types/enums/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from './bll/store';
import { checkAuth, getAppInitializedStatus } from './bll/app-reducer';
import { Loader } from './components/common/Loader';
import Page404 from "./Pages/404Page/404";
import Login from "./Pages/LoginPage/Login";
import Profile from "./Pages/ProfilePage/Profile";
import {Navigate, Route, Routes} from 'react-router-dom'
import Registration from "./Pages/RegistrationPage/Registration";
import PasswordReset from "./Pages/PasswordResetPage/PasswordReset";
import NewPassword from "./Pages/NewPasswordPage/NewPassword";
import Test from "./Pages/TestPage/Test";
import {useSelector} from "react-redux";
import {AppRootStateType, useTypedDispatch} from "./bll/store";
import Header from "./Pages/Header/Header";
import {AppStatusType} from "./bll/common-app-reducer";
import {authTC} from "./bll/login-reducer";

function App() {
  const appInitializedStatus = useAppSelector(getAppInitializedStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!appInitializedStatus) {
    return <Loader />
  }

  return (
    <div>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path={RoutesEnum.Login} element={<AuthPage />} />
          <Route path={RoutesEnum.Registration} element={<RegistrationPage />} />
          <Route path={RoutesEnum.Profile} element={<ProfilePage />} />
          <Route path={RoutesEnum.Recovery} element={<Recovery />} />
          <Route path={RoutesEnum.PasswordChange} element={<PasswordChange />} />
        </Routes>
      <ToastContainer position="bottom-left" hideProgressBar />
    </div>
  );

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
}

export default App;
