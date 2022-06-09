import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CellLink.module.css';

type CellLinkPropsType = {
  children: JSX.Element | string;
  to: string;
};

export const CellLink: React.FC<CellLinkPropsType> = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>{ children }</Link>
  );
};
