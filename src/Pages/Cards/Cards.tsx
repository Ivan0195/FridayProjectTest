import {Table} from '../../components/Table';
import {SortableTableHeader} from '../../components/Table/elements/SortableTableHeader';
import {CardsResponseType, CardType} from '../../types/responseTypes';
import {useParams} from 'react-router-dom';
import {Rate} from '../../components/common/Rate';
import React, {useEffect} from 'react';
import {AppRootStateType, useAppSelector, useTypedDispatch} from '../../bll/store';
import {fetchCard, getCards, setCards} from '../../bll/packs-reducer';
import {useSelector} from 'react-redux';
import {Search} from '../../components/common/SearchBlock/Search';
import {Pagination} from '../../components/common/Pagination/Pagination';
import {setCardAnswerAC, setCardsPageAC, setCardsPageCountAC} from "../../bll/cards-reducer";

const columns = [
    {
        id: 'question',
        value: <SortableTableHeader id="question" onClick={console.log}>Question</SortableTableHeader>,
    },
    {
        id: 'answer',
        value: <SortableTableHeader id="answer" onClick={console.log}>Answer</SortableTableHeader>,
    },
    {
        id: 'updated',
        value: <SortableTableHeader id="updated" onClick={console.log}>Last Updated</SortableTableHeader>,
    },
    {
        id: 'user_name',
        value: <SortableTableHeader id="user_name" onClick={console.log}>Grade</SortableTableHeader>,
        render: (card: CardType) => {
            return (
                <div style={{display: 'flex'}}>
                    <Rate value={Math.floor(card.grade)}/>
                </div>
            );
        },
    },
];

export const Cards = () => {
    const cards = useAppSelector(getCards);

    return (
      <Table columns={columns} items={cards ? cards.cards : []} itemRowKey="_id"/>
    );
};
