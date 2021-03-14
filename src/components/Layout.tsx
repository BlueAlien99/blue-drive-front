import React from 'react';
import { PageProps } from 'gatsby';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout({ children }: PageProps): JSX.Element {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
