import React from 'react';
import s from './CheckEmail.module.css'
import icon from '../../assets/images/iconemail.png'

export const CheckEmail = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.checkContainer}>
                <h2 className={s.title}>It-incubator</h2>
                <div className={s.icon}>  <img src={icon} alt="aa" /></div>
                <p className={s.subTitle}>Check Email</p>
                <div className={s.info}>
                    <p>We’ve sent an Email with instructions to current E-mail address</p>
                </div>
            </div>
        </div>
    );
}