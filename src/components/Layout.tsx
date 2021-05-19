import React from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import { ToastContextWrapper } from './ToastContext';
import { UploadContextWrapper } from './UploadContext';
import { AuthContextWrapper } from './AuthContext';

const SiteStyles = styled.div`
  position: relative;
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
  position: relative;
  height: 100vh;
  overflow: auto;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
`;

export default function Layout({ children }: PageProps): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Typography />

      <SiteStyles>
        <ToastContextWrapper>
          <AuthContextWrapper>
            <UploadContextWrapper>
              <SidebarStyles>
                <Nav />
                <Footer />
              </SidebarStyles>

              <PageWrapper>{children}</PageWrapper>
            </UploadContextWrapper>
          </AuthContextWrapper>
        </ToastContextWrapper>
      </SiteStyles>
    </>
  );
}
