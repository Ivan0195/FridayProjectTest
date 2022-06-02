import React from 'react';
import s from './LinearPreloader.module.css'

const LinearPreloader = () => {
    return (
        <div className={s.container}>
            <div className={s.barContainer}>
                <div className={s.bar}></div>
                <div className={s.bar}></div>
                <div className={s.bar}></div>
                <div className={s.bar}></div>
            </div>
        </div>
    );
};

export default LinearPreloader;