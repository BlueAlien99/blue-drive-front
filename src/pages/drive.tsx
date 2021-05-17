import axios, { AxiosError } from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import DriveFile from '../components/DriveFile';
import { useToast } from '../components/ToastContext';
import Uploads from '../components/Uploads';
import { useUpload } from '../components/UploadContext';
import LoadingBlur from '../components/LoadingBlur';

const WrapperStyles = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const DriveWrapperStyles = styled.div`
  overflow-y: auto;
`;

const DriveStyles = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto 1fr;
`;

const PathStyles = styled.div`
  text-shadow: 0 0 8px var(--triadic1);
`;

const FileTableStyles = styled.table`
  --emoji-clearance: 4rem;

  align-self: flex-start;
  width: 100%;
  padding-top: 2rem;
  font-size: 1.5rem;

  th {
    padding: 1rem 0;
    color: var(--primary);
    background-color: var(--darkest);
  }

  tr:not(:first-child):hover {
    background-color: var(--darker);
  }

  td {
    padding: 0.5rem 0;
    text-align: center;
    border-bottom: 2px solid var(--darker);
  }

  [aria-label=\"Directory\"] {
    width: var(--emoji-clearance);
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }
`;

const strArrToPath = (path: string[]) => '/'.concat(path.join('/'));

export default function DrivePage(): JSX.Element {
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [path, setPath] = useState<string[]>([]);
  const [files, setFiles] = useState<DriveFile[]>([]);

  const launchToast = useToast();
  const { upload, addRefreshCallback, removeRefreshCallback } = useUpload();

  // TODO: RxJS, with Observables and cancel
  const fetchFiles = useCallback(() => {
    if (fetchState !== 'pending') {
      setFetchState('pending');
      axios
        .get<DriveFile[]>(`/api/file/list-dir?directoryPath=${strArrToPath(path)}`)
        .then(res => res.data.filter(d => d))
        .then(data => {
          setFiles(data);
          setFetchState('success');
        })
        .catch((err: AxiosError) => {
          setFetchState('failed');
          launchToast('error', err.message);
        });
    }
  }, [fetchState, launchToast, path]);

  // temp, just for testing / demo
  useEffect(() => {
    setPath(['not', 'yet', 'working_path']);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchFiles, [path]);

  useEffect(() => {
    addRefreshCallback(fetchFiles);
    return () => removeRefreshCallback(fetchFiles);
  }, [fetchFiles, addRefreshCallback, removeRefreshCallback]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      upload(e.target.files, strArrToPath(path));
    }
    e.target.value = '';
  };

  const deleteFileFactory = (id: string) => () =>
    setFiles(oldFiles => oldFiles.filter(f => f.id !== id));

  return (
    <WrapperStyles>
      <DriveWrapperStyles>
        <LoadingBlur fetchState={fetchState}>
          <DriveStyles>
            <input type="file" multiple onChange={handleUpload} />
            <PathStyles>{strArrToPath(path)}</PathStyles>
            <FileTableStyles cellSpacing="0">
              <tbody>
                <tr>
                  <th aria-label="Directory">{}</th>
                  <th className="left">Name</th>
                  <th className="right">Size</th>
                  <th>Modified</th>
                  <th>Actions</th>
                </tr>
                {files.map(f => (
                  <DriveFile key={f.id} file={f} deleteFile={deleteFileFactory(f.id)} />
                ))}
              </tbody>
            </FileTableStyles>
          </DriveStyles>
        </LoadingBlur>
      </DriveWrapperStyles>
      <Uploads />
    </WrapperStyles>
  );
}
