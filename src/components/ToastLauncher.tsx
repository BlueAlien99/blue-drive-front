import React from 'react';
import styled from 'styled-components';
import { useToast } from './ToastContext';

const ToastLauncherStyles = styled.div`
  padding: 2rem;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  background-color: var(--darker);
  box-shadow: 4px 4px 16px var(--shadow-color);

  button {
    min-width: 96px;
  }
`;

export default function ToastLauncher(): JSX.Element {
  const launchToast = useToast();

  console.log('>>>>> rerender  ToastLauncher');

  return (
    <ToastLauncherStyles>
      <button
        type="button"
        className="success"
        onClick={() => launchToast('success', 'Yay! Congratulations!')}
      >
        Success
      </button>
      <button
        type="button"
        className="danger"
        onClick={() => launchToast('error', 'Oh no! Anyway...')}
      >
        Error
      </button>
      <button
        type="button"
        className="warning"
        onClick={() => launchToast('warning', 'Be careful! The end is near!')}
      >
        Warning
      </button>
      <button
        type="button"
        className="info"
        onClick={() =>
          launchToast(
            'info',
            'Informujemy, że na każdej stacji znajduje się żółty telefon alarmowy...'
          )
        }
      >
        Info
      </button>
    </ToastLauncherStyles>
  );
}
