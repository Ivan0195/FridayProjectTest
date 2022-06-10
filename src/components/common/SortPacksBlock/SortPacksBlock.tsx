import React, {useState} from 'react';
import {useTypedDispatch} from "../../../bll/store";
import {setSortPacksAC} from "../../../bll/packs-filter-settings-reducer";
import s from './SortPacksBlock.module.css'

export type SortByType = {
    sortVar: boolean,
    sortFunc: (sortVar: boolean) => void,
    sortParam: string
}

export const SortPacksBlock = () => {

    const dispatch = useTypedDispatch()

    const [sortByNameUp, setSortByNameUp] = useState<boolean>(false)
    const [sortByCardsUp, setSortByCardsUp] = useState<boolean>(false)
    const [sortByUpdateUp, setSortByUpdateUp] = useState<boolean>(false)

    const nameParams = {
        sortVar: sortByNameUp,
        sortFunc: setSortByNameUp,
        sortParam: 'name'
    }

    const cardsParams = {
        sortVar: sortByCardsUp,
        sortFunc: setSortByCardsUp,
        sortParam: 'cardsCount'
    }

    const updateParams = {
        sortVar: sortByUpdateUp,
        sortFunc: setSortByUpdateUp,
        sortParam: 'updated'
    }

    const onClickHandler = (props: SortByType) => {
        props.sortVar ? dispatch(setSortPacksAC(`0${props.sortParam}`)) : dispatch(setSortPacksAC(`1${props.sortParam}`))
        props.sortFunc(!props.sortVar)
    }

    return (
        <div className={s.container}>
            <div className={s.sortButton}
                 onClick={() => onClickHandler(nameParams)}>Name {sortByNameUp ? '▲' : '▼'}</div>
            <div className={s.sortButton}
                 onClick={() => onClickHandler(cardsParams)}>Cards {sortByCardsUp ? '▲' : '▼'}</div>
            <div className={s.sortButton}
                 onClick={() => onClickHandler(updateParams)}>Last Update {sortByUpdateUp ? '▲' : '▼'}</div>
            <div>Made By</div>
            <div>Actions</div>
        </div>
    );
};

