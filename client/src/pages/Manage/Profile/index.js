import React from "react";
import styled from "styled-components";
import NewNav from "../../../components/NewNav";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../features/authSlice";
import Loading from "../../../components/Loading/Loading";

import BgImg from "../../../assets/images/login-bg.png";
import User from "../../../assets/icons/user.svg";
import { getHumanTimeFromEpoch, getHumanDateFromEpoch } from "../../../utils";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(${BgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ProfileContainer = styled.div`
  max-width: 500px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  background: white;
  min-width: 350px;

  & h2 {
    text-align: center;
  }
`;

export const InfoGroup = styled.div`
  text-align: left;
  margin-bottom: 20px;
  margin-top: 15px;

  & label {
    display: inline-block;
    margin-bottom: 5px;
    color: ${(props) => props.theme.accentColor};
    font-weight: 500;
  }

  & button {
    padding: 17px 10px;
    width: 100%;
    border: none;
    background-color: ${(props) => props.theme.accentColor};
    color: white;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  & button:disabled {
    background-color: #e6e6e6;
    color: #b3b3b3;
    cursor: wait;
  }

  & button:hover {
    opacity: 0.9;
  }
`;

const ProfileIcon = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    max-height: 100%;
    max-width: 100%;
  }
`;

const Profile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Remove localstorage token
    localStorage.removeItem("token");

    dispatch(logoutUser());
    window.location.href = process.env.REACT_APP_BASENAME || "";
  };

  return (
    <MainWrapper>
      <NewNav transperant={true} overDark={true} />
      <ContentWrapper>
        <ProfileContainer>
          {userInfo?.id ? (
            <>
              <div className="header">
                <ProfileIcon to="/dash/profile" className="user-icon">
                  {/* {userInfo?.name
                ?.split(" ")
                ?.slice(0, 2)
                ?.map((i) => i[0].toUpperCase())
                ?.join("") || ""} */}
                  <img src={User} alt="Account" />
                </ProfileIcon>
                <h2>Account Info</h2>
              </div>
              <InfoGroup>
                <label htmlFor="name">Name</label>
                <h5 id="name">{userInfo.name}</h5>
              </InfoGroup>
              <InfoGroup>
                <label htmlFor="email">Email</label>
                <h5 id="email">{userInfo?.email}</h5>
              </InfoGroup>
              <InfoGroup>
                <label htmlFor="email">Joined on</label>
                <h5 id="email">
                  {getHumanDateFromEpoch(userInfo?.createdAt) +
                    " | " +
                    getHumanTimeFromEpoch(userInfo?.createdAt)}
                </h5>
              </InfoGroup>
              <InfoGroup>
                <button onClick={handleLogout}>Logout</button>
              </InfoGroup>
            </>
          ) : (
            <>
              <Loading />
            </>
          )}
        </ProfileContainer>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default Profile;
