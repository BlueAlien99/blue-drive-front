import React from 'react';
import styled from 'styled-components';

const ToastStyles = styled.div``;

export type ToastType = 'error' | 'warning' | 'success' | 'info';

export interface ToastProps {
  type: ToastType;
  msg: string;
}

export default function Toast({ type, msg }: ToastProps): JSX.Element {
  return <ToastStyles className={type}>{msg}</ToastStyles>;
}
