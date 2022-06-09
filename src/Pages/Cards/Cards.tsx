import { Table } from '../../components/Table';
import { SortableTableHeader } from '../../components/Table/elements/SortableTableHeader';
import { CardsResponseType, CardType } from '../../types/responseTypes';
import { useParams } from 'react-router-dom';
import { Rate } from '../../components/common/Rate';
import React, { useEffect } from 'react';
import { AppRootStateType, useTypedDispatch } from '../../bll/store';
import { fetchCard, getCards, setCards } from '../../bll/packs-reducer';
import { useSelector } from 'react-redux';
import { Search } from '../../components/common/SearchBlock/Search';
import { Pagination } from '../../components/common/Pagination/Pagination';

const columns = [
  {
    id: 'question',
    value: <SortableTableHeader onClick={console.log}>Question</SortableTableHeader>,
  },
  {
    id: 'answer',
    value: <SortableTableHeader onClick={console.log}>Answer</SortableTableHeader>,
  },
  {
    id: 'updated',
    value: <SortableTableHeader onClick={console.log}>Last Updated</SortableTableHeader>,
  },
  {
    id: 'user_name',
    value: <SortableTableHeader onClick={console.log}>Grade</SortableTableHeader>,
    render: (card: CardType) => {
      return (
        <Rate value={Math.floor(card.grade)} />
      );
    },
  },
];

export const Cards = () => {
  const dispatch = useTypedDispatch();
  const cards = useSelector<AppRootStateType, CardsResponseType | null>(getCards);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchCard(id));
    }

    return () => {
      dispatch(setCards(null));
    };
  }, [dispatch, id]);

  return (
    <>
      <Search onChange={() => {}}/>
      <Table columns={columns} items={cards ? cards.cards : []} itemRowKey="_id" />
      <Pagination currentPage={1}
                  itemsOnPageCount={5}
                  totalItemsCount={45}
                  onPageChanged={() => {}}
                  onChangeItemsOnPageCount={() => {}}
      />
    </>
  );
};
