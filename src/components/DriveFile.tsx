import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { bytesToHumanReadable, dateToHumanReadable } from '../utils/utils';
import { useToast } from './ToastContext';

const FileStyles = styled.tr`
  td {
    transition: background-color 0.2s;
  }

  &.deleting td {
    background-color: var(--danger);
  }
`;

const FileActionBtnStyles = styled.button`
  --btn-color: var(--darkest) !important;
  --btn-shadow-color: var(--darker);

  width: var(--emoji-clearance);
  margin: 0 0.5rem;
`;

interface DriveFileProps {
  file: DriveFile;
  refresh: () => void;
}

export default function DriveFile({ file, refresh }: DriveFileProps): JSX.Element {
  const [deleteState, setDeleteState] = useState<FetchState>('idle');

  const launchToast = useToast();

  const handleDownload = () => window.location.assign(`/api/file?filename=${file.filename}`);

  // TODO: On success, remove from state, don't fetch again
  const handleDelete = () => {
    if (deleteState !== 'pending') {
      setDeleteState('pending');
      axios
        .delete(`/api/file?filename=${file.filename}`)
        .then(refresh)
        .catch((err: AxiosError) => {
          setDeleteState('failed');
          launchToast('error', err.message);
        });
    }
  };

  const isBeingDeleted = () => deleteState === 'pending';

  return (
    <FileStyles className={isBeingDeleted() ? 'deleting' : ''}>
      <td>📁</td>
      <td className="left">{file.filename}</td>
      <td className="right">{bytesToHumanReadable(file.size)}</td>
      <td>{dateToHumanReadable(file.lastModified)}</td>
      <td>
        <FileActionBtnStyles type="button" disabled={isBeingDeleted()} onClick={handleDownload}>
          📥
        </FileActionBtnStyles>
        <FileActionBtnStyles
          type="button"
          disabled={isBeingDeleted()}
          onClick={handleDelete}
          className="danger"
        >
          ♻️
        </FileActionBtnStyles>
      </td>
    </FileStyles>
  );
}
