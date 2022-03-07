import React, { useEffect } from "react";
import TextBox from "../../styles/TextBox";
import FormGroup from "../../styles/FormGroup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { signupUser, initializeUser } from "../../features/authSlice";

// Styles + Components
import LogoWhite from "../../assets/images/logo.svg";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ email, password, name }) => {
    dispatch(
      signupUser({
        email,
        password,
        name,
        loggedIn: true,
      })
    );
  };

  const { signupStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (signupStatus === "success") {
      dispatch(initializeUser());
      navigate("/dash");
    }
  }, [signupStatus, navigate, dispatch]);

  return (
    <>
      <div className="hero">
        {/* logo */}
        <div className="logo">
          <img src={LogoWhite} alt="Logo" />
        </div>
        <h1 className="title">Register for Pckd!</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <TextBox
              type="email"
              id="email"
              placeholder="abc@xyz.com"
              {...register("email")}
            />
            {errors.email && (
              <span className="input-error">{errors?.email?.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="name">Name</label>
            <TextBox
              type="text"
              id="name"
              placeholder="Jane Doe"
              {...register("name", {
                required: "Please enter a valid name",
              })}
            />
            {errors.name && (
              <span className="input-error">{errors?.name?.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <TextBox
              type="password"
              id="password"
              placeholder="A Strong Password"
              {...register("password", {
                validate: (val) =>
                  !!val.match(/^(?=.*[a-zA-Z]).{8,30}$/) ||
                  "Please enter a password, 8 to 30 characters long and containing at least one upper and lowercase letter",
              })}
            />
            {errors.password && (
              <span className="input-error">{errors?.password?.message}</span>
            )}
          </FormGroup>
          <FormGroup>
            <button type="submit" disabled={signupStatus === "loading"}>
              Signup
            </button>
          </FormGroup>
        </form>
        <p>
          Already have an account? <Link to="/auth">Login</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
