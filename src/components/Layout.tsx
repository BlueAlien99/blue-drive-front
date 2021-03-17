import React from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

const SiteStyles = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const SidebarStyles = styled.div`
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: var(--darker);
  box-shadow: 0 0 16px var(--shadow-color);
`;

const PageWrapper = styled.div`
  height: 100vh;
  overflow: auto;
  display: grid;
  align-items: center;
  justify-content: center;
`;

export default function Layout({ children }: PageProps): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Typography />

      <SiteStyles>
        <SidebarStyles>
          <Nav />
          <Footer />
        </SidebarStyles>
        <PageWrapper>{children}</PageWrapper>
      </SiteStyles>
    </>
  );
}
