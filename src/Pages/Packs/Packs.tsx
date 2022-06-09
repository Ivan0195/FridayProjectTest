import React, { MouseEvent, useEffect, useMemo, useState } from 'react';
import { AppRootStateType, useTypedDispatch } from '../../bll/store';
import { fetchCardsPack, getCardsPack } from '../../bll/packs-reducer';
import { useSelector } from 'react-redux';
import { CardsPackResponseType, CardPackType, UserResponseType } from '../../types/responseTypes';
import { Table } from '../../components/Table';
import { SortableTableHeader } from '../../components/Table/elements/SortableTableHeader';
import SuperButton from '../ProfilePage/common/Button/SuperButton';
import { getUserData } from '../../bll/login-reducer';
import { CellLink } from '../../components/Table/elements/CellLink';
import styles from './Packs.module.css';
import { Modals } from './elements';

export type ModalsType = 'edit' | 'delete' | null;

export const Packs = () => {
  const dispatch = useTypedDispatch();

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalsType>(null);

  const cardsPack = useSelector<AppRootStateType, CardsPackResponseType | null>(getCardsPack);
  const { _id: userID } = useSelector<AppRootStateType, UserResponseType>(getUserData);

  const handleModalOpen = (evt: MouseEvent<HTMLElement>) => {
    if (evt.currentTarget.dataset.id) {
      setModalStatus(true);
      setModalType(evt.currentTarget.dataset.id as ModalsType);
    }
  };

  const columns = useMemo(() => [
    {
      id: 'name',
      value: <SortableTableHeader onClick={() => { dispatch({ type: 'APP/SET-APP-STATUS', status: 'pending' }) }}>Name</SortableTableHeader>,
      render: (cardPack: CardPackType) => {
        return (
          <CellLink to={cardPack._id}>{ cardPack.name }</CellLink>
        );
      },
    },
    {
      id: 'cardsCount',
      value: <SortableTableHeader onClick={console.log}>Cards</SortableTableHeader>,
    },
    {
      id: 'updated',
      value: <SortableTableHeader onClick={console.log}>Last Updated</SortableTableHeader>,
    },
    {
      id: 'user_name',
      value: <SortableTableHeader onClick={console.log}>Created by</SortableTableHeader>,
    },
    {
      id: 'actions',
      value: 'Actions',
      render: (cardPack: CardPackType) => {
        if (cardPack.user_id !== userID) {
          return <SuperButton small type="button" onClick={() => {
            setModalStatus(!modalStatus);
            setModalType(null);
          }}>Learn</SuperButton>;
        }

        return (
          <>
            <div className={styles.buttonWrapper}>
              <SuperButton small red type="button" data-id="delete" onClick={handleModalOpen}>Delete</SuperButton>
            </div>
            <div className={styles.buttonWrapper}>
              <SuperButton small type="button" data-id="edit" onClick={handleModalOpen}>Edit</SuperButton>
            </div>
            <div className={styles.buttonWrapper}>
              <SuperButton small type="button" data-id="learn" onClick={handleModalOpen}>Learn</SuperButton>
            </div>
          </>
        );
      },
    },
  ], [dispatch, modalStatus, userID]);

  useEffect(() => {
    dispatch(fetchCardsPack());
  }, [dispatch]);

  return (
    <>
      <Table columns={columns} items={cardsPack?.cardPacks ?? []} itemRowKey="_id" />
      <Modals modalStatus={modalStatus} setModalStatus={setModalStatus} type={modalType} />
    </>

  );
};
