import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Manage/Dashboard/index";

// Login, Signup
import AuthWrapper from "./pages/Auth/AuthWrapper";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Forgot from "./pages/Auth/Forgot";
import Profile from "./pages/Manage/Profile/.";

import RedirectHandler from "./pages/RedirectHandler";

const Router = () => {
  const isLoggedIn = useSelector((state) => !!state?.auth?.userInfo?.id);

  return (
    <>
      <Routes>
        {/* Base Paths */}
        <Route path="/" element={<Home />} />

        {/* ManageRouter */}
        <Route path="dash/*">
          {isLoggedIn ? (
            <>
              {/* Protected Routes */}
              <Route path="" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          )}
        </Route>

        {/* Auth Router */}
        <Route path="auth/*" element={<AuthWrapper />}>
          {isLoggedIn ? (
            <>
              <Route path="*" element={<Navigate to="/dash" replace />} />
            </>
          ) : (
            <>
              <Route path="" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot" element={<Forgot />} />
            </>
          )}
        </Route>

        {/* All other routes */}
        <Route path="*" element={<RedirectHandler />} />
      </Routes>
    </>
  );
};

export default Router;
