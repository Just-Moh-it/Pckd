import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREATE_PCKD_MUTATION } from "../../queries/pckd/.";
import { Button, NormalLink } from "../../styles/Buttons";
import Modal from "../../components/Modal";

import HeroImage from "../../assets/images/hero-image.png";
import ShortenIcon from "../../assets/icons/shorten.svg";

const Hero = styled.div`
  /* background-color: #fafafa; */
  margin: 0 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: bold;
    font-size: 52px;
    line-height: 63px;
    height: 126px;
    width: 377px;

    /* Text-Primary */
  }
  /* & > * {
    flex: 1;
  } */

  .hero-left {
    max-width: 377px;
  }
  .hero-left .hero-text {
    width: 377px;
    height: 75px;

    font-size: 18px;
    line-height: 25px;
    /* Text-Secondary */

    color: rgba(0, 0, 0, 0.6);
  }
  .hero-right-content {
    position: relative;
  }
  .hero-right-content .img {
    width: 446px;
    height: 328px;
  }
  .hero-gradient {
    width: 492px;
    height: 492px;
    position: absolute;
    top: 0px;
    left: 0px;

    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(127, 94, 228, 0.2) 0%,
      rgba(127, 94, 228, 0) 100%
    );
  }

  .hero-left form {
  }

  .hero-left form .create-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
  }
`;

const PackBtn = styled(Button)`
  height: 73px;
  border-radius: 0px 12px 12px 0;
`;

const HeroInput = styled.input`
  width: 488px;
  height: 73px;
  background: #ffffff;
  box-shadow: 0px 11px 28px rgba(0, 0, 0, 0.15);
  border-radius: 15px 0 0 15px;
  border: none;
  padding: 25px;
  min-width: 337px;
  font-size: 16px;
  line-height: 22px;
`;

const CreatePckd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createPckd, { loading, error, data }] =
    useMutation(CREATE_PCKD_MUTATION);

  const onSubmit = ({ target }) => {
    // console.log(formState);
    createPckd({ variables: { target } });
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;
  if (data?.hasOwnProperty("createPckd")) console.log("created");

  return (
    <Hero>
      <div className="hero-left">
        <h1>Shorten Links With a Click</h1>
        <p className="hero-text">
          Paste in any long url, make it sharable, trackable and customizable
          with just a few clicks.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="create-div">
            <HeroInput
              type="url"
              name="target"
              placeholder="https://www.google.com"
              formnovalidate="formnovalidate"
              {...register("target", { required: true })}
            />
            <PackBtn type="submit" full={true}>
              <span>Shorten!</span>
              <img className="btn-icon" src={ShortenIcon} alt="shorten" />
            </PackBtn>
          </div>
          <NormalLink from="left" marginTop="20px" hidden={!true}>
            {console.log("x")}
            Advanced Options ↓
          </NormalLink>
        </form>
        {data?.createPckd && (
          <a href={data?.createPckd}>
            {window.location.href}
            {data?.createPckd}
          </a>
        )}

        <Modal
          isOpen={isModalOpen}
          afterModalClosed={() => {
            setIsModalOpen(false);
            console.log("Closed modal");
          }}
        />
      </div>
      <div className="hero-right">
        <div className="hero-right-content">
          <img src={HeroImage} alt="Create Link Graphics" />
          <div className="hero-gradient"></div>
        </div>
      </div>
    </Hero>
  );
};

export default CreatePckd;
