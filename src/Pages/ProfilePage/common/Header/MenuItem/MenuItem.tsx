import {NavLink} from "react-router-dom";
import s from "./MenuItem.module.css";

type MenuItemPropsType = {
    title: string
    icon: string
    link: string
}

export const MenuItem = (props: MenuItemPropsType) => {
    return (
        <NavLink to={props.link} className={({isActive}) => `${s.itemWrapper} ${isActive ? s.active : ''}`}>
            <img className={s.icon} src={props.icon} alt={'icon'}/>
            <span className={s.itemText}>{props.title}</span>
        </NavLink>
    )
}