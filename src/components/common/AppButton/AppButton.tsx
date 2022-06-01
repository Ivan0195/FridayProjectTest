import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import styles from './AppButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  primary?: boolean;
  secondary?: boolean;
  iconButton?: boolean;
};

const AppButton: React.FC<SuperButtonPropsType> = (
  {
    className,
    primary,
    secondary,
    iconButton,
    ...restProps
  }
) => {

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: primary,
        [styles.secondary]: secondary,
        [styles.iconButton]: iconButton
      })}
      { ...restProps }
    />
  )
}

export default AppButton
