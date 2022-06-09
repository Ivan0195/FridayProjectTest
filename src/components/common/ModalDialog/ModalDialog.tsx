import React, { MouseEvent } from 'react';
import styles from './ModalDialog.module.css';
import cn from 'classnames';

type ModalDialogPropsType = {
  active: boolean;
  setActive: (active: boolean) => void;
  children: JSX.Element | string;
};

export const ModalDialog: React.FC<ModalDialogPropsType> = ({ children, active, setActive }) => {
  const handleWrapperClick = (evt: MouseEvent<HTMLElement>) => {
    setActive(false);
  };

  const handleContentClick = (evt: MouseEvent<HTMLElement>) => {
    evt.stopPropagation();
  };

  return (
    <div className={cn(styles.wrapper, { [styles.active]: active })} onClick={handleWrapperClick}>
      <div className={cn(styles.content, { [styles.active]: active })} onClick={handleContentClick}>
        { children }
      </div>
    </div>
  );
};
