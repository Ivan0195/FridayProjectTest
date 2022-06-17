import { Search } from '../../components/common/SearchBlock/Search';
import { Pagination } from '../../components/common/Pagination/Pagination';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import s from './CardsPage.module.css';
import { Cards } from '../../components/Cards';
import { useAppSelector, useTypedDispatch } from '../../bll/store';
import { addCard, addCardPack, fetchCard, setCards } from '../../bll/packs-reducer';
import { Link, useParams } from 'react-router-dom';
import {setCardAnswerAC, setCardQuestionAC, setCardsPageAC, setCardsPageCountAC} from '../../bll/cards-reducer';
import { RoutesEnum } from '../../types/enums/routes';
import SuperButton from '../ProfilePage/common/Button/SuperButton';
import { Formik } from 'formik';
import cn from 'classnames';
import styles from '../../components/forms/SignUp/SignUp.module.css';
import AppInput from '../../components/common/AppInput/AppInput';
import { Dialog } from '../../components/common/Dialog';
import * as Yup from 'yup';
import { AppInputFile } from '../../components/common/AppInputFile';
import { toast } from 'react-toastify';
import { CardsAddPayloadType } from '../../types/requestTypes';
import { getUserData } from '../../bll/login-reducer';

const schema = Yup.object<Record<'question' | 'answer', Yup.AnySchema>>({
  question: Yup.string().required(),
  answer: Yup.string().required(),
});

export const CardsPage = () => {
  const currentPage = useAppSelector(state => state.cardsSettings.page)
  const itemsOnPageCount = useAppSelector(state => state.cardsSettings.pageCount)
  const totalItemsCount = useAppSelector(state => state.cardsSettings.totalCardsCount)
  const cardQuestion = useAppSelector(state => state.cardsSettings.cardQuestion)
  const cardAnswer = useAppSelector(state => state.cardsSettings.cardAnswer)
  const sortCards = useAppSelector(state => state.cardsSettings.sortCards)
  const { _id: userID } = useAppSelector(getUserData);
  const packUserID = useAppSelector(state => state.cardsPack.cards?.packUserId)
  const dispatch = useTypedDispatch();
  const {id} = useParams<{ id: string }>();

  const [modalStatus, setModalStatus] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchCard(id));
    }

    return () => {
      dispatch(setCards(null));
    };
  }, [dispatch, id, cardQuestion, currentPage, totalItemsCount, cardAnswer, sortCards]);

  const onChangeSearchHandler = (value: string) => {
    dispatch(setCardAnswerAC(value))
    dispatch(setCardQuestionAC(value))
  }

  const onPageChangedHandler = (pageNumber: number) => {
    dispatch(setCardsPageAC(pageNumber))
  }

  const onChangeItemsCountHandler = (value: number) => {
    dispatch(setCardsPageCountAC(value))
  }

  const handleModalOpen = useCallback(() => {
    setModalStatus(true);
  }, [setModalStatus]);

  const handleModalClose = useCallback(() => {
    setModalStatus(false);
  }, [setModalStatus]);

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

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.cards}>
          <Link to={RoutesEnum.Packs} className={s.link}>
            <span className={s.arrow} />
            Pack Name
          </Link>
          <div className={s.packsBarActions}>
            <Search onChange={onChangeSearchHandler}/>
            { userID === packUserID && <SuperButton style={{width:'184px'}} onClick={handleModalOpen}>Add new card</SuperButton> }
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
          <Dialog
            isActive={modalStatus}
            headerText="Add New Card"
            onClose={handleModalClose}
          >
            <Formik
              initialValues={{ question: '', answer: '', questionImg: null, answerImg: null }}
              validationSchema={schema}
              onSubmit={async (values, { setSubmitting }) => {
                handleModalClose();
                setSubmitting(false);
                await dispatch(addCard({ ...values, cardsPack_id: id as string }));
                await dispatch(fetchCard(id as string));
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
                        onChange={(files) => handleFileUpload('answerImg', files, setFieldValue)}
                      />
                    </div>
                  </div>
                  <div className={cn(styles.buttonWrapper)}>
                    <SuperButton type="button" disabled={isSubmitting} onClick={handleModalClose}>Cancel</SuperButton>
                    <SuperButton type="submit" disabled={isSubmitting} >Save</SuperButton>
                  </div>
                </form>
              )}
            </Formik>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
