import React from "react";
import styled from "styled-components";
import { ReactComponent as BgImage } from "../../assets/images/login-bg.png";

const WindowWrapper = styled.div`
  background-image: url(${BgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div``;

const CreateAuthorizedPckd = () => {
  return (
    <WindowWrapper>
      <ContentWrapper></ContentWrapper>
    </WindowWrapper>
  );
};

export default CreateAuthorizedPckd;
