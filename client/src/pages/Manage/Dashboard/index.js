import React from "react";
import styled from "styled-components";

// Items
import LeftWrapper from "./LeftWrapper";
import MainWrapper from "./MainWrapper";
import RightWrapper from "./RightWrapper";

// Icons

const DashboardWrapper = styled.div`
  padding: 26px 42px 0;
  height: 90%;
  display: grid;
  grid-template-columns: 330fr 614fr 161fr;
  grid-template-areas: "left main right";
  background-color: #f3f8fe;

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
    max-width: 24px;
    min-width: 5px;
  }
`;

const Dashboard = () => {
  return (
    <DashboardWrapper>
      {/* Left Wrapper */}
      <LeftWrapper className="main-wrapper"></LeftWrapper>

      {/* Main Wrapper */}
      <MainWrapper className="main-wrapper">Main</MainWrapper>

      {/* Right Wrapper */}
      <RightWrapper className="main-wrapper">Right</RightWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
