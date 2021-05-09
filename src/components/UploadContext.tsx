import axios, { AxiosError } from 'axios';
import React, { createContext, useMemo, useContext, useState, useCallback, useEffect } from 'react';
import { useToast } from './ToastContext';
import { getNewUIDGenerator } from '../utils/simpleUID';

export interface UploadFile {
  id: number;
  name: string;
  status: FetchState;
  loaded: number;
  total: number;
}

export interface UploadManager {
  upload: (files: FileList, path: string) => void;
  addRefreshCallback: (cb: () => void) => void;
  removeRefreshCallback: (cb: () => void) => void;
}

const UploadContext = createContext<UploadManager>({
  upload: () => {
    throw Error('UploadContext has no Provider!');
  },
  addRefreshCallback: () => {
    throw Error('UploadContext has no Provider!');
  },
  removeRefreshCallback: () => {
    throw Error('UploadContext has no Provider!');
  },
});

const UploadFilesContext = createContext<UploadFile[]>([]);

export const useUpload = (): UploadManager => useContext(UploadContext);
export const useUploadFiles = (): UploadFile[] => useContext(UploadFilesContext);

interface UploadContextWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export function UploadContextWrapper({ children }: UploadContextWrapperProps): JSX.Element {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [refreshCallbacks, setRefreshCallbacks] = useState<Array<() => void>>([]);
  const [needsRefreshing, setNeedsRefreshing] = useState<boolean>(false);

  const generateUID = useMemo(getNewUIDGenerator, []);

  const launchToast = useToast();

  const updateFileFactory = (id: number) => (getUpdated: (oldFile: UploadFile) => UploadFile) => {
    setFiles(oldFiles => {
      const oldFile = oldFiles.find(f => f.id === id);
      if (oldFile) {
        return oldFiles
          .filter(f => f.id !== id)
          .concat([getUpdated(oldFile)])
          .sort((a, b) => b.id - a.id);
      }
      return oldFiles;
    });
  };

  const upload = useCallback(
    (fileList: FileList, path: string) => {
      Array.from(fileList).forEach(file => {
        const id = generateUID();
        const updateFile = updateFileFactory(id);
        const data = new FormData();
        data.append('file', file);

        setFiles(oldFiles =>
          oldFiles
            .concat([
              {
                id,
                name: file.name,
                status: 'pending',
                loaded: 0,
                total: file.size,
              },
            ])
            .sort((a, b) => b.id - a.id)
        );

        axios
          .post(`/api/file?filepath=${path}/${file.name}`, data, {
            onUploadProgress: (e: ProgressEvent) =>
              updateFile(oldFile => ({
                ...oldFile,
                loaded: e.loaded,
                total: e.total,
              })),
          })
          .then(() => {
            updateFile(oldFile => ({
              ...oldFile,
              status: 'success',
            }));
            setNeedsRefreshing(true);
            launchToast('success', `Uploaded ${file.name}`);
          })
          .catch((err: AxiosError) => {
            updateFile(oldFile => ({
              ...oldFile,
              status: 'failed',
            }));
            launchToast('error', err.message);
          });
      });
    },
    [generateUID, launchToast]
  );

  useEffect(() => {
    if (needsRefreshing) {
      refreshCallbacks.forEach(cb => cb());
      setNeedsRefreshing(false);
    }
  }, [needsRefreshing, refreshCallbacks]);

  const uploadManager: UploadManager = useMemo(
    () => ({
      upload,
      addRefreshCallback: cb => {
        setRefreshCallbacks(oldCbs => [...oldCbs, cb]);
        console.log('ADD CB ');
      },
      removeRefreshCallback: cb => {
        setRefreshCallbacks(oldCbs => oldCbs.filter(oldCb => oldCb !== cb));
        console.log('RM CB  ');
      },
    }),
    [upload]
  );

  useEffect(() => {
    console.log('CBS: ', refreshCallbacks.length);
  }, [refreshCallbacks]);

  return (
    <>
      <UploadContext.Provider value={uploadManager}>
        <UploadFilesContext.Provider value={files}>{children}</UploadFilesContext.Provider>
      </UploadContext.Provider>
    </>
  );
}
