import React from 'react';
import { Overlay } from '../Overlay';
import { Card } from '../Card';
import { CardBox } from '../Card/elements/CardBox';
import styles from './Dialog.module.css';


type DialogPropsType = {
  children: JSX.Element | JSX.Element[] | string | string[];
  isActive: boolean;
  onClose: () => void;
  headerText: string;
};

export const Dialog: React.FC<DialogPropsType> = (
  {
    children,
    isActive,
    headerText,
    onClose,
  }
  ) => {

  return (
    <Overlay isActive={isActive} onClose={onClose}>
      <div style={{ zIndex: 1 }}>
        <Card>
          <div className={styles.header}>
            <div className={styles.headerText}>{ headerText }</div>
            <button type="button" className={styles.closeButton} onClick={onClose} />
          </div>
          <CardBox>
            { children }
          </CardBox>
        </Card>
      </div>
    </Overlay>
  );
}
