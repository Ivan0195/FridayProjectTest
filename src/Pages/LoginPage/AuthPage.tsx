import cn from 'classnames';
import { Link, Navigate } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { CardBox } from '../../components/common/Card/elements/CardBox';
import { Logo } from '../../components/common/Logo';
import { Auth } from '../../components/forms/Auth';
import { RoutesEnum } from '../../types/enums/routes';
import styles from './AuthPage.module.css';
import { useAppSelector } from '../../bll/store';
import { getUser } from '../../bll/login-reducer';


export const AuthPage = () => {
  const user = useAppSelector(getUser);

  if (user) {
    return <Navigate to={RoutesEnum.Profile} />
  }

  return (
    <div className={styles.wrapper}>
      <Card>
        <CardBox className={styles.cardHeader}>
          <Logo />
        </CardBox>
        <CardBox>
          <Auth />
        </CardBox>
        <CardBox className={styles.cardFooter}>
          <p className={cn('text--small')}>Don't have an account?</p>
          <Link to={RoutesEnum.Registration} className="link">Sign Up</Link>
        </CardBox>
      </Card>
    </div>
  );
};
