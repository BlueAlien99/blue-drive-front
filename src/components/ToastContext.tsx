import React, { createContext, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { ToastType, ToastProps } from './Toast';

type ToastLauncher = (type: ToastType, msg: string) => void;

const ToastContext = createContext<ToastLauncher>(() => {
  throw Error('ToastContext has no Provider!');
});

export const useToast = (): ToastLauncher => useContext(ToastContext);

const ToastMountPointStyles = styled.div`
  position: absolute;
  grid-column: 2;
  justify-self: center;
  z-index: 1000;
  display: grid;
  justify-items: center;
`;

type ToastContextWrapperProps = {
  children: JSX.Element | JSX.Element[];
};

export function ToastContextWrapper({ children }: ToastContextWrapperProps): JSX.Element {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const launch = useCallback<ToastLauncher>((type, msg) => {
    setToasts(prevToasts => [...prevToasts, { type, msg }]);
  }, []);

  return (
    <>
      <ToastMountPointStyles>
        {toasts.map(t => (
          <span>{t.msg}</span>
        ))}
      </ToastMountPointStyles>
      <ToastContext.Provider value={launch}>{children}</ToastContext.Provider>
    </>
  );
}
