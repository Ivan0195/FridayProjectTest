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
}

export default App;
