import React, {useState} from 'react';
import {useTypedDispatch} from "../../../bll/store";
import {setPackNameAC, setSortPacksAC} from "../../../bll/packs-filter-settings-reducer";

export type SortByType = {
    sortVar: boolean,
    sortFunc: (sortVar:boolean)=> void,
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
        <div>
            <div onClick={()=>onClickHandler(nameParams)}>Name</div>
            <div onClick={()=>onClickHandler(cardsParams)}>Cards</div>
            <div onClick={()=>onClickHandler(updateParams)}>Last Update</div>
            <div>Made By</div>
            <div>Actions</div>
        </div>
    );
};

