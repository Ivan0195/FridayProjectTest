import { useAppSelector } from '../bll/store';
import { getUser } from '../bll/login-reducer';


export const useAuth = () => {
  return useAppSelector(getUser);
};
