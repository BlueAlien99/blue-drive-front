import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DriveFile from '../components/DriveFile';
import { useToast } from '../components/ToastContext';
import Spinner from '../components/Spinner';
import Uploads from '../components/Uploads';
import { useUpload } from '../components/UploadContext';

const WrapperStyles = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const DriveWrapperStyles = styled.div`
  position: relative;
`;

const LoadingStyles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const DriveStyles = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr;

  &.loading {
    filter: blur(4px);
  }
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
  const fileUploadManager = useUpload();

  console.log('fuck');

  // TODO: RxJS, with Observables and cancel
  const fetchFiles = () => {
    if (fetchState !== 'pending') {
      setFetchState('pending');
      axios
        .get<DriveFile[]>(`/api/file/listdir`)
        .then(res => res.data)
        .then(data => {
          setFiles(data);
          setFetchState('success');
        })
        .catch((err: AxiosError) => {
          setFetchState('failed');
          launchToast('error', err.message);
        });
    }
  };

  const refresh = () => {
    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
    setPath(['not', 'yet', 'working_path']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      fileUploadManager.upload(e.target.files, refresh);
    }
    e.target.value = '';
  };

  const isLoading = () => fetchState === 'pending';

  // TODO: LoadingStyles to Layout?
  return (
    <>
      <WrapperStyles>
        <DriveWrapperStyles>
          {isLoading() && (
            <LoadingStyles>
              <Spinner />
            </LoadingStyles>
          )}
          <DriveStyles className={isLoading() ? 'loading' : ''}>
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
                  <DriveFile key={f.filename} file={f} refresh={refresh} />
                ))}
              </tbody>
            </FileTableStyles>
          </DriveStyles>
        </DriveWrapperStyles>
        <Uploads />
      </WrapperStyles>
    </>
  );
}
