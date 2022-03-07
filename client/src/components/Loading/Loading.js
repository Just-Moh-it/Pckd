import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import loadingAnimation from "../../assets/images/loading.json";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  max-height: 200px;
`;

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Wrapper>
      <Lottie options={defaultOptions} width={500} />
    </Wrapper>
  );
};

export default Loading;
