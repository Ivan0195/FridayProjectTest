import React, { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import cn from 'classnames';
import AppInput from '../../common/AppInput/AppInput';
import AppButton from '../../common/AppButton/AppButton';
import { ReactComponent as OnEye } from '../../../assets/images/iconmonstr-eye-9.svg';
import { ReactComponent as OffEye } from '../../../assets/images/iconmonstr-eye-10.svg';
import { SignUpPayloadType } from '../../../types/requestTypes';
import { ClassNameType } from '../../../types/common';
import { useAppDispatch, useAppSelector } from '../../../bll/store';
import styles from './SignUp.module.css';
import {
  getRegistrationStatus,
  registerUser, setRegistrationStatus,
} from '../../../bll/registration-reducer';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../types/enums/routes';

const PASSWORD_MAX_LENGTH = 8;

const schema = Yup.object<Record<keyof SignUpPayloadType, Yup.AnySchema>>({
  email: Yup.string().email().required(),
  password: Yup.string().test('len', `Password length must be more than ${PASSWORD_MAX_LENGTH}`, (val) => (val?.length ?? 0) >= PASSWORD_MAX_LENGTH).required(),
});

export const SignUp: React.FC<ClassNameType> = ({ className }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const registrationStatus = useAppSelector(getRegistrationStatus);
  const [showPassword, setShowPassword] = useState(false);
  const passwordFieldType = showPassword ? 'text' : 'password';
  const PasswordIcon = showPassword ? OffEye : OnEye;

  useEffect(() => {
    return () => {
      if (registrationStatus !== 'pending') {
        dispatch(setRegistrationStatus('pending'));
      }
    };
  }, [dispatch]);

  const onPasswordIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handleCancelClick = () => {
    navigate(RoutesEnum.Login);
  };

  if (registrationStatus === 'success') {
    return <Navigate to={RoutesEnum.Login} />
  }

  return (
    <div className={cn(className)}>
      <Formik
        initialValues={{ email: '', password: '', remeberMe: false }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(registerUser(values));
          setSubmitting(false);
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
          <form onSubmit={handleSubmit}>
            <h3 className={cn('title', styles.title)}>Sign Up</h3>
            <div className={cn(styles.fieldsWrapper)}>
              <AppInput
                label="Email"
                name="email"
                className={cn(styles.field)}
                error={errors.email && touched.email && errors.email ? errors.email : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <AppInput
                label="Password"
                name="password"
                className={cn(styles.field)}
                error={errors.password && touched.password && errors.password ? errors.password : ''}
                type={passwordFieldType}
                endAddition={
                  <AppButton type="button" iconButton onClick={onPasswordIconClick}><PasswordIcon /></AppButton>
                }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
            <div className={cn(styles.buttonWrapper)}>
              <AppButton type="button" disabled={isSubmitting} className={cn(styles.button)} onClick={handleCancelClick}>Cancel</AppButton>
              <AppButton type="submit" disabled={isSubmitting} className={cn(styles.button)}>Register</AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
