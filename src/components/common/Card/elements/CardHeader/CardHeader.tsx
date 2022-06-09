import React from 'react';
import styles from './CardHeader.module.css';

type CardHeaderPropsType = {
  children: JSX.Element | JSX.Element[] | string;
};

export const CardHeader: React.FC<CardHeaderPropsType> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardHeader}>{ children }</div>
    </div>
  );
};
