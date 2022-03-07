import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import NewNav from "../../../components/NewNav";

// Items
import LeftWrapper from "./LeftWrapper";
import MainWrapper from "./MainWrapper";
import RightWrapper from "./RightWrapper";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* height: 100%; */
  overflow: hidden;
  background-color: #f3f8fe;
`;

const DashboardWrapper = styled.div`
  padding: 26px 42px 0;
  height: 100%;
  display: grid;
  /* align-items: center; */
  /* place-items: center; */
  max-width: 1500px;
  margin: auto;
  grid-template-columns: 330fr 614fr 161fr;
  grid-template-areas: "left main right";
  flex-grow: 1;

  /* Change font-family of all child elements */
  & * {
    font-family: "Poppins" !important;
  }

  & .main-wrapper {
    background-color: inherit;
  }
  & .main-wrapper:not(:last-child) {
    border-right: 1.5px solid #ececec;
  }
  & .main-wrapper .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-self: stretch;
  }
  & .main-wrapper .title-wrapper:first-child {
    flex-grow: 1;
  }

  & .header-content .title {
    margin-bottom: 18px;
  }

  & .heading {
    /* font-style: normal; */
    font-weight: 800;
    font-size: 27.9497px;
    line-height: 30px;
    margin: 0;
  }
  & .sub-heading {
    font-weight: 800;
    font-size: 12px;
    line-height: 15px;
    color: #c4c4c4;
    margin: 0;
  }

  & .shadowed {
    background: #ffffff;
    box-shadow: 0px 2.88px 18.72px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    border: none;
  }

  /* Button */
  & .btn {
    transition: 0.5s;
    cursor: pointer;
  }

  & .btn:hover {
    /* Gently lift the button */
    transform: translateY(-1px);
    box-shadow: 0px 3.88px 18.72px rgba(0, 0, 0, 0.2);
  }

  & svg {
    /* max-width: 24px; */
    /* min-width: 5px; */
  }

  & .detail {
    margin: 6px 0;
    max-height: 45vh;
  }

  & .detail-content {
    padding: 20px;
  }

  & .detail .header span,
  & .detail .title:not(.detail .title) {
    font-weight: 500;
    font-size: 1em;
    line-height: 18px;
    /* identical to box height */

    letter-spacing: 0.32em;
    text-transform: uppercase;
  }

  & .detail .title {
    color: #6b6d6f;
  }

  & .detail .detail-content-item {
    min-width: 200px;
  }

  & .detail .row.top .detail-content-item {
    min-width: unset;
  }

  & .detail .detail-content-item .header span {
    font-size: 0.8em;
    color: ${(props) => props.theme.accentColor};
    margin-left: 5px;
  }
  & .detail .detail-content-item .header svg {
    color: inherit;
    max-width: 1em;
    margin-bottom: -3px;
    display: inline-block;
  }
`;

const Dashboard = () => {
  return (
    <Wrapper>
      <NewNav />

      <DashboardWrapper>
        {/* Left Wrapper */}
        <ParentAnimationWrapper relativeDelay={0}>
          <LeftWrapper className="left-wrapper"></LeftWrapper>
        </ParentAnimationWrapper>
        {/* Main Wrapper */}
        <ParentAnimationWrapper relativeDelay={0.5}>
          <MainWrapper className="main-wrapper">Main</MainWrapper>
        </ParentAnimationWrapper>
        {/* Right Wrapper */}
        <ParentAnimationWrapper relativeDelay={0.8}>
          <RightWrapper className="right-wrapper">Right</RightWrapper>
        </ParentAnimationWrapper>
      </DashboardWrapper>
    </Wrapper>
  );
};

const ParentAnimationStyles = styled(motion.div)`
  max-height: 95vh;
`;
const ParentAnimationWrapper = ({ relativeDelay, children, ...props }) => {
  return (
    <ParentAnimationStyles
      initial="hidden"
      animate="shown"
      {...props}
      variants={{
        hidden: { y: "10%", opacity: 0 },
        shown: {
          y: 0,
          opacity: 1,
          transition: { delay: relativeDelay, duration: 0.3 },
        },
      }}
    >
      {children}
    </ParentAnimationStyles>
  );
};

export default Dashboard;
