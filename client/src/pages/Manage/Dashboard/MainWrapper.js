import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  getCompanyLogoLinkFromURI,
  getHumanDateFromEpoch,
} from "../../../utils";

// import Globe
import { ReactComponent as Globe } from "../../../assets/icons/globe_color.svg";
import { ReactComponent as LinkUnPckd } from "../../../assets/icons/linkunpckd.svg";
import { ReactComponent as Label } from "../../../assets/icons/label.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";

const MainWrapperStyles = styled.div`
  height: 100%;
  padding: 14px 30px 0 0;

  & .main-btn {
    padding: 7px;
  }

  /* Header Content */
  & .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 18px 0 33px;
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
    flex-grow: 1;
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

const DetailsWrapper = styled.div`
  & .detail {
    margin: 6px 0;
  }

  & .detail-content {
    padding: 20px;
  }

  & .header span,
  & .title {
    font-weight: 500;
    font-size: 1em;
    line-height: 18px;
    /* identical to box height */

    letter-spacing: 0.32em;
    text-transform: uppercase;
  }

  & .title {
    color: #6b6d6f;
  }

  & .detail-content-item {
    min-width: 200px;
  }

  & .row.top .detail-content-item {
    min-width: unset;
  }

  & .detail-content-item .header span {
    font-size: 0.8em;
    color: ${(props) => props.theme.accentColor};
    margin-left: 5px;
  }
  & .detail-content-item .header svg {
    color: inherit;
    max-width: 1em;
    margin-bottom: -3px;
    display: inline-block;
  }

  & p {
    margin: 0;
    font-weight: 500;
    font-size: 0.9em;
    line-height: 1.3em;
    /* identical to box height */

    /* Text-Secondary */

    color: rgba(0, 0, 0, 0.6);
  }

  & .row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  & .row.top {
    justify-content: start;
    gap: 2%;
  }

  & .row.top img {
    height: 50px;
    margin-top: 5px;
  }

  & .row.top h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    /* identical to box height */

    margin: 0;
  }
`;

const MainWrapper = () => {
  const activePckd = useSelector((state) => state.dashboard.activePckd);

  return (
    <MainWrapperStyles className="title-wrapper">
      {/* Title */}
      <div className="title">
        <h3 className="sub-heading">View and Edit</h3>
        <h1 className="heading">Information</h1>
      </div>
      {/* Main content */}

      {/* Details */}
      <DetailsWrapper className="details">
        <div className="detail">
          <h3 className="title">Details</h3>
          <div className="detail-content shadowed">
            <div className="row top">
              <div className="detail-content-item">
                <h1 className="text">
                  <img
                    src={getCompanyLogoLinkFromURI(activePckd?.target)}
                    alt="Company Logo"
                  />
                </h1>
              </div>
              <div className="detail-content-item">
                <div className="header">
                  <Label className="icon" />
                  <span>Title</span>
                </div>
                <h1 className="text">{activePckd?.title || "Untitled"}</h1>
              </div>
            </div>
            <div className="row">
              <div className="detail-content-item">
                <div className="header">
                  <Globe className="icon" />
                  <span>Target</span>
                </div>
                <p className="text">{activePckd?.target}</p>
              </div>
              <div className="detail-content-item">
                <div className="header">
                  <LinkUnPckd className="icon" />
                  <span>Pckd / Link</span>
                </div>
                <p className="text">{activePckd?.pckd}</p>
              </div>
              <div className="detail-content-item">
                <div className="header">
                  <Calendar className="icon" />
                  <span>Cretead On</span>
                </div>
                <p className="text">
                  {getHumanDateFromEpoch(activePckd?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DetailsWrapper>
    </MainWrapperStyles>
  );
};

export default MainWrapper;
