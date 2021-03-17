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

    --shadow-color: rgba(0, 0, 0, 0.8);
  }

  html{
    height: 100vh;
    background-color: var(--dark);
  }
`;

export default GlobalStyles;
