import React from 'react';
import cn from 'classnames';
import { ChildrenComponentsType, ClassNameType } from '../../../types/common';
import styles from './Card.module.css';

export const Card: React.FC<ChildrenComponentsType & ClassNameType> = ({ children, className }) => {
  return (
    <div className={cn(styles.card, className)}>
      { children }
    </div>
  );
};
