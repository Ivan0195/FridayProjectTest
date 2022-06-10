import React, { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useAppSelector, useTypedDispatch } from '../../bll/store';
import { getCardsPack, getCardsPackLoadingStatus } from '../../bll/packs-reducer';
import { CardPackType } from '../../types/responseTypes';
import { Table } from '../../components/Table';
import { SortableTableHeader } from '../../components/Table/elements/SortableTableHeader';
import SuperButton from '../ProfilePage/common/Button/SuperButton';
import { getUserData } from '../../bll/login-reducer';
import { CellLink } from '../../components/Table/elements/CellLink';
import styles from './Packs.module.css';
import { setSortPacksAC } from '../../bll/packs-filter-settings-reducer';
import { OrdersType } from '../../types/common';
import { Dialog } from '../../components/common/Dialog';

export type ModalsType = 'edit' | 'delete' | 'learn';
type ModalsStateTypes = {
  header: string,
  body: JSX.Element;
};

const modalsMap: Record<ModalsType, ModalsStateTypes> = {
  delete: {
    header: 'Delete Pack',
    body: <div>
      <p>
        Do you really want to remove Pack Name - Name Pack?
        All cards will be excluded from this course.
      </p>
    </div>,
  },
  edit: {
    header: 'Edit',
    body: <div>Edit</div>,
  },
  learn: {
    header: 'Learn',
    body: <div>Learn</div>,
  },
};

const sortNumMap: Record<OrdersType, string | null> = {
  default: null,
  asc: '1',
  desc: '0',
};

export const Packs = () => {
  const dispatch = useTypedDispatch();

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalsType | null>(null);

  const cardsPack = useAppSelector(getCardsPack);
  const { _id: userID } = useAppSelector(getUserData);
  const cardsPackLoadingStatus = useAppSelector(getCardsPackLoadingStatus);

  const handleModalOpen = useCallback((evt: MouseEvent<HTMLElement>) => {
    if (evt.currentTarget.dataset.id && Object.keys(modalsMap).includes(evt.currentTarget.dataset.id)) {
      setModalStatus(true);
      setModalType(evt.currentTarget.dataset.id as ModalsType);
    }
  }, [setModalStatus, setModalType]);

  const handleModalClose = useCallback(() => {
    setModalStatus(false);
    setModalType(null);
  }, [setModalStatus, setModalType]);

  const handleTableOrderChange = useCallback(({ id, order }: { id: string | number, order: OrdersType }) => {
    const sortValue = sortNumMap[order];
    const sortType = !sortValue ? '' : `${sortValue}${id}`;
    dispatch(setSortPacksAC(sortType));
  }, [dispatch]);

  const columns = useMemo(() => [
    {
      id: 'name',
      value: <SortableTableHeader id="name" onClick={handleTableOrderChange}>Name</SortableTableHeader>,
      render: (cardPack: CardPackType) => {
        return (
          <CellLink to={cardPack._id}>{ cardPack.name }</CellLink>
        );
      },
    },
    {
      id: 'cardsCount',
      value: <SortableTableHeader id="cardsCount" onClick={handleTableOrderChange}>Cards</SortableTableHeader>,
    },
    {
      id: 'updated',
      value: <SortableTableHeader id="updated" onClick={handleTableOrderChange}>Last Updated</SortableTableHeader>,
    },
    {
      id: 'user_name',
      value: <SortableTableHeader id="user_name" onClick={handleTableOrderChange}>Created by</SortableTableHeader>,
    },
    {
      id: 'actions',
      value: 'Actions',
      render: (cardPack: CardPackType) => {
        if (cardPack.user_id !== userID) {
          return <SuperButton small type="button" data-id="learn" onClick={handleModalOpen}>Learn</SuperButton>;
        }

        return (
          <div style={{display: 'flex'}}>
            <div className={styles.buttonWrapper}>
              <SuperButton small red type="button" data-id="delete" onClick={handleModalOpen}>Delete</SuperButton>
            </div>
            <div className={styles.buttonWrapper}>
              <SuperButton small type="button" data-id="edit" onClick={handleModalOpen}>Edit</SuperButton>
            </div>
            <div className={styles.buttonWrapper}>
              <SuperButton small type="button" data-id="learn" onClick={handleModalOpen}>Learn</SuperButton>
            </div>
          </div>
        );
      },
    },
  ], [userID, handleTableOrderChange, handleModalOpen]);

  return (
    <>
      <Table columns={columns} items={cardsPack?.cardPacks ?? []} itemRowKey="_id" loading={cardsPackLoadingStatus} />
      {
        modalType && <Dialog
          isActive={modalStatus}
          headerText={modalsMap[modalType].header}
          onClose={handleModalClose}
        >
          { modalsMap[modalType].body }
        </Dialog>
      }
    </>
  );
};
