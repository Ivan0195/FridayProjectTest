import React, { useState } from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import AppInput from '../../common/AppInput/AppInput';
import AppButton from '../../common/AppButton/AppButton';
import { ReactComponent as OnEye } from '../../../assets/images/iconmonstr-eye-9.svg';
import { ReactComponent as OffEye } from '../../../assets/images/iconmonstr-eye-10.svg';
import { RoutesEnum } from '../../../types/enums/routes';
import { SignUpPayloadType } from '../../../types/requestTypes';
import { ClassNameType } from '../../../types/common';
import styles from './Auth.module.css';
import AppCheckbox from '../../common/AppCheckbox/AppCheckbox';
import { useAppDispatch } from '../../../bll/store';
import { login } from '../../../bll/login-reducer';

const PASSWORD_MAX_LENGTH = 8;

const schema = Yup.object<Record<keyof SignUpPayloadType, Yup.AnySchema>>({
  email: Yup.string().email().required(),
  password: Yup.string().test('len', `Password length must be more than ${PASSWORD_MAX_LENGTH}`, (val) => (val?.length ?? 0) >= PASSWORD_MAX_LENGTH).required(),
});

export const Auth: React.FC<ClassNameType> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const passwordFieldType = showPassword ? 'text' : 'password';
  const PasswordIcon = showPassword ? OffEye : OnEye;

  const onPasswordIconClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn(className)}>
      <Formik
        initialValues={{ email: '', password: '', remeberMe: false }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(login(values));
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
            <h3 className={cn('title', styles.title)}>Sign In</h3>
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
              <AppCheckbox name="remeberMe" checked={values.remeberMe} onChange={handleChange}>Remeber me</AppCheckbox>
            </div>
            <Link to={RoutesEnum.Recovery} className={cn('link text--small', styles.forgotLink)}>
              Forgot Password
            </Link>
            <div className={cn(styles.buttonWrapper)}>
              <AppButton type="submit" disabled={isSubmitting} className={cn(styles.button)}>Login</AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
