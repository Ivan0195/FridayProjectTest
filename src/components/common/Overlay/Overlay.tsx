import React from 'react';
import { Portal } from '../Portal';
import styles from './Overlay.module.css';

type OverlayPropsType = {
  children: JSX.Element | JSX.Element[] | string | string[];
  isActive: boolean;
  onClose: () => void;
};

export const Overlay: React.FC<OverlayPropsType> = ({ children, isActive, onClose }) => {
  if (!isActive) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.container}>
        <div className={styles.closeSection} onClick={onClose} />
        { children }
      </div>
    </Portal>
  );
};
