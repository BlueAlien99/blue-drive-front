import axios, { AxiosError } from 'axios';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import DriveFile from '../components/DriveFile';
import { useToast } from '../components/ToastContext';
import Uploads from '../components/Uploads';
import { useUpload } from '../components/UploadContext';
import LoadingBlur from '../components/LoadingBlur';
import DriveDirectory from '../components/DriveDirectory';

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
  gap: 2rem;
  grid-template-rows: auto auto 1fr;
  font-size: 1.75rem;
`;

const PathStyles = styled.div`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, var(--triadic1-hue), var(--darker));
  box-sizing: border-box;
`;

const CreateStyles = styled.div`
  margin: 0 1rem;
  display: flex;
  gap: 2rem;
  align-items: center;

  button {
    min-width: 160px;
  }
`;

const FileInputStyles = styled.input`
  position: absolute;
  width: 0;
  height: 0;
`;

// TODO: move common styles to global
const DirNameInputStyles = styled.input`
  --input-border-color: var(--darkest);

  width: 256px;
  padding: 0.5em;
  line-height: 1em;
  color: var(--white);
  background-color: var(--dark);
  border: none;
  border-bottom: 2px solid var(--input-border-color);
  box-sizing: border-box;
  outline: none;
  transition: border 0.2s;

  &:hover {
    --input-border-color: var(--primary-dark);
  }

  &:focus {
    --input-border-color: var(--primary);
  }
`;

const FileTableStyles = styled.table`
  --emoji-clearance: 4rem;

  align-self: flex-start;
  width: 100%;
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
  const [files, setFiles] = useState<DriveElement[]>([]);
  const [currentFiles, setCurrentFiles] = useState<DriveElement[]>([]);

  const fileInput = useRef<HTMLInputElement>(null);
  const [dirNameInput, setDirNameInput] = useState('');

  const launchToast = useToast();
  const { upload, addRefreshCallback, removeRefreshCallback } = useUpload();

  // TODO: RxJS, with Observables and cancel
  const fetchFiles = useCallback(() => {
    if (fetchState !== 'pending') {
      setFetchState('pending');
      axios
        .get<DriveElement[]>(`/api/file/list-dir?directoryPath=/`)
        .then(res =>
          res.data
            .filter(d => d)
            // TODO: dir utils
            .map(d =>
              d.type === 'directory'
                ? {
                    ...d,
                    dirname: d.directoryPath.split('/').slice(-1)[0],
                    directoryPath: strArrToPath(d.directoryPath.split('/').slice(1, -1)),
                  }
                : d
            )
        )
        .then(data => {
          setFiles(data);
          setFetchState('success');
        })
        .catch((err: AxiosError) => {
          setFetchState('failed');
          launchToast('error', err.message);
        });
    }
  }, [fetchState, launchToast]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchFiles, []);

  // TODO: dir utils
  const fileSorter = (a: DriveElement, b: DriveElement): number => {
    if (a.type === b.type) {
      const nameA = a.type === 'directory' ? a.dirname : a.filename;
      const nameB = b.type === 'directory' ? b.dirname : b.filename;
      return nameA.localeCompare(nameB);
    }
    if (a.type === 'directory') {
      return -1;
    }
    return 1;
  };

  useEffect(() => {
    const currentPath = strArrToPath(path);
    const filtered = files.filter(f => f.directoryPath === currentPath);
    if (path.length) {
      filtered.push({ type: 'directory', id: '..', dirname: '..', directoryPath: '' });
    }
    setCurrentFiles(filtered.sort(fileSorter));
  }, [path, files]);

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

  const goToParentDir = () => setPath(oldPath => oldPath.slice(0, -1));

  const goToDir = (dirname: string) => setPath(oldPath => oldPath.concat([dirname]));

  // TODO: Oh my god, what a mess...
  return (
    <WrapperStyles>
      <DriveWrapperStyles>
        <LoadingBlur fetchState={fetchState}>
          <DriveStyles>
            <PathStyles>{strArrToPath(path)}</PathStyles>
            <CreateStyles>
              <FileInputStyles type="file" multiple onChange={handleUpload} ref={fileInput} />
              <button
                type="button"
                className="secondary"
                onClick={() => fileInput.current?.click()}
              >
                📤&ensp;Upload Files
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => launchToast('error', 'Not implemented!')}
              >
                📁&ensp;Create Folder
              </button>
              <DirNameInputStyles
                type="text"
                name="dirName"
                value={dirNameInput}
                onChange={e => setDirNameInput(e.target.value)}
                required
                autoComplete="off"
                placeholder="Folder Name"
              />
            </CreateStyles>
            <FileTableStyles cellSpacing="0">
              <tbody>
                <tr>
                  <th aria-label="Directory">{}</th>
                  <th className="left">Name</th>
                  <th className="right">Size</th>
                  <th>Modified</th>
                  <th>Actions</th>
                </tr>
                {currentFiles.map(f =>
                  f.type === 'file' ? (
                    <DriveFile key={f.id} file={f} deleteFile={deleteFileFactory(f.id)} />
                  ) : (
                    <DriveDirectory
                      key={f.id}
                      directory={f}
                      deleteDirectory={deleteFileFactory(f.id)}
                      goToParentDir={goToParentDir}
                      goToDir={goToDir}
                    />
                  )
                )}
              </tbody>
            </FileTableStyles>
          </DriveStyles>
        </LoadingBlur>
      </DriveWrapperStyles>
      <Uploads />
    </WrapperStyles>
  );
}
