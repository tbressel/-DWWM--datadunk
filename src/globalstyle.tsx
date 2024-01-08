import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    min-width: 320px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  @font-face {
        font-family: 'Gibson Bold';
        src: url('/assets/fonts/GibsonBold.woff2') format('woff2');
  }
  @font-face {
        font-family: 'Gibson Light';
        src: url('/assets/fonts/GibsonLight.woff2') format('woff2');
  }
  @font-face {
        font-family: 'Gibson Medium';
        src: url('/assets/fonts/GibsonMedium.woff2') format('woff2');
  }
  @font-face {
        font-family: 'Gibson SemiBold';
        src: url('/assets/fonts/GibsonSemiBold.woff2') format('woff2');
  }
  @font-face {
        font-family: 'Gibson Thin';
        src: url('/assets/fonts/GibsonThin.woff2') format('woff2');
  }
`;