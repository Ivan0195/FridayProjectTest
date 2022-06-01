import { Card } from '../../components/common/Card';
import { CardBox } from '../../components/common/Card/elements/CardBox';
import { Logo } from '../../components/common/Logo';
import { SignUp } from '../../components/forms/SignUp';
import styles from './RegistratiomPage.module.css';

export const RegistrationPage = () => {
  return (
    <div className={styles.wrapper}>
      <Card>
        <CardBox className={styles.cardHeader}>
          <Logo />
        </CardBox>
        <CardBox>
          <SignUp />
        </CardBox>
      </Card>
    </div>
  );
};
