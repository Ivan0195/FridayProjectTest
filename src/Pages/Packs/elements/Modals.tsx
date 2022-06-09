import React from 'react';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';
import { ModalsType } from '../Packs';

export type ModalsPropsType = {
  modalStatus: boolean;
  setModalStatus: (status: boolean) => void;
  type: ModalsType;
};

export const Modals: React.FC<ModalsPropsType> = ({ type, modalStatus, setModalStatus }) => {
  switch (type) {
    case 'delete':
      return (
        <DeleteModal modalStatus={modalStatus} setModalStatus={setModalStatus} />
      );
    case 'edit':
      return (
        <EditModal modalStatus={modalStatus} setModalStatus={setModalStatus} />
      );
    default:
      return null;
  }
};
