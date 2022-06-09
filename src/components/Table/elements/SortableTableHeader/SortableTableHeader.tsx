import React, { useState } from 'react';
import styles from './SortableTableHeader.module.css';
import cn from 'classnames';

type SortableTableHeaderType = {
  children: JSX.Element | string;
  onClick: (order: OrdersType) => void;
};

type OrdersType = 'desc' | 'asc' | 'default';

type StatebBehaviorType = {
  next: (setNextState: React.Dispatch<React.SetStateAction<OrdersType>>, cb: (order: OrdersType) => void) => void;
  icon: string | null;
};

const stateBehavior: Record<OrdersType, StatebBehaviorType> = {
  desc: {
    next: (setNextState, cb) => {
      setNextState(() => {
        cb('asc')
        return 'asc';
      })
    },
    icon: '',
  },
  asc: {
    next: (setNextState, cb) => {
      setNextState(() => {
        cb('default')
        return 'default';
      })
    },
    icon: '',
  },
  default: {
    next: (setNextState, cb) => {
      setNextState(() => {
        cb('desc')
        return 'desc';
      })
    },
    icon: null,
  },
};

export const SortableTableHeader: React.FC<SortableTableHeaderType> = ({ children, onClick }) => {
  const [orderState, setOrderState] = useState<OrdersType>('default');
  const currentBehavior = stateBehavior[orderState];
  const handleClick = () => currentBehavior.next(setOrderState, onClick);;

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <button type="button" className={styles.button}>
        { children }
      </button>
      <div className={cn(styles.triangle, {
        [styles.triangleDesc]: orderState === 'desc',
        [styles.triangleAsc]: orderState === 'asc',
      })} />
    </div>
  );
};
