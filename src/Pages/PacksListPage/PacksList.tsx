import React, {useCallback, useEffect, useState} from 'react';
import s from './PacksListPage.module.css'
import {AllMySelector} from "../../components/common/AllMySelector/AllMySelector";
import {DoubleRange} from "../../components/common/DoubleRange/DoubleRange";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppSelector, useTypedDispatch} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {Packs} from '../../components/Packs';
import {Pagination} from '../../components/common/Pagination/Pagination';
import {setPackNameAC, setPacksPageAC, setPacksPageCountAC,} from '../../bll/packs-filter-settings-reducer';
import {Search} from '../../components/common/SearchBlock/Search';
import {addCardPack, fetchCardsPack} from '../../bll/packs-reducer';
import SuperButton from "../ProfilePage/common/Button/SuperButton";
import {Dialog} from '../../components/common/Dialog';
import cn from 'classnames';
import styles from '../../components/forms/SignUp/SignUp.module.css';
import AppInput from '../../components/common/AppInput/AppInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AppCheckbox from "../../components/common/AppCheckbox/AppCheckbox";

const schema = Yup.object<Record<'namePack', Yup.AnySchema>>({
    namePack: Yup.string().required(),
});

export const PacksList = () => {
    const loadingStatus = useAppSelector<boolean>(state => state.cardsPack.isLoading)
    const totalItemsCount = useAppSelector(state => state.packsFilterSettings.totalCardsCount)
    const itemsOnPageCount = useAppSelector<number>(state => state.packsFilterSettings.pageCount)
    const packName = useAppSelector(state => state.packsFilterSettings.packName)
    const min = useAppSelector<number>(state => state.packsFilterSettings.min)
    const max = useAppSelector<number>(state => state.packsFilterSettings.max)
    const sortPacks = useAppSelector(state => state.packsFilterSettings.sortPacks)
    const currentPage = useAppSelector<number>(state => state.packsFilterSettings.page)
    const user_id = useAppSelector(state => state.packsFilterSettings.user_id)
    const dispatch = useTypedDispatch()

    const [modalStatus, setModalStatus] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchCardsPack());
    }, [dispatch, itemsOnPageCount, packName, min, max, currentPage, sortPacks, user_id]);

    const onChangeSearchHandler = (value: string) => {
        dispatch(setPackNameAC(value))
    }

    const onPageChangedHandler = (pageNumber: number) => {
        dispatch(setPacksPageAC(pageNumber))
    }

    const onChangeItemsCountHandler = (value: number) => {
        dispatch(setPacksPageCountAC(value))
    }

    const handleModalOpen = useCallback(() => {
        setModalStatus(true);
    }, [setModalStatus]);

    const handleModalClose = useCallback(() => {
        setModalStatus(false);
    }, [setModalStatus]);

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.sideBar}>
                    <h3 className={s.sideBarTitle}>Show Packs Cards</h3>
                    <div className={s.ownSelector}>
                        <AllMySelector/>
                    </div>
                    <h3 className={s.sideBarTitle}>Number of Cards</h3>
                    <div className={s.ownSelector}>
                        <DoubleRange/>
                    </div>
                </div>
                <div className={s.packsBar}>
                    <h1 className={s.packsBarTitle}>Packs List</h1>
                    <div className={s.packsBarActions}>
                        <Search onChange={onChangeSearchHandler}/>
                        <SuperButton style={{width: '184px'}} onClick={handleModalOpen}>Add new pack</SuperButton>
                    </div>
                    <div className={s.packsBarContent}>
                        <Packs/>
                    </div>
                    <Pagination currentPage={currentPage}
                                itemsOnPageCount={itemsOnPageCount}
                                totalItemsCount={totalItemsCount}
                                onPageChanged={onPageChangedHandler}
                                onChangeItemsOnPageCount={onChangeItemsCountHandler}
                    />
                    <Dialog
                        isActive={modalStatus}
                        headerText="Add New Pack"
                        onClose={handleModalClose}
                    >
                        <Formik
                            initialValues={{namePack: '', private: false}}
                            validationSchema={schema}
                            onSubmit={async (values, {setSubmitting}) => {
                                handleModalClose();
                                await dispatch(addCardPack(values.namePack, values.private));
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
                                    <div className={styles.fieldsWrapper}>
                                        <AppCheckbox name={'private'}
                                                     onChange={handleChange}
                                                     checked={values.private}
                                        /> Private pack
                                    </div>
                                    <div className={cn(styles.buttonWrapper)}>
                                        <SuperButton type="button" disabled={isSubmitting}
                                                     onClick={handleModalClose}>Cancel</SuperButton>
                                        <SuperButton type="submit" disabled={isSubmitting}>Save</SuperButton>
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
