import { Table } from '../Table';
import { SortableTableHeader } from '../Table/elements/SortableTableHeader';
import { CardPackType, CardType } from '../../types/responseTypes';
import { Rate } from '../common/Rate';
import React, { MouseEvent, useCallback, useState } from 'react';
import { useAppSelector, useTypedDispatch } from '../../bll/store';
import {
    addCard,
    editCard,
    editCardPack,
    fetchCard,
    getCards,
    removeCard,
    removeCardPack
} from '../../bll/packs-reducer';
import { getUserData } from '../../bll/login-reducer';
import { Link } from 'react-router-dom';
import SuperButton from '../../Pages/ProfilePage/common/Button/SuperButton';
import styles from '../Packs/Packs.module.css';
import {ModalsType, sortNumMap} from '../Packs/Packs';
import { Formik } from 'formik';
import cn from 'classnames';
import AppInput from '../common/AppInput/AppInput';
import * as Yup from 'yup';
import s from '../../Pages/CardsPage/CardsPage.module.css';
import { AppInputFile } from '../common/AppInputFile';
import { toast } from 'react-toastify';
import { Dialog } from '../common/Dialog';
import { CardsAddPayloadType } from '../../types/requestTypes';
import {OrdersType} from "../../types/common";
import {setSortPacksAC} from "../../bll/packs-filter-settings-reducer";
import {setSortCardsAC} from "../../bll/cards-reducer";

type ModalsStateTypes = {
    header: string,
    body: JSX.Element;
};



const schema = Yup.object<Record<'question' | 'answer', Yup.AnySchema>>({
    question: Yup.string().required(),
    answer: Yup.string().required(),
});

export const Cards = () => {
    const dispatch = useTypedDispatch();
    const cards = useAppSelector(getCards);
    const {_id: userID} = useAppSelector(getUserData);
    const packUserID = useAppSelector(state => state.cardsPack.cards?.packUserId);

    const [currentCard, setCurrentCard] = useState<CardType | null>(null);
    const [modalStatus, setModalStatus] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalsType | null>(null);

    const handleTableOrderChange = useCallback(({id, order}: { id: string | number, order: OrdersType }) => {
        const sortValue = sortNumMap[order];
        const sortType = !sortValue ? '' : `${sortValue}${id}`;
        dispatch(setSortCardsAC(sortType));
    }, [dispatch]);

    const handleModalOpen = useCallback((type: ModalsType, card: CardType) => {
        setCurrentCard(card);
        setModalStatus(true);
        setModalType(type);
    }, [setModalStatus, setModalType]);

    const handleModalClose = useCallback(() => {
        setCurrentCard(null);
        setModalStatus(false);
        setModalType(null);
    }, [setModalStatus, setModalType]);

    const handleDeleteCard = async () => {
        if (currentCard) {
            await dispatch(removeCard(currentCard._id));
            handleModalClose();
            dispatch(fetchCard(currentCard.cardsPack_id));
        }
    };

    const handleEditCard = async (payload: CardsAddPayloadType) => {
        if (currentCard) {
            await dispatch(editCard(payload));
            handleModalClose();
            dispatch(fetchCard(currentCard.cardsPack_id));
        }
    };

    const columns = [
        {
            id: 'question',
            value: <SortableTableHeader id="question" onClick={handleTableOrderChange}>Question</SortableTableHeader>,
        },
        {
            id: 'answer',
            value: <SortableTableHeader id="answer" onClick={handleTableOrderChange}>Answer</SortableTableHeader>,
        },
        {
            id: 'updated',
            value: <SortableTableHeader id="updated" onClick={handleTableOrderChange}>Last Updated</SortableTableHeader>,
        },
        {
            id: 'user_name',
            value: <SortableTableHeader id="user_name" onClick={handleTableOrderChange}>Grade</SortableTableHeader>,
            render: (card: CardType) => {
                return (
                    <div style={{display: 'flex'}}>
                        <Rate value={Math.floor(card.grade)}/>
                    </div>
                );
            },
        },
    ];

    const handleFileUpload = (
      field: string,
      files: File[] | null,
      setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
    ): void => {
        if (files && files.length) {
            const file = files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFieldValue(field, reader.result);
            };
            reader.onerror = () => {
                toast.error('Error file upload');
            };
        } else {
            setFieldValue(field, null);
        }
    };

    const modalsMap: Record<ModalsType, ModalsStateTypes> = {
        delete: {
            header: 'Delete Pack',
            body: <div>
                <p>
                    Do you really want to remove Pack?
                    All cards will be excluded from this course.
                </p>
                <div className={styles.modalButtonsWrapper}>
                    <SuperButton type="button" onClick={handleModalClose}>Cancel</SuperButton>
                    <SuperButton red type="button" onClick={handleDeleteCard}>Delete</SuperButton>
                </div>
            </div>,
        },
        edit: {
            header: 'Edit',
            body: <Formik
              initialValues={{
                  question: currentCard?.question ?? '',
                  answer: currentCard?.answer ?? '',
                  questionImg: currentCard?.questionImg ?? null,
                  answerImg: currentCard?.answerImg ?? null
              }}
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting }) => {
                  handleEditCard({ card: { ...currentCard, ...values } as CardType });
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
                      setFieldValue,
                  }) => (
                  <form onSubmit={handleSubmit}>
                      <div className={cn(styles.fieldsWrapper)}>
                          <div className={s.fieldBox}>
                              <AppInput
                                label="Question"
                                name="question"
                                className={cn(s.field)}
                                error={errors.question && touched.question && errors.question ? errors.question : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.question}
                              />
                              <AppInputFile
                                id="questionImg"
                                name="questionImg"
                                accept=".png, .jpg, .jpeg"
                                value={values.questionImg}
                                onChange={(files) => handleFileUpload('questionImg', files, setFieldValue)}
                              />
                          </div>
                          <div className={s.fieldBox}>
                              <AppInput
                                label="Answer"
                                name="answer"
                                className={cn(s.field)}
                                error={errors.answer && touched.answer && errors.answer ? errors.answer : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.answer}
                              />
                              <AppInputFile
                                id="answerImg"
                                name="answerImg"
                                accept=".png, .jpg, .jpeg"
                                value={values.answerImg}
                                onChange={(files) => handleFileUpload('answerImg', files, setFieldValue)}
                              />
                          </div>
                      </div>
                      <div className={cn(styles.modalButtonsWrapper)}>
                          <SuperButton type="button" disabled={isSubmitting} onClick={handleModalClose}>Cancel</SuperButton>
                          <SuperButton type="submit" disabled={isSubmitting} >Save</SuperButton>
                      </div>
                  </form>
                )}
            </Formik>,
        },
    };

    const finallyColumns = userID === packUserID
      ? [
        ...columns,
          {
              id: 'actions',
              value: 'Actions',
              render: (card: CardType) => {
                  const handleButtonClick = (evt: MouseEvent<HTMLElement>) => {
                      if (evt.currentTarget.dataset.id && Object.keys(modalsMap).includes(evt.currentTarget.dataset.id)) {
                          handleModalOpen(evt.currentTarget.dataset.id as ModalsType, card);
                      }
                  };

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
                    </div>
                  );
              },
          },
      ]
      : columns;

    return (
      <>
          <Table columns={finallyColumns} items={cards ? cards.cards : []} itemRowKey="_id"/>
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
