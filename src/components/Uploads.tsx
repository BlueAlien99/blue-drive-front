import React from 'react';
import styled from 'styled-components';
import { useUploadFiles } from './UploadContext';
import { fractionToPercentage, bytesToHumanReadable } from '../utils/utils';

const UploadsStyles = styled.div`
  height: 100%;
  background: var(--primary-dark);

  #header {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    font-weight: bolder;
  }
`;

const UploadListStyles = styled.div``;

const UploadFileStyles = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'emoji info'
    'bar bar';
  align-items: center;
  border: 1px solid var(--dark);
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.1);

  &.success {
    background: linear-gradient(to right, var(--success-dark), var(--success));
  }

  &.failed {
    background: linear-gradient(to right, var(--danger-dark), var(--danger));
  }

  #emoji {
    grid-area: emoji;
    margin: 0 1.5rem;
  }
`;

const UploadFileInfoStyles = styled.div`
  grid-area: info;
  display: grid;
  grid-template-rows: repeat(4, auto);

  #filename {
  }

  #path {
    font-size: 0.7em;
  }
`;

const ProgressBarStyles = styled.div<{ progress: string }>`
  grid-area: bar;
  width: ${props => props.progress};
  height: 4px;
  background: linear-gradient(to right, var(--triadic1), var(--triadic2));
`;

export default function Uploads(): JSX.Element {
  const uploadFiles = useUploadFiles();

  return (
    <UploadsStyles>
      <div id="header">Uploads</div>
      <UploadListStyles>
        {uploadFiles.map(file => (
          <UploadFileStyles key={file.id} className={file.status}>
            <span id="emoji">📄</span>
            <UploadFileInfoStyles>
              <span id="filename">{file.name}</span>
              <span id="path">to /eg/path/of/file</span>
              <span>
                {bytesToHumanReadable(file.loaded)} / {bytesToHumanReadable(file.total)} (
                {fractionToPercentage(file.loaded / file.total)})
              </span>
            </UploadFileInfoStyles>
            <ProgressBarStyles progress={fractionToPercentage(file.loaded / file.total)} />
          </UploadFileStyles>
        ))}
      </UploadListStyles>
    </UploadsStyles>
  );
}
