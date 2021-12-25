import React from "react";
import { Outlet } from "react-router-dom";
import NewNav from "../../components/NewNav";

const ManageWrapper = () => {
  return (
    <>
      <NewNav />
      <Outlet />
    </>
  );
};

export default ManageWrapper;
