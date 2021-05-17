import React from 'react';
import styled from 'styled-components';
import HelloWorld from '../components/HelloWorld';
import ToastLauncher from '../components/ToastLauncher';

const WrapperStyles = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
`;

export default function HomePage(): JSX.Element {
  return (
    <WrapperStyles>
      <HelloWorld />
      <ToastLauncher />
    </WrapperStyles>
  );
}
