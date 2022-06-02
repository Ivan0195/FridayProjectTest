import {Card} from '../../components/common/Card';
import {CardBox} from '../../components/common/Card/elements/CardBox';
import {Logo} from '../../components/common/Logo';
import styles from './LoginContainer.module.css';
import Login from "./Login";
import {NavLink} from "react-router-dom";
import React from "react";

export const LoginContainer = () => {
    return (
        <div className={styles.wrapper}>
            <Card>
                <CardBox className={styles.cardHeader}>
                    <Logo />
                </CardBox>
                <CardBox>
                    <Login/>
                </CardBox>
                <CardBox>
                    <div>
                        <p>Don’t have an account?</p>
                        <div><NavLink to={'/registration'}> Sign Up</NavLink></div>
                    </div>
                </CardBox>
            </Card>
        </div>
    );
};