import { createGlobalStyle } from "styled-components";

// === Fonts ===
// Montserrat
// import Montserrat from "../assets/fonts/Montserrat-Regular.ttf";
// import MontserratBold from "../assets/fonts/Montserrat-Bold.ttf";
// import MontserratMedium from "../assets/fonts/Montserrat-Medium.ttf";

export default createGlobalStyle`
  ${
    "" /* 
  @font-face {
    font-family: 'Montserrat';
    src: local('Montserrat'), local('Montserrat'),
    url(${Montserrat}) format('woff2');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: local('Montserrat'), local('Montserrat'),
    url(${MontserratBold}) format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Montserrat';
    src: local('Montserrat'), local('Montserrat'),
    url(${MontserratMedium}) format('woff2');
    font-weight: 500;
  } */
  }

  color: ${(props) => props.theme.textPrimary};

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  a {
    color: inherit;
  }
`;
