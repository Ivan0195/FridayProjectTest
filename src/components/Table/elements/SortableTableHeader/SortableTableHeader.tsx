import React, { useState } from 'react';
import styles from './SortableTableHeader.module.css';
import cn from 'classnames';
import { OrdersType } from '../../../../types/common';
import {useAppSelector} from "../../../../bll/store";
import {notificationHandler} from "../../../../utils/errorUtils";

type SortableTableHeaderType = {
  id: string | number;
  children: JSX.Element | string;
  onClick: ({ id, order }: { id: string | number, order: OrdersType }) => void;
};

type StatebBehaviorType = {
  next: (id: string | number, setNextState: React.Dispatch<React.SetStateAction<OrdersType>>, cb: ({ id, order }: { id: string | number, order: OrdersType }) => void) => void;
  icon: string | null;
};

const stateBehavior: Record<OrdersType, StatebBehaviorType> = {
  desc: {
    next: (id: string | number, setNextState, cb) => {
      setNextState(() => {
        cb({ id, order: 'asc' });
        return 'asc';
      })
    },
    icon: '',
  },
  asc: {
    next: (id: string | number, setNextState, cb) => {
      setNextState(() => {
        cb({ id, order: 'default' });
        return 'default';
      })
    },
    icon: '',
  },
  default: {
    next: (id: string | number, setNextState, cb) => {
      setNextState(() => {
        cb({ id, order: 'desc' });
        return 'desc';
      })
    },
    icon: null,
  },
};

export const SortableTableHeader: React.FC<SortableTableHeaderType> = ({ id, children, onClick }) => {
  const loadingStatus = useAppSelector<boolean>(state => state.cardsPack.isLoading)
  const [orderState, setOrderState] = useState<OrdersType>('default');
  const currentBehavior = stateBehavior[orderState];
  const handleClick = () => {
    loadingStatus
    ? notificationHandler('wait for previous operation')
    : currentBehavior.next(id, setOrderState, onClick);
  }

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
