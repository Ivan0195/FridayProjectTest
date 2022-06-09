import s from './Search.module.css'
import searchImg from '../../../assets/images/Search.png'
import {ChangeEvent, useEffect, useState} from "react";

type SearchPropsType = {
    onChange: (value: string) => void
}

export const Search = ({...props}: SearchPropsType) => {
    const [value, onSetValue] = useState('')

    // useEffect(()=>{
    //     props.onChange(value)
    // },[value])

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        onSetValue(e.currentTarget.value)
    }

    return <div className={s.search}>
        <img className={s.icon}
             alt={'search'} src={searchImg}
        />
        <input
            value={value}
            onChange={onChangeSearchInput}
            placeholder={'Search...'}
            className={s.searchInput}/>
        <div>

        </div>
    </div>
}
