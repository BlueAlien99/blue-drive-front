import { PageProps } from 'gatsby';
import React from 'react';

export default function Page2({ location }: PageProps): JSX.Element {
  return (
    <>
      <p>Page 2</p>
      <p>Location: {location.pathname}</p>
    </>
  );
}
