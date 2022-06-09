import { Card } from '../../../../components/common/Card';
import { CardHeader } from '../../../../components/common/Card/elements/CardHeader';
import { CardBox } from '../../../../components/common/Card/elements/CardBox';
import SuperButton from '../../../ProfilePage/common/Button/SuperButton';
import { ModalDialog } from '../../../../components/common/ModalDialog';
import React from 'react';
import { ModalsPropsType } from '../Modals';
import styles from './DeleteModal.module.css';

type DeleteModalPropsType = Omit<ModalsPropsType, 'type'>;

export const DeleteModal: React.FC<DeleteModalPropsType> = ({ modalStatus, setModalStatus }) => {
  const handleCancelClick = () => {
    setModalStatus(false);
  };

  return (
    <ModalDialog active={modalStatus} setActive={setModalStatus}>
      <Card>
        <CardHeader>Delete Pack</CardHeader>
        <CardBox>
          Do you really want to remove Pack Name - Name Pack?
          All cards will be excluded from this course.
        </CardBox>
        <CardBox>
          <div className={styles.buttonsWrapper}>
            <SuperButton type="button" onClick={handleCancelClick}>Cancel</SuperButton>
            <SuperButton red type="button">Delete</SuperButton>
          </div>
        </CardBox>
      </Card>
    </ModalDialog>
  );
};
