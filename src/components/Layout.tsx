import React from 'react';
import { PageProps } from 'gatsby';
import Footer from './Footer';
import Nav from './Nav';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

export default function Layout({ children }: PageProps): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <Typography />

      <Nav />
      {children}
      <Footer />
    </>
  );
}
