import { Card } from '../../../../components/common/Card';
import { CardHeader } from '../../../../components/common/Card/elements/CardHeader';
import { CardBox } from '../../../../components/common/Card/elements/CardBox';
import SuperButton from '../../../ProfilePage/common/Button/SuperButton';
import { ModalDialog } from '../../../../components/common/ModalDialog';
import React from 'react';
import { ModalsPropsType } from '../Modals';
import cn from 'classnames';
import AppInput from '../../../../components/common/AppInput/AppInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTypedDispatch } from '../../../../bll/store';
import styles from './EditModal.module.css';

type EditModalPropsType = Omit<ModalsPropsType, 'type'>;

type ModalFieldsType = {
  namePack: string;
};

const schema = Yup.object<Record<keyof ModalFieldsType, Yup.AnySchema>>({
  namePack: Yup.string().required(),
});

export const EditModal: React.FC<EditModalPropsType> = ({ modalStatus, setModalStatus }) => {
  const dispatch = useTypedDispatch();
  const handleCancelClick = () => {
    setModalStatus(false);
  };

  return (
    <ModalDialog active={modalStatus} setActive={setModalStatus}>
      <Card>
        <CardHeader>Edit Pack</CardHeader>
        <CardBox>
          <Formik
            initialValues={{ namePack: '' }}
            validationSchema={schema}
            onSubmit={async (values, { setSubmitting }) => {
              // await dispatch(updatePack(values));
              console.log(values);
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
                <AppInput
                  label="Name Pack"
                  name="namePack"
                  className={cn(styles.field)}
                  error={errors.namePack && touched.namePack && errors.namePack ? errors.namePack : ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.namePack}
                />
                <div className={styles.buttonsWrapper}>
                  <SuperButton type="button" disabled={isSubmitting} onClick={handleCancelClick}>Cancel</SuperButton>
                  <SuperButton type="submit" disabled={isSubmitting} >Save</SuperButton>
                </div>
              </form>
            )}
          </Formik>
        </CardBox>
      </Card>
    </ModalDialog>
  );
};
