import React from 'react';
import styled from 'styled-components';
import { useUploadFiles } from './UploadContext';
import UploadFileTile from './UploadFileTile';

const UploadsStyles = styled.div`
  max-width: 600px;
  height: 100vh;
  background: var(--primary-dark);
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;

  #header {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    font-weight: bolder;
    box-shadow: 0 0 12px 4px var(--primary-dark);
    z-index: 10;
  }
`;

const UploadListStyles = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export default function Uploads(): JSX.Element {
  const uploadFiles = useUploadFiles();

  if (uploadFiles.length === 0) {
    return <></>;
  }

  return (
    <UploadsStyles>
      <div id="header">Uploads</div>
      <UploadListStyles>
        {uploadFiles.map(file => (
          <UploadFileTile key={file.id} file={file} />
        ))}
      </UploadListStyles>
    </UploadsStyles>
  );
}
