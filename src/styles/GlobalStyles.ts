import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root{
    /* Blue 500 */
    --primary: #2196F3;
    --complementary: #f37f21;
    --triadic1: #8021f3;
    --triadic2: #f32194;

    --white: #fff;
    --black: #000;

    /* Discord bg */
    --dark: #36393f;
    --darker: #2f3136;
    --darkest: #202225;
  }

  html{
    font-size: 10px;
    background-color: var(--dark);
  }

  body{
    font-size: 2rem;
  }
`;

export default GlobalStyles;
