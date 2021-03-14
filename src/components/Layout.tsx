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
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: var(--darker);
  padding: 1rem;
`;

const PageWrapper = styled.div`
  height: 100vh;
  overflow: auto;
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
