import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import ActivePckdInfo from "./ActivePckdInfo";
import Graphs from "./Graphs";

import NewUserWelcomeImg from "../../../../assets/images/new-user-welcome.png";

const MainWrapperStyles = styled.div`
  height: 100%;
  max-height: 95vh;
  padding-bottom: 20px;
  overflow-y: scroll;
  padding: 14px 30px 0 0;
  flex-grow: 1;

  & .main-btn {
    padding: 7px;
  }

  /* Header Content */
  & .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }

  /* Search Bar */
  & .search-bar {
    padding: 13px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .search-bar input {
    /* flex-grow: 1; */
    border: none;
    background-color: transparent;
    padding: 0;
    font-size: 16px;
    line-height: 18px;
    color: #878787;
    outline: none;
    margin-left: 10px;
  }
`;

const NoPckdsMessageWrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const NoPckdsMessageContainer = styled.div`
  max-width: 500px;
  margin-top: -100px;

  img {
    width: 70%;
  }
`;

const MainWrapper = () => {
  const activePckd = useSelector((state) => state.dashboard.activePckd);

  return (
    <MainWrapperStyles
      className="title-wrapper"
      initial="hidden"
      animate="shown"
      variants={{
        hidden: { y: "10%", opacity: 0 },
        shown: {
          y: 0,
          opacity: 1,
          transition: { delay: 1.3, duration: 0.3 },
        },
      }}
    >
      {activePckd?.id ? (
        <>
          <ActivePckdInfo activePckd={activePckd} />
          <Graphs activePckd={activePckd} />
        </>
      ) : (
        <>
          <NoPckdsMessageWrapper>
            <NoPckdsMessageContainer>
              <img src={NewUserWelcomeImg} alt="Welcome" />
              <h2>Seems like you're new here!</h2>
              <h4>Get started by creating your first Pckd.</h4>
              <p>
                Click the <code>Create Pckd</code> on the top right corner. Add
                Some details and then click <code>Create</code> to see your
                first short URL in action
              </p>
              <p>
                Come back here for details about your first Pckd, like the
                visitors, etc.
              </p>
            </NoPckdsMessageContainer>
          </NoPckdsMessageWrapper>
        </>
      )}
    </MainWrapperStyles>
  );
};

export default MainWrapper;
