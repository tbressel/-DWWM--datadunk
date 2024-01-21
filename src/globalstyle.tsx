import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    min-width: 320px;
    background-color: ${colors.violet1};
    font-family: 'Barlow Medium';

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
        font-family: 'Gibson Medium';
        src: url('/assets/fonts/GibsonMedium.woff2') format('woff2');
  }
  @font-face {
        font-family: 'Gibson Light';
        src: url('/assets/fonts/GibsonLight.woff2') format('woff2');
  }

  @font-face {
        font-family: 'Barlow Medium';
        src: url('/assets/fonts/Barlow-Medium.woff2') format('woff2');
  }
  @font-face {
        font-family: 'Barlow Regular';
        src: url('/assets/fonts/Barlow-Regular.woff2') format('woff2');
  }
  @font-face {
        font-family: 'Barlow Bold';
        src: url('/assets/fonts/Barlow-Bold.woff2') format('woff2');
  }

--transition: 500ms;


`;