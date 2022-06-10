import React from 'react';
import cn from 'classnames';
import { ReactComponent as StarIcon } from '../../../assets/images/star.svg';
import styles from './Rate.module.css';

export type RatePropsType = {
  value: number | string;
  onChange?: (value: number) => void;
};

const maxRateValue = 5;


export const Rate: React.FC<RatePropsType> = ({ value, onChange }) => {
  return (
    <>
      {
        [...Array(maxRateValue)].map((item, index) => {
          return (
            <StarIcon
              key={index}
              className={cn(styles.star, {
                [styles.checked]: index <= Number(value) - 1,
                [styles.clickable]: !!onChange,
              })}
              onClick={onChange ? () => onChange(index + 1) : undefined}
            />
          );
        })
      }
    </>
  );
};
