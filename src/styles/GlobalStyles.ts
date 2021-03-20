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
  
  button{
    --btn-shadow-color: var(--primary);
    border: none;
    outline: none;

    padding: 0.75rem;
    color: var(--white);
    background: var(--primary);
    border-radius: 0.5rem;
    box-shadow: 0 0 8px var(--btn-shadow-color);
    transition: background-color 0.4s, box-shadow 0.2s;

    &:hover{
      background: var(--triadic1);
    }

    &:active{
      --btn-shadow-color: var(--triadic1);
    }

    &:disabled{
      background: var(--primary);
      opacity: 50%;
    }
  }
`;

export default GlobalStyles;
