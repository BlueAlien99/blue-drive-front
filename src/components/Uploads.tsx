import React from 'react';
import styled from 'styled-components';
import { useUploadFiles } from './UploadContext';
import { fractionToPercentage, bytesToHumanReadable } from '../utils/utils';

const UploadsStyles = styled.div`
  height: 100%;
  background: var(--primary-dark);
`;

const UploadListStyles = styled.div``;

const UploadFileStyles = styled.div`
  display: grid;
  grid-column: auto 1fr;
`;

const UploadFileInfoStyles = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
`;

const ProgressBarStyles = styled.div<{ progress: string }>`
  width: ${props => props.progress};
  height: 4px;
  background: linear-gradient(to right, var(--triadic1), var(--triadic2));
`;

export default function Uploads(): JSX.Element {
  const uploadFiles = useUploadFiles();

  return (
    <UploadsStyles>
      UPLOADS
      <UploadListStyles>
        {uploadFiles.map(file => (
          <UploadFileStyles key={file.id}>
            <span>📄</span>
            <UploadFileInfoStyles>
              <span>{file.name}</span>
              <span>to /eg/path/of/file</span>
              <span>
                {bytesToHumanReadable(file.loaded)} / {bytesToHumanReadable(file.total)} (
                {fractionToPercentage(file.loaded / file.total)})
              </span>
              <ProgressBarStyles progress={fractionToPercentage(file.loaded / file.total)} />
            </UploadFileInfoStyles>
          </UploadFileStyles>
        ))}
      </UploadListStyles>
    </UploadsStyles>
  );
}
