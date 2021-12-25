import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  ::before {
    position: absolute;
    content: "";
  }

  /* reflection of the animation in the bottom */
  & {
    position: relative;
    -webkit-box-reflect: below 5px
      linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
    /*  Just to make it center  */
    transform: translatey(-25%);
  }

  &::before {
    width: 100%;
    height: 10px;
    bottom: -10px;
    background: rgba(0, 0, 0);
    border-radius: 100%;
    filter: blur(7px);
  }

  /* main loading circle  */
  .loading {
    width: 300px;
    height: 300px;
    border-radius: 999px;
    transform: rotate(-45deg);
    animation: animated-curve 2s ease-in-out infinite;
  }

  /*  neon-semicircle */
  .loading::before {
    bottom: 0;
    background: #02fcfa;
    width: 100%;
    height: 50%;
    border-radius: 0 0 999px 999px;
    box-shadow: 0 0 100px -50px #02fcfa;
  }

  /* inner-cirle with the ball */
  .inner_circle {
    position: absolute;
    inset: 20px;
    background: var(--background-color);
    border-radius: 999px;
    animation: animated-ball 2s ease-in-out infinite;
  }

  /* style for the ball */
  .inner_circle::before {
    inset: 2px;
    top: 45%;
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 999px;
  }

  /* rotating the ball from initial point to -180deg */
  @keyframes animated-ball {
    50% {
      transform: rotate(-180deg);
    }
  }

  /* rotating the circle from initial point (-45deg) to 45deg */
  @keyframes animated-curve {
    50% {
      transform: rotate(45deg);
    }
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <div class="loading">
        <div class="inner_circle"></div>
      </div>
    </Wrapper>
  );
};

export default Loading;
