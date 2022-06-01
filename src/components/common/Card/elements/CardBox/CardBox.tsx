import React from 'react';
import cn from 'classnames';
import { BaseCommonComponentPropsType } from '../../../../../types/common';
import styles from './CardBox.module.css';

export const CardBox: React.FC<BaseCommonComponentPropsType> = ({ children, className }) => {
  return (
    <div className={cn(styles.cardBox, className)}>{ children }</div>
  );
};
