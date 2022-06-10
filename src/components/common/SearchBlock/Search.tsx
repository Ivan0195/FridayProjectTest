import s from './Search.module.css'
import searchImg from '../../../assets/images/Search.png'
import {ChangeEvent, useEffect, useState} from "react";

type SearchPropsType = {
    onChange: (value: string) => void
}

export const Search = (props: SearchPropsType) => {
    const [value, setValue] = useState('')
    const debouncedSearchTerm = useDebounce(value, 500)

    useEffect(() => {
        props.onChange(debouncedSearchTerm)
    }, [debouncedSearchTerm])


    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
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

export default function useDebounce(value: string, delay: number) {
    // Состояние и сеттер для отложенного значения
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value]
    );

    return debouncedValue;
}
