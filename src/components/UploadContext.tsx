import axios, { AxiosError } from 'axios';
import React, { createContext, useMemo, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { getNewUIDGenerator } from '../utils/simpleUID';

export interface UploadFile {
  id: number;
  name: string;
  status: FetchState;
  loaded: number;
  total: number;
}

export interface FileUploadManager {
  files: UploadFile[];
  upload: (files: FileList, refresh: () => void) => void;
}

const UploadContext = createContext<FileUploadManager>({
  files: [],
  upload: () => {
    throw Error('UploadContext has no Provider!');
  },
});

export const useUpload = (): FileUploadManager => useContext(UploadContext);

interface UploadContextWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export function UploadContextWrapper({ children }: UploadContextWrapperProps): JSX.Element {
  const [files, setFiles] = useState<UploadFile[]>([]);

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

  const upload = (fileList: FileList, refresh: () => void) => {
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
        .post('/api/file', data, {
          onUploadProgress: (e: ProgressEvent) =>
            updateFile(oldFile => ({
              ...oldFile,
              loaded: e.loaded,
              total: e.total,
            })),
        })
        .then(() => {
          refresh();
          launchToast('success', `Uploaded ${file.name}`);
        })
        .catch((err: AxiosError) => launchToast('error', err.message));
    });
  };

  const fileUploadManager = {
    files,
    upload,
  };

  return (
    <>
      <UploadContext.Provider value={fileUploadManager}>{children}</UploadContext.Provider>
    </>
  );
}
