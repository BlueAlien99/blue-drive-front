import React from 'react';
import { PageProps } from 'gatsby';
import HelloWorld from '../components/HelloWorld';

export default function HomePage(props: PageProps): JSX.Element {
  return (
    <div>
      <HelloWorld />
    </div>
  );
}
