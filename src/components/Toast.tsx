import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const toastSlideIn = keyframes`
  0%{
    opacity: 0;
    transform: translateY(-200%);
  }
`;

const ToastStyles = styled.div<{ hidingDuration: string }>`
  --bg-color: var(--info);
  --shadow-color: var(--info-dark);

  min-width: 400px;
  max-width: 800px;
  /* width: clamp(250px, 60%, 800px); */
  position: absolute;
  padding: 1rem;
  background-color: var(--bg-color);
  border-radius: 0.5rem;
  box-shadow: 0 0 4px 2px var(--shadow-color);
  box-sizing: border-box;
  filter: contrast(0.8);
  pointer-events: auto;
  cursor: default;
  animation: ${toastSlideIn} 0.3s cubic-bezier(0, 1, 0.7, 1.3);
  transform: translateY(100%);
  transition: opacity ${props => props.hidingDuration};

  &.error {
    --bg-color: var(--danger);
    --shadow-color: var(--danger-dark);
  }

  &.warning {
    --bg-color: var(--warning);
    --shadow-color: var(--warning-dark);
  }

  &.success {
    --bg-color: var(--success);
    --shadow-color: var(--success-dark);
  }

  &.hiding {
    opacity: 0;
  }
`;

export type ToastType = 'error' | 'warning' | 'success' | 'info';

export interface ToastProps {
  id: number;
  type: ToastType;
  msg: string;
  pop: () => void;
}

const DEFAULT_TIMEOUT = 4000;
const HIDING_DURATION = 1000;

export default function Toast({ type, msg, pop }: ToastProps): JSX.Element {
  const toast = useRef<HTMLDivElement>(null);

  const cssHidingDuration = `${HIDING_DURATION / 1000}s`;

  setTimeout(() => {
    toast.current?.classList.add('hiding');
    setTimeout(pop, HIDING_DURATION);
  }, DEFAULT_TIMEOUT);

  return (
    <ToastStyles hidingDuration={cssHidingDuration} className={type} ref={toast} onClick={pop}>
      {msg}
    </ToastStyles>
  );
}
