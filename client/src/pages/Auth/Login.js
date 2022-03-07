import React, { useEffect } from "react";
import TextBox from "../../styles/TextBox";
import FormGroup from "../../styles/FormGroup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, initializeUser } from "../../features/authSlice";

// Styles + Components
import LogoWhite from "../../assets/images/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password }) => {
    dispatch(
      loginUser({
        email,
        password,
        loggedIn: true,
      })
    );
  };

  const { loginStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginStatus === "success") {
      dispatch(initializeUser());
      // Navigate to dash page using window.location
      window.location.href = process.env.REACT_APP_BASENAME || "";
    }
  }, [loginStatus, navigate, dispatch]);

  return (
    <>
      <div className="hero">
        {/* logo */}
        <div className="logo">
          <img src={LogoWhite} alt="Logo" />
        </div>
        <h1 className="title">Login to Pckd!</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <TextBox
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="input-error">This field is required</span>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <span className="extra">
              <Link className="forgot-link" to="/auth/forgot">
                Forgot Password?
              </Link>
            </span>
            <TextBox
              type="password"
              id="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="input-error">This field is required</span>
            )}
          </FormGroup>
          <FormGroup>
            <button type="submit" disabled={loginStatus === "loading"}>
              Login
            </button>
          </FormGroup>
        </form>
        <p>
          Don't have an account? <Link to="/auth/signup">Signup</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
