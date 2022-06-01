import s from './Header.module.css'
import packsListIcon from './icons/Group 608.png'
import profileIcon from './icons/Group 607.png'
import {MenuItem} from "./MenuItem/MenuItem";

export const Header = () => {
    return (
        <div className={s.header}>
            <h2 className={s.headerText}>It-incubator</h2>
            <div className={s.menu}>
                <MenuItem title={'Packs list'} link={'/ty'} icon={packsListIcon}/>
                <MenuItem title={'Profile'} link={''} icon={profileIcon}/>
            </div>
        </div>
    )
}

