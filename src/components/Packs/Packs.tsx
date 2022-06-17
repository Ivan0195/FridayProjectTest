import React, {MouseEvent, useCallback, useMemo, useState} from 'react';
import {useAppSelector, useTypedDispatch} from '../../bll/store';
import {editCardPack, getCardsPack, getCardsPackLoadingStatus, removeCardPack} from '../../bll/packs-reducer';
import {CardPackType} from '../../types/responseTypes';
import {Table} from '../Table';
import {SortableTableHeader} from '../Table/elements/SortableTableHeader';
import SuperButton from '../../Pages/ProfilePage/common/Button/SuperButton';
import {getUserData} from '../../bll/login-reducer';
import {CellLink} from '../Table/elements/CellLink';
import styles from './Packs.module.css';
import {setSortPacksAC} from '../../bll/packs-filter-settings-reducer';
import {OrdersType} from '../../types/common';
import {Dialog} from '../common/Dialog';
import cn from 'classnames';
import AppInput from '../common/AppInput/AppInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';

export type ModalsType = 'edit' | 'delete';
type ModalsStateTypes = {
    header: string,
    body: JSX.Element;
};

export const sortNumMap: Record<OrdersType, string | null> = {
    default: null,
    asc: '1',
    desc: '0',
};

const schema = Yup.object<Record<'namePack', Yup.AnySchema>>({
    namePack: Yup.string().required(),
});

export const Packs = () => {
  const dispatch = useTypedDispatch();

    const [currentPack, setCurrentPack] = useState<CardPackType | null>(null);
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalsType | null>(null);

    const cardsPack = useAppSelector(getCardsPack);
    const {_id: userID} = useAppSelector(getUserData);
    const cardsPackLoadingStatus = useAppSelector(getCardsPackLoadingStatus);

    const handleModalOpen = useCallback((type: ModalsType, cardPack: CardPackType) => {
        setCurrentPack(cardPack);
        setModalStatus(true);
        setModalType(type);
    }, [setModalStatus, setModalType]);

    const handleModalClose = useCallback(() => {
        setCurrentPack(null);
        setModalStatus(false);
        setModalType(null);
    }, [setModalStatus, setModalType]);

    const handleTableOrderChange = useCallback(({id, order}: { id: string | number, order: OrdersType }) => {
        const sortValue = sortNumMap[order];
        const sortType = !sortValue ? '' : `${sortValue}${id}`;
        dispatch(setSortPacksAC(sortType));
    }, [dispatch]);

    const handleDeletePack = () => {
        if (currentPack) {
            dispatch(removeCardPack(currentPack._id));
            handleModalClose();
        }
    };

    const handleEditPack = async (name: string) => {
        if (currentPack) {
            dispatch(editCardPack(currentPack._id, name));
        }
    };

    const modalsMap: Record<ModalsType, ModalsStateTypes> = {
        delete: {
            header: 'Delete Pack',
            body: <div>
                <p>
                    Do you really want to remove Pack Name - Name Pack?
                    All cards will be excluded from this course.
                </p>
                <div className={styles.modalButtonsWrapper}>
                    <SuperButton type="button" onClick={handleModalClose}>Cancel</SuperButton>
                    <SuperButton red type="button" onClick={handleDeletePack}>Delete</SuperButton>
                </div>
            </div>,
        },
        edit: {
            header: 'Edit',
            body: <Formik
                initialValues={{namePack: currentPack?.name ?? ''}}
                validationSchema={schema}
                onSubmit={async (values, {setSubmitting}) => {
                    handleModalClose();
                    await handleEditPack(values.namePack);
                    setSubmitting(false);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={cn(styles.fieldsWrapper)}>
                            <AppInput
                                label="Name Pack"
                                name="namePack"
                                className={cn(styles.field)}
                                error={errors.namePack && touched.namePack && errors.namePack ? errors.namePack : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.namePack}
                            />
                        </div>
                        <div className={styles.modalButtonsWrapper}>
                            <SuperButton type="button" disabled={isSubmitting}
                                         onClick={handleModalClose}>Cancel</SuperButton>
                            <SuperButton type="submit" disabled={isSubmitting}>Save</SuperButton>
                        </div>
                    </form>
                )}
            </Formik>,
        },
    };

    const columns = useMemo(() => [
        {
            id: 'name',
            value: <SortableTableHeader id="name" onClick={handleTableOrderChange}>Name</SortableTableHeader>,
            render: (cardPack: CardPackType) => {
                return (
                    <CellLink to={cardPack._id}>{cardPack.name}</CellLink>
                );
            },
        },
        {
            id: 'cardsCount',
            value: <SortableTableHeader id="cardsCount" onClick={handleTableOrderChange}>Cards</SortableTableHeader>,
        },
        {
            id: 'updated',
            value: <SortableTableHeader id="updated" onClick={handleTableOrderChange}>Last
                Updated</SortableTableHeader>,
        },
        {
            id: 'user_name',
            value: <SortableTableHeader id="user_name" onClick={handleTableOrderChange}>Created
                by</SortableTableHeader>,
        },
        {
            id: 'actions',
            value: 'Actions',
            render: (cardPack: CardPackType) => {
                const handleButtonClick = (evt: MouseEvent<HTMLElement>) => {
                    if (evt.currentTarget.dataset.id && Object.keys(modalsMap).includes(evt.currentTarget.dataset.id)) {
                        handleModalOpen(evt.currentTarget.dataset.id as ModalsType, cardPack);
                    }
                };

                if (cardPack.user_id !== userID) {
                    return <Link to={`/pack_learn/${cardPack._id}?packName=${cardPack.name}`}>
                        <SuperButton small type="button" data-id="learn">
                            Learn
                        </SuperButton>
                    </Link>;
                }

                return (
                    <div style={{display: 'flex'}}>
                        <div className={styles.buttonWrapper}>
                            <SuperButton small red type="button" data-id="delete"
                                         onClick={handleButtonClick}>Delete</SuperButton>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <SuperButton small type="button" data-id="edit"
                                         onClick={handleButtonClick}>Edit</SuperButton>
                        </div>
                        <div className={styles.buttonWrapper}>
                            <Link to={`/pack_learn/${cardPack._id}?packName=${cardPack.name}`}>
                                <SuperButton small type="button" data-id="learn">
                                    Learn
                                </SuperButton>
                            </Link>
                        </div>
                    </div>
                );
            },
        },
    ], [userID, handleTableOrderChange, handleModalOpen]);

    return (
        <>
            <Table columns={columns} items={cardsPack?.cardPacks ?? []} itemRowKey="_id"
                   loading={cardsPackLoadingStatus}/>
            {
                modalType && <Dialog
                    isActive={modalStatus}
                    headerText={modalsMap[modalType].header}
                    onClose={handleModalClose}
                >
                    {modalsMap[modalType].body}
                </Dialog>
            }
        </>
    );
};
