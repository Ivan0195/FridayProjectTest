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
                <Rate value={Math.floor(card.grade)}/>
            );
        },
    },
];

export const Cards = () => {
    const currentPage = useAppSelector(state => state.cardsSettings.page)
    const itemsOnPageCount = useAppSelector(state => state.cardsSettings.pageCount)
    const totalItemsCount = useAppSelector(state => state.cardsSettings.totalCardsCount)
    const dispatch = useTypedDispatch();
    const cards = useSelector<AppRootStateType, CardsResponseType | null>(getCards);
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(fetchCard(id));
        }

        return () => {
            dispatch(setCards(null));
        };
    }, [dispatch, id]);

    const onChangeSearchHandler = (value: string) => {
        dispatch(setCardAnswerAC(value))
    }

    const onPageChangedHandler = (pageNumber: number) => {
        dispatch(setCardsPageAC(pageNumber))
    }

    const onChangeItemsCountHandler = (value: number) => {
        dispatch(setCardsPageCountAC(value))
    }

    return (
        <>
            <Search onChange={onChangeSearchHandler}/>
            <Table columns={columns} items={cards ? cards.cards : []} itemRowKey="_id"/>
            <Pagination currentPage={currentPage}
                        itemsOnPageCount={itemsOnPageCount}
                        totalItemsCount={totalItemsCount}
                        onPageChanged={onPageChangedHandler}
                        onChangeItemsOnPageCount={onChangeItemsCountHandler}
            />
        </>
    );
};
