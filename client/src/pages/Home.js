import React from "react";
import CreatePckd from "../components/pckd/CreatePckd";
import { useSelector } from "react-redux";
import Loading from "../components/Loading/Loading";
import NewNav from "../components/NewNav";

const Home = () => {
  const { isLoggedIn, loginAttempted } = useSelector((state) => ({
    isLoggedIn: !!state.auth.userInfo.id,
    loginAttempted: !!state.auth.loginAttempted,
  }));

  return (
    <>
      <NewNav />
      {loginAttempted ? <CreatePckd /> : <Loading />}
    </>
  );
};

export default Home;
