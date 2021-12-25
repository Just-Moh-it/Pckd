import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Manage/Dashboard/index";

// Login, Signup
import AuthWrapper from "./pages/Auth/AuthWrapper";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ManageWrapper from "./pages/Manage/ManageWrapper";
import Ping from "./pages/Ping";

import RedirectHandler from "./pages/RedirectHandler";

const Router = () => {
  return (
    <>
      <Routes>
        {/* Base Paths */}
        <Route path="/" element={<Home />} />

        {/* ManageRouter */}
        <Route path="manage" element={<ManageWrapper />}>
          <Route path="" element={<Dashboard />} />
          <Route path="ping" element={Ping} />
        </Route>

        {/* Auth Router */}
        <Route path="auth" element={<AuthWrapper />}>
          <Route path="" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* All other routes */}
        <Route path="*" element={<RedirectHandler />} />
      </Routes>
    </>
  );
};

export default Router;
