import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type PortalPropsType = {
  children: JSX.Element | string;
};

export const Portal: React.FC<PortalPropsType> = ({ children }) => {
  const [container] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};
