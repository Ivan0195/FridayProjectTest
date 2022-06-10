import { Search } from '../../components/common/SearchBlock/Search';
import { Pagination } from '../../components/common/Pagination/Pagination';
import React, { useEffect } from 'react';
import s from './CardsPage.module.css';
import { Cards } from '../Cards';
import { useAppSelector, useTypedDispatch } from '../../bll/store';
import { fetchCard, setCards } from '../../bll/packs-reducer';
import { Link, useParams } from 'react-router-dom';
import { setCardAnswerAC, setCardsPageAC, setCardsPageCountAC } from '../../bll/cards-reducer';
import { RoutesEnum } from '../../types/enums/routes';

export const CardsPage = () => {
  const currentPage = useAppSelector(state => state.cardsSettings.page)
  const itemsOnPageCount = useAppSelector(state => state.cardsSettings.pageCount)
  const totalItemsCount = useAppSelector(state => state.cardsSettings.totalCardsCount)
  const dispatch = useTypedDispatch();
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
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.cards}>
          <Link to={RoutesEnum.Packs} className={s.link}>
            <span className={s.arrow} />
            Pack Name
          </Link>
          <div className={s.packsBarActions}>
            <Search onChange={() => {}}/>
          </div>
          <div className={s.packsBarContent}>
            <Cards/>
          </div>
          <Pagination currentPage={currentPage}
                      itemsOnPageCount={itemsOnPageCount}
                      totalItemsCount={totalItemsCount}
                      onPageChanged={onPageChangedHandler}
                      onChangeItemsOnPageCount={onChangeItemsCountHandler}
          />
        </div>
      </div>
    </div>
  );
};
