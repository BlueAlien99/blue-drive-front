import { createGlobalStyle } from 'styled-components';

const Typography = createGlobalStyle`
  html{
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--white);
  }

  h1, h2, h3, h4, h5, h6{
    font-weight: normal;
    margin: 0;
  }

  a{
    color: var(--primary);
    text-decoration: none;

    &:hover{
      color: var(--triadic1);
    }
  }
`;

export default Typography;
