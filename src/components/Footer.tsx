import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  justify-self: center;
`;

export default function Footer(): JSX.Element {
  return (
    <FooterStyles>
      <p>&copy; BlueDrive {new Date().getFullYear()}</p>
    </FooterStyles>
  );
}
