import {AxiosError} from 'axios';
import {ErrorResponseType} from '../types/responseTypes';
import {toast} from 'react-toastify';

export const handleNetworkError = (err: AxiosError<ErrorResponseType>) => {
    if (err.response && err.response.data?.error) {
        toast.error(err.response.data.error);
    } else {
        toast.error('Network error, try later');
    }
};

export const notificationHandler = (mess: string) => {
    toast.info(mess);
};
