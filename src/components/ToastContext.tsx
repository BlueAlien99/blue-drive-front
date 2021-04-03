import React, { createContext, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import Toast, { ToastType, ToastProps } from './Toast';

type ToastLauncher = (type: ToastType, msg: string) => void;

const ToastContext = createContext<ToastLauncher>(() => {
  throw Error('ToastContext has no Provider!');
});

export const useToast = (): ToastLauncher => useContext(ToastContext);

const ToastMountPointStyles = styled.div`
  width: 100%;
  position: absolute;
  grid-column: 2;
  justify-self: center;
  z-index: 1000;
  display: grid;
  justify-items: center;
  pointer-events: none;
`;

type ToastContextWrapperProps = {
  children: JSX.Element | JSX.Element[];
};

export function ToastContextWrapper({ children }: ToastContextWrapperProps): JSX.Element {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [, setCounter] = useState(0);

  const popFactory = useCallback(
    id => () => setToasts(prevToasts => prevToasts.filter(t => t.id !== id)),
    []
  );

  const launch = useCallback<ToastLauncher>(
    (type, msg) => {
      setCounter(id => {
        const newToast = { id, type, msg, pop: popFactory(id) };
        setToasts(prevToasts => [...prevToasts, newToast]);
        return id + 1;
      });
    },
    [popFactory]
  );

  let currentToast = null;
  if (toasts.length) {
    const t = toasts[0];
    currentToast = <Toast key={t.id} id={t.id} type={t.type} msg={t.msg} pop={t.pop} />;
  }

  return (
    <>
      <ToastMountPointStyles>{currentToast}</ToastMountPointStyles>
      <ToastContext.Provider value={launch}>{children}</ToastContext.Provider>
    </>
  );
}
