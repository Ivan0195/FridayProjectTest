import React from 'react';
import cn from 'classnames';
import { ChildrenComponentsType } from '../../../types/common';
import styles from './Card.module.css';

export const Card: React.FC<ChildrenComponentsType> = ({ children }) => {
  return (
    <div className={cn(styles.card)}>
      { children }
    </div>
  );
};
