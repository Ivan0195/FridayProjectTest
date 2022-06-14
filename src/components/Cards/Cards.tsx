import { Table } from '../Table';
import { SortableTableHeader } from '../Table/elements/SortableTableHeader';
import { CardType } from '../../types/responseTypes';
import { Rate } from '../common/Rate';
import React from 'react';
import { useAppSelector } from '../../bll/store';
import { getCards } from '../../bll/packs-reducer';

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
