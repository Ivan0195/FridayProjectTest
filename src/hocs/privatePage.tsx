import { ComponentType } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RoutesEnum } from '../types/enums/routes';

export const PrivateRoute = <T extends Record<string, unknown>>(Component: ComponentType<T>) => {
  return function Comp(props: Record<string, unknown>) {
    const user = useAuth();
    const location = useLocation();

    if (!user) {
      return <Navigate to={RoutesEnum.Login} state={{ from: location }} />;
    }

    return <Component {...(props as T)} />;
  };
};
