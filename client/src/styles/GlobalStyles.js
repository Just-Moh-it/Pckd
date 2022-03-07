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
    color: ${(props) => props.theme.accentColor};
    text-decoration: none;
  }

  ${"" /* Modal Styles */}
  .modal {
    position: absolute;
    max-width: 500px;
    padding: 100px 100px 180px;
    max-height: 200px;
    top: 50%;
    left: 50%;
    height: auto;
    transform: translate(-50%, -50%);
    background-color: purple;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: white;
    color: black;
    font-weight: 500;

    text-align: center;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000010;
  }

  .floating { 
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-left: 30px;
    margin-top: 5px;
}
 
  @keyframes floating {
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 15px); }
    100%   { transform: translate(0, -0px); }   
}

.vl {
  border-left: 1.5px solid #ececec;
  min-height: 50px;
}

.sep {
  border-top: 1.5px solid #ececec;
  min-width: 50px;

}

`;
