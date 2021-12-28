import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  getCompanyLogoLinkFromURI,
  getHumanDateFromEpoch,
  getHumanTimeFromEpoch,
} from "../../../utils";

// import Icons
import NotFound from "../../../assets/icons/not-found.svg";
import { ReactComponent as Globe } from "../../../assets/icons/globe_color.svg";
import { ReactComponent as LinkUnPckd } from "../../../assets/icons/linkunpckd.svg";
import { ReactComponent as Label } from "../../../assets/icons/label.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";
import NewUserWelcomeImg from "../../../assets/images/new-user-welcome.png";

const MainWrapperStyles = styled.div`
  height: 100%;
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

const DetailsWrapper = styled.div`
  & p {
    margin: 0;
    font-weight: 500;
    font-size: 0.9em;
    line-height: 1.3em;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 1.3em;

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
    <MainWrapperStyles className="title-wrapper">
      {activePckd?.id ? (
        <>
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
                        onError={(e) => {
                          e.target.src = NotFound;
                        }}
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
                    <p
                      className="text"
                      onMouseOver={(e) => {
                        e.target.value = `${activePckd?.pckd}`;
                      }}
                    >
                      {activePckd?.pckd}
                    </p>
                  </div>
                  <div className="detail-content-item">
                    <div className="header">
                      <Calendar className="icon" />
                      <span>Created On</span>
                    </div>
                    <p className="text">
                      {getHumanDateFromEpoch(activePckd?.createdAt)} |{" "}
                      {getHumanTimeFromEpoch(activePckd?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DetailsWrapper>
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
