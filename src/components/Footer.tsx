import React from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer>
      <p>&copy; BlueDrive {new Date().getFullYear()}</p>
    </footer>
  );
}
