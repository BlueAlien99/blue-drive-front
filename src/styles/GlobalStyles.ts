import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root{
    /* Blue 500 */
    --primary: #2196F3;
    --primary-hover: #1976D2;
    --complementary: #f37f21;
    --triadic1: #8021f3;
    --triadic2: #f32194;

    --white: #fff;
    --black: #000;

    /* Discord bg */
    --dark: #36393f;
    --darker: #2f3136;
    --darkest: #202225;

    --secondary: #546E7A;
    --success: #43A047;
    --danger: #E53935;
    --warning: #FB8C00;
    --info: #039BE5;

    --secondary-hover: #37474F;
    --success-hover: #2E7D32;
    --danger-hover: #C62828;
    --warning-hover: #EF6C00;
    --info-hover: #0277BD;

    --shadow-color: rgba(0, 0, 0, 0.8);
  }

  html{
    height: 100vh;
    background-color: var(--dark);
  }
  
  button{
    --btn-color: var(--primary);
    --btn-color-hover: var(--primary-hover);
    --btn-shadow-color: var(--primary);
    border: none;
    outline: none;

    padding: 0.75rem;
    color: var(--white);
    background: var(--btn-color);
    border-radius: 0.5rem;
    box-shadow: 0 0 8px var(--btn-shadow-color);
    transition: background-color 0.2s, box-shadow 0.2s;

    &.secondary{
      --btn-color: var(--secondary);
      --btn-color-hover: var(--secondary-hover);
    }

    &.success{
      --btn-color: var(--success);
      --btn-color-hover: var(--success-hover);
    }
    
    &.danger{
      --btn-color: var(--danger);
      --btn-color-hover: var(--danger-hover);
    }

    &.warning{
      --btn-color: var(--warning);
      --btn-color-hover: var(--warning-hover);
    }

    &.info{
      --btn-color: var(--info);
      --btn-color-hover: var(--info-hover);
    }

    &:hover{
      background: var(--btn-color-hover);
    }

    &:active{
      --btn-shadow-color: var(--triadic1);
    }

    &:disabled{
      background: var(--btn-color);
      filter: brightness(0.6) contrast(0.8);
    }
  }
`;

export default GlobalStyles;
